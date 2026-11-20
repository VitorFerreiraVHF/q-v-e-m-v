const pages = Array.from(document.querySelectorAll('.letter-page'));
const heading = document.querySelector('.page-heading');
const counter = document.querySelector('.page-count');
const actions = document.querySelector('.page-actions');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const nextLabel = document.querySelector('.next-label');
const progress = document.querySelector('.page-progress');
const dots = pages.map(() => document.createElement('span'));

let currentPage = 0;

function renderPage(moveFocus = false) {
  const pageIndex = pages.findIndex((page) => '#' + page.id === location.hash);
  currentPage = Math.max(pageIndex, 0);
  const onLastPage = currentPage === pages.length - 1;

  pages.forEach((page, index) => {
    page.hidden = index !== currentPage;
    dots[index].classList.toggle('current', index === currentPage);
    dots[index].classList.toggle('read', index < currentPage);
  });

  counter.textContent = `Página ${currentPage + 1} de ${pages.length}`;
  previous.hidden = currentPage === 0;
  next.classList.toggle('replay', onLastPage);
  nextLabel.textContent = onLastPage ? 'Ler de novo' : 'Virar a página';

  if (moveFocus) {
    pages[currentPage].focus({ preventScroll: true });
    heading.scrollIntoView({ block: 'nearest' });
  }
}

function goToPage(index) {
  if (index < 0 || index >= pages.length || index === currentPage) return;

  history.pushState(null, '', '#' + pages[index].id);
  renderPage(true);
}

progress.append(...dots);
renderPage();
heading.hidden = false;
actions.hidden = false;
progress.hidden = false;

previous.addEventListener('click', () => goToPage(currentPage - 1));
next.addEventListener('click', () => goToPage((currentPage + 1) % pages.length));
window.addEventListener('popstate', () => renderPage(true));

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;
  if (event.key === 'ArrowLeft') goToPage(currentPage - 1);
  if (event.key === 'ArrowRight') goToPage(currentPage + 1);
});

