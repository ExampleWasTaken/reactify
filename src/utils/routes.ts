/**
 * This object keeps track of all routes in the project. <br>
 * It should always be used over literal strings as keeping a list of all
 * possible routes is easier to debug and more scalable.
 */
export const routes = {
  web: {
    root: '/',
    documentation: '/documentation',
    faq: '/faq',
    about: '/about',
    thirdPartyLicenses: '3rd-party-licenses',
  },
  app: {
    home: '/app/home',
    search: '/app/search',
    library: '/app/library',
    login: '/app/login',
    authflow: '/app/authflow',
    authflowFail: '/app/authflow/fail',
  },
};
