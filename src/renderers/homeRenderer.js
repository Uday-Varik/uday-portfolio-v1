import {
  fetchSiteSettings,
  fetchHomePage,
  fetchFeaturedProjects,
  fetchLatestBlogPosts,
  fetchTestimonials
} from '../services/contentService.js';
import { createCard, renderList, setText, showError, formatDate } from '../utils/dom.js';

export async function renderHomePage() {
  const heroNode = document.querySelector('[data-hero]');
  const featuredProjectsNode = document.querySelector('[data-featured-projects]');
  const blogNode = document.querySelector('[data-latest-posts]');
  const testimonialsNode = document.querySelector('[data-testimonials]');

  try {
    const [settings, page, projects, posts, testimonials] = await Promise.all([
      fetchSiteSettings(),
      fetchHomePage(),
      fetchFeaturedProjects(),
      fetchLatestBlogPosts(),
      fetchTestimonials()
    ]);

    if (settings) {
      setText(document.querySelector('[data-site-title]'), settings.site_title);
      setText(document.querySelector('[data-site-tagline]'), settings.tagline);
    }

    if (page && heroNode) {
      const { hero_heading, hero_subheading, call_to_action_label, call_to_action_url } = page;
      setText(heroNode.querySelector('[data-hero-heading]'), hero_heading ?? settings?.site_title);
      setText(heroNode.querySelector('[data-hero-subheading]'), hero_subheading ?? settings?.tagline);
      const ctaLink = heroNode.querySelector('[data-hero-cta]');
      if (ctaLink && call_to_action_url) {
        ctaLink.href = call_to_action_url;
        ctaLink.textContent = call_to_action_label ?? 'Let\'s collaborate';
      }
    }

    if (projects?.length) {
      renderList(featuredProjectsNode, projects, (project) =>
        createCard({
          title: project.title,
          description: project.summary,
          link: project.case_study_url,
          meta: project.tech_stack
        })
      );
    } else {
      showError(featuredProjectsNode, 'No featured projects published yet.');
    }

    if (posts?.length) {
      renderList(blogNode, posts, (post) =>
        createCard({
          title: post.title,
          description: post.excerpt,
          link: post.url ?? `./blog.html#${post.slug}`,
          meta: post.published_at ? `Published ${formatDate(post.published_at)}` : undefined
        })
      );
    } else {
      showError(blogNode, 'Blog posts will appear here once published.');
    }

    if (testimonials?.length) {
      renderList(testimonialsNode, testimonials, (testimonial) => {
        const card = createCard({
          title: testimonial.author_name,
          description: testimonial.quote,
          meta: testimonial.role
        });
        card.classList.add('bg-emerald-950/30', 'border-emerald-500/20');
        return card;
      });
    } else {
      showError(testimonialsNode, 'Collect client testimonials to boost credibility.');
    }
  } catch (error) {
    console.error('Unable to render home page', error);
    [heroNode, featuredProjectsNode, blogNode, testimonialsNode].forEach((node) =>
      showError(node, 'We were unable to load content. Please try again later.')
    );
  }
}
