import { fetchSiteSettings, fetchContactChannels } from '../services/contentService.js';
import { renderList, showError } from '../utils/dom.js';

export async function renderContactPage() {
  const intro = document.querySelector('[data-contact-intro]');
  const channelsNode = document.querySelector('[data-contact-channels]');

  try {
    const [settings, channels] = await Promise.all([
      fetchSiteSettings(),
      fetchContactChannels()
    ]);

    if (settings && intro) {
      intro.textContent = settings.contact_pitch ?? 'Let\'s team up on your next AI project.';
    }

    if (channels?.length) {
      renderList(channelsNode, channels, (channel) => {
        const item = document.createElement('a');
        item.href = channel.url;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
        item.className = 'flex items-center justify-between gap-4 rounded-xl border border-slate-700/80 bg-slate-900/70 px-5 py-4 transition hover:border-emerald-400/60 hover:bg-slate-900/90';

        const content = document.createElement('div');
        const label = document.createElement('span');
        label.className = 'text-sm font-medium uppercase tracking-wide text-emerald-300/90';
        label.textContent = channel.label;
        const value = document.createElement('p');
        value.className = 'text-lg font-semibold text-white';
        value.textContent = channel.display_value ?? channel.url;

        content.appendChild(label);
        content.appendChild(value);
        item.appendChild(content);

        const hint = document.createElement('span');
        hint.className = 'text-sm text-emerald-200/70';
        hint.textContent = channel.description ?? 'Open channel';
        item.appendChild(hint);

        return item;
      });
    } else {
      showError(channelsNode, 'Add contact channels in Supabase to make it easy for prospects to reach you.');
    }
  } catch (error) {
    console.error('Unable to render contact page', error);
    showError(channelsNode, 'We could not load contact information.');
  }
}
