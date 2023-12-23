/**
 * This object keeps track of all routes in the project. <br>
 * It should always be used over literal strings as keeping a list of all
 * possible routes is easier to debug and more scalable.
 */
export const routes = {
  root: '/',
  documentation: '/documentation',
  faq: '/faq',
  about: '/about',
  thirdPartyLicenses: '3rd-party-licenses',
  login: '/login',
  authflow: '/auth',
  app: {
    home: '/app/home',
    search: '/app/search',
    library: '/app/library',
  },
};
