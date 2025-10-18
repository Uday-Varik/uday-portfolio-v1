import { fetchAllBlogPosts } from '../services/contentService.js';
import { createCard, renderList, showError, formatDate } from '../utils/dom.js';

export async function renderBlogPage() {
  const container = document.querySelector('[data-blog-list]');

  try {
    const posts = await fetchAllBlogPosts();

    if (!posts?.length) {
      showError(container, 'Publish your first blog post in Supabase to see it here.');
      return;
    }

    renderList(container, posts, (post) =>
      createCard({
        title: post.title,
        description: post.excerpt,
        link: post.url ?? `#${post.slug}`,
        meta: post.published_at ? `${formatDate(post.published_at)} · ${post.read_time_minutes ?? 5} min read` : undefined
      })
    );
  } catch (error) {
    console.error('Unable to render blog posts', error);
    showError(container, 'Fetching posts from Supabase failed.');
  }
}
