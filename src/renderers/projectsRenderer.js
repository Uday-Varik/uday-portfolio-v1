import { fetchAllProjects } from '../services/contentService.js';
import { createCard, renderList, showError } from '../utils/dom.js';

export async function renderProjectsPage() {
  const container = document.querySelector('[data-project-list]');
  const filters = document.querySelector('[data-project-filters]');

  try {
    const projects = await fetchAllProjects();

    if (!projects?.length) {
      showError(container, 'Publish projects in Supabase to see them listed here.');
      return;
    }

    const techStacks = Array.from(new Set(projects.flatMap((project) => (project.tech_stack ?? '').split(',').map((t) => t.trim()).filter(Boolean))));

    if (filters) {
      filters.innerHTML = '';
      const allButton = document.createElement('button');
      allButton.type = 'button';
      allButton.textContent = 'All';
      allButton.className = 'filter-button active';
      allButton.dataset.filter = 'all';
      filters.appendChild(allButton);

      techStacks.forEach((stack) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-button';
        button.textContent = stack;
        button.dataset.filter = stack;
        filters.appendChild(button);
      });

      filters.addEventListener('click', (event) => {
        if (event.target.matches('button[data-filter]')) {
          const { filter } = event.target.dataset;
          filters.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
          event.target.classList.add('active');

          const filtered = filter === 'all'
            ? projects
            : projects.filter((project) => project.tech_stack?.toLowerCase().includes(filter.toLowerCase()));

          renderProjects(filtered);
        }
      });
    }

    function renderProjects(list) {
      renderList(container, list, (project) =>
        createCard({
          title: project.title,
          description: project.summary,
          link: project.case_study_url,
          meta: project.tech_stack
        })
      );
    }

    renderProjects(projects);
  } catch (error) {
    console.error('Unable to render projects', error);
    showError(container, 'We hit a snag fetching projects from Supabase.');
  }
}
