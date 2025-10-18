import { renderHomePage } from './renderers/homeRenderer.js';
import { renderProjectsPage } from './renderers/projectsRenderer.js';
import { renderBlogPage } from './renderers/blogRenderer.js';
import { renderContactPage } from './renderers/contactRenderer.js';
import { fetchNavigationLinks, fetchSiteSettings } from './services/contentService.js';
import { setText, showError } from './utils/dom.js';

async function initNavigation() {
  const navContainer = document.querySelector('[data-navigation]');
  if (!navContainer) return;

  try {
    const [links, settings] = await Promise.all([
      fetchNavigationLinks(),
      fetchSiteSettings()
    ]);

    if (settings) {
      const titleNodes = document.querySelectorAll('[data-site-title]');
      titleNodes.forEach((node) => setText(node, settings.site_title));
      const taglineNodes = document.querySelectorAll('[data-site-tagline]');
      taglineNodes.forEach((node) => setText(node, settings.tagline));
    }

    if (!links?.length) {
      navContainer.innerHTML = '';
      showError(navContainer, 'Add navigation links in Supabase to populate the menu.');
      return;
    }

    navContainer.innerHTML = links
      .map(
        (link) => `<a href="${link.href}" class="text-sm font-medium text-slate-200 transition hover:text-emerald-300">${link.label}</a>`
      )
      .join('');
  } catch (error) {
    console.error('Navigation failed to load', error);
    showError(navContainer, 'Navigation unavailable.');
  }
}

const pageRenderers = {
  home: renderHomePage,
  projects: renderProjectsPage,
  blog: renderBlogPage,
  contact: renderContactPage
};

async function bootstrap() {
  await initNavigation();
  const page = document.body.dataset.page ?? 'home';
  const renderer = pageRenderers[page];
  if (typeof renderer === 'function') {
    await renderer();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap().catch((error) => {
    console.error('Failed to bootstrap application', error);
  });
});
