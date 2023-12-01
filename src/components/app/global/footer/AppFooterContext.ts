import { createContext } from 'react';

const navbar = document.getElementById('app-navbar');

let offsetHeight = 0;
if (navbar) {
  offsetHeight = navbar.offsetHeight;
}

export const AppFooterContext = createContext(offsetHeight);
