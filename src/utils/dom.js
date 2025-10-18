export function clearChildren(node) {
  if (!node) return;
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function renderList(node, items, renderItem) {
  if (!node) return;
  clearChildren(node);
  items.forEach((item, index) => {
    const element = renderItem(item, index);
    if (element) {
      node.appendChild(element);
    }
  });
}

export function createCard({ title, description, link, meta }) {
  const wrapper = document.createElement('article');
  wrapper.className = 'rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/80 hover:shadow-emerald-500/20';

  const heading = document.createElement('h3');
  heading.className = 'text-xl font-semibold text-white';
  heading.textContent = title;
  wrapper.appendChild(heading);

  if (meta) {
    const metaEl = document.createElement('p');
    metaEl.className = 'mt-1 text-sm uppercase tracking-wide text-emerald-300/80';
    metaEl.textContent = meta;
    wrapper.appendChild(metaEl);
  }

  if (description) {
    const desc = document.createElement('p');
    desc.className = 'mt-3 text-sm text-slate-300';
    desc.textContent = description;
    wrapper.appendChild(desc);
  }

  if (link) {
    const anchor = document.createElement('a');
    anchor.className = 'mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200';
    anchor.href = link;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = 'View details';
    wrapper.appendChild(anchor);
  }

  return wrapper;
}

export function showError(node, message) {
  if (!node) return;
  clearChildren(node);
  const error = document.createElement('div');
  error.className = 'rounded-lg border border-rose-500/50 bg-rose-950/60 p-4 text-sm text-rose-200';
  error.textContent = message;
  node.appendChild(error);
}

export function setText(node, value) {
  if (node) {
    node.textContent = value;
  }
}

export function formatDate(value) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
  } catch (error) {
    console.warn('Unable to format date', error);
    return value;
  }
}
