#!/usr/bin/env node
import { createSupabaseClient, fetchJson, loadJsonFromFile, parseArgs, upsertCollection } from './shared.js';

const usage = `\nUsage: npm run sync:payload -- --file=export.json\n       npm run sync:payload -- --endpoint=https://cms.example.com/api/export --token=API_TOKEN\n`;

async function loadPayloadSource(args) {
  if (args.file) {
    return loadJsonFromFile(args.file);
  }

  if (args.endpoint) {
    return fetchJson(args.endpoint, args.token);
  }

  throw new Error(`Missing data source. Provide --file or --endpoint. ${usage}`);
}

function mapPayloadToSupabase(payloadData) {
  const projects = payloadData.projects?.map((project) => ({
    id: project.id,
    title: project.title,
    summary: project.summary,
    tech_stack: project.techStack?.join(', ') ?? project.tech_stack,
    case_study_url: project.caseStudyUrl ?? project.case_study_url,
    is_featured: Boolean(project.isFeatured ?? project.is_featured),
    position: project.position ?? project.order ?? 0,
    created_at: project.createdAt ?? project.created_at,
    updated_at: project.updatedAt ?? project.updated_at
  })) ?? [];

  const blogPosts = payloadData.blogPosts?.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    url: post.externalUrl ?? post.url,
    published_at: post.publishedAt ?? post.published_at,
    read_time_minutes: post.readTime ?? post.read_time_minutes,
    created_at: post.createdAt ?? post.created_at,
    updated_at: post.updatedAt ?? post.updated_at
  })) ?? [];

  const testimonials = payloadData.testimonials?.map((testimonial) => ({
    id: testimonial.id,
    author_name: testimonial.authorName ?? testimonial.author_name,
    role: testimonial.role,
    quote: testimonial.quote,
    position: testimonial.position ?? 0
  })) ?? [];

  const navigation = payloadData.navigationLinks?.map((link, index) => ({
    id: link.id ?? index + 1,
    label: link.label,
    href: link.href ?? link.url,
    position: link.position ?? index
  })) ?? [];

  const contactChannels = payloadData.contactChannels?.map((channel, index) => ({
    id: channel.id ?? index + 1,
    label: channel.label,
    url: channel.url,
    description: channel.description,
    display_value: channel.displayValue ?? channel.display_value,
    position: channel.position ?? index
  })) ?? [];

  const siteSettings = payloadData.siteSettings
    ? {
        id: payloadData.siteSettings.id ?? 1,
        site_title: payloadData.siteSettings.siteTitle ?? payloadData.siteSettings.site_title,
        tagline: payloadData.siteSettings.tagline,
        contact_pitch: payloadData.siteSettings.contactPitch ?? payloadData.siteSettings.contact_pitch
      }
    : null;

  const pages = payloadData.pages?.map((page) => ({
    id: page.id,
    slug: page.slug,
    hero_heading: page.heroHeading ?? page.hero_heading,
    hero_subheading: page.heroSubheading ?? page.hero_subheading,
    call_to_action_label: page.callToActionLabel ?? page.call_to_action_label,
    call_to_action_url: page.callToActionUrl ?? page.call_to_action_url
  })) ?? [];

  return {
    projects,
    blogPosts,
    testimonials,
    navigation,
    contactChannels,
    siteSettings,
    pages
  };
}

async function main() {
  const args = parseArgs(process.argv);

  try {
    const payloadData = await loadPayloadSource(args);
    const client = createSupabaseClient();
    const mapped = mapPayloadToSupabase(payloadData);

    if (mapped.siteSettings) {
      await upsertCollection(client, 'site_settings', [mapped.siteSettings], 'id');
    }

    await Promise.all([
      upsertCollection(client, 'navigation_links', mapped.navigation, 'id'),
      upsertCollection(client, 'projects', mapped.projects, 'id'),
      upsertCollection(client, 'blog_posts', mapped.blogPosts, 'id'),
      upsertCollection(client, 'testimonials', mapped.testimonials, 'id'),
      upsertCollection(client, 'contact_channels', mapped.contactChannels, 'id'),
      upsertCollection(client, 'pages', mapped.pages, 'id')
    ]);

    console.log('Payload sync complete.');
  } catch (error) {
    console.error('Payload sync failed:', error.message);
    process.exitCode = 1;
  }
}

main();
