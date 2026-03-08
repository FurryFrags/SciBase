const domainFilter = document.getElementById('domain-filter');
const sortOrder = document.getElementById('sort-order');
const tagFilters = Array.from(document.querySelectorAll('.tag-filter'));
const simGrid = document.getElementById('sim-grid');

function applyFilters() {
  const selectedDomain = domainFilter.value;
  const selectedTags = tagFilters.filter((el) => el.checked).map((el) => el.value);
  const cards = Array.from(simGrid.querySelectorAll('.sim-card'));

  cards.forEach((card) => {
    const domain = card.dataset.domain;
    const tags = card.dataset.tags.split(' ');

    const matchesDomain = selectedDomain === 'all' || domain === selectedDomain;
    const matchesTags = selectedTags.every((tag) => tags.includes(tag));

    card.classList.toggle('hidden', !(matchesDomain && matchesTags));
  });

  sortCards(cards);
}

function sortCards(cards) {
  const visibleCards = cards.filter((card) => !card.classList.contains('hidden'));
  const hiddenCards = cards.filter((card) => card.classList.contains('hidden'));

  visibleCards.sort((a, b) => {
    const nameA = a.dataset.name.toLowerCase();
    const nameB = b.dataset.name.toLowerCase();

    if (sortOrder.value === 'name-asc') return nameA.localeCompare(nameB);
    if (sortOrder.value === 'name-desc') return nameB.localeCompare(nameA);

    const countA = a.dataset.tags.split(' ').length;
    const countB = b.dataset.tags.split(' ').length;
    return countB - countA;
  });

  [...visibleCards, ...hiddenCards].forEach((card) => simGrid.appendChild(card));
}

[domainFilter, sortOrder, ...tagFilters].forEach((el) => {
  el.addEventListener('input', applyFilters);
  el.addEventListener('change', applyFilters);
});

applyFilters();
