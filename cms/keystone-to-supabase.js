#!/usr/bin/env node
import { createSupabaseClient, loadJsonFromFile, parseArgs, upsertCollection } from './shared.js';

const usage = `\nUsage: npm run sync:keystone -- --file=keystone-export.json\n`;

function mapKeystoneToSupabase(data) {
  const projects = data.projects?.map((project) => ({
    id: project.id,
    title: project.name,
    summary: project.summary,
    tech_stack: project.techStack,
    case_study_url: project.caseStudyUrl,
    is_featured: Boolean(project.isFeatured),
    position: project.order ?? 0,
    created_at: project.createdAt,
    updated_at: project.updatedAt
  })) ?? [];

  const blogPosts = data.posts?.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    url: post.externalUrl,
    published_at: post.publishedAt,
    read_time_minutes: post.readTime,
    created_at: post.createdAt,
    updated_at: post.updatedAt
  })) ?? [];

  const testimonials = data.testimonials?.map((testimonial) => ({
    id: testimonial.id,
    author_name: testimonial.person,
    role: testimonial.role,
    quote: testimonial.quote,
    position: testimonial.order ?? 0
  })) ?? [];

  const navigation = data.navigation?.map((item, index) => ({
    id: item.id ?? index + 1,
    label: item.label,
    href: item.href,
    position: item.position ?? index
  })) ?? [];

  const contactChannels = data.contactChannels?.map((channel, index) => ({
    id: channel.id ?? index + 1,
    label: channel.label,
    url: channel.url,
    description: channel.description,
    display_value: channel.displayValue,
    position: channel.position ?? index
  })) ?? [];

  const siteSettings = data.siteSettings
    ? {
        id: data.siteSettings.id ?? 1,
        site_title: data.siteSettings.siteTitle,
        tagline: data.siteSettings.tagline,
        contact_pitch: data.siteSettings.contactPitch
      }
    : null;

  const pages = data.pages?.map((page) => ({
    id: page.id,
    slug: page.slug,
    hero_heading: page.heroHeading,
    hero_subheading: page.heroSubheading,
    call_to_action_label: page.callToActionLabel,
    call_to_action_url: page.callToActionUrl
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
    if (!args.file) {
      throw new Error(`Missing Keystone export file. ${usage}`);
    }

    const raw = await loadJsonFromFile(args.file);
    const client = createSupabaseClient();
    const mapped = mapKeystoneToSupabase(raw);

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

    console.log('Keystone sync complete.');
  } catch (error) {
    console.error('Keystone sync failed:', error.message);
    process.exitCode = 1;
  }
}

main();
