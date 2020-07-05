/* global pages */
import './style.css';

const nav = document.getElementById('navitems');
for (const page of ['index', ...pages.filter((p) => p !== 'index')]) {
  const item = document.createElement('a');
  item.href = (page === 'index') ? '/' : `/${page}.html`;
  item.classList.add('block', 'mt-4', 'lg:inline-block', 'lg:mt-0', 'text-blue-200', 'hover:text-white', 'mr-4');

  let text = `${page.charAt(0).toUpperCase()}${page.slice(1)}`;
  if (page === 'index') text = 'Home';
  if (text.length <= 3) text = text.toLocaleUpperCase();

  item.innerText = text;
  nav.appendChild(item);
}

document.getElementById('menu_button').addEventListener('click', () => {
  const navcont = document.getElementById('navigation_container');
  if (navcont.classList.contains('hidden')) {
    navcont.classList.remove('hidden');
    navcont.classList.add('block');
  } else {
    navcont.classList.add('hidden');
    navcont.classList.remove('block');
  }
});
