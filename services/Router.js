import { stateService } from './StateService.js';

export const Router = {
  init: () => {
      /* Use event delegation so any <a> added later (like the contact button in
         the home template) will automatically be handled.  We listen on the body
         and match anchors whose href starts with '/'. */
      document.body.addEventListener('click', (event) => {
          const anchor = event.target.closest('a[href^="/"]');
          if (!anchor) return; // not an internal link

          event.preventDefault();
          const url = anchor.getAttribute('href');
          Router.go(url);
      });

      window.addEventListener('popstate', (event) => {
          Router.go(event.state.route, false);
      });

      Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    let pageContent = null;
    const mainContentContainer = document.getElementById('main-content');

    switch (route) {
        case '/':
      case '/#home':
      case '/index.html':
          pageContent = document.getElementById('home-template').content.cloneNode(true);
          break;
      case '/blog':
          pageContent = document.createElement('blog-page');
          break;
      case '/contact':
          pageContent = document.createElement('contact-form');
          break;
      default:
        console.warn(`Ruta no encontrada: ${route}. Redirigiendo a Home.`);
        pageContent = document.getElementById('home-template').content.cloneNode(true);
        if (addToHistory) {
            history.replaceState({ route: '/' }, '', '/');
        }
        break;
    }

    if (pageContent && mainContentContainer) {
        mainContentContainer.innerHTML = '';
        mainContentContainer.appendChild(pageContent);
    } else if (!mainContentContainer) {
        console.error('El contenedor principal #main-content no fue encontrado.');
    } else if (!pageContent) {
        console.error(`No se encontró contenido para la ruta: ${route}`);
    }

    window.scrollTo(0, 0);
    stateService.notifyAll();
    }, 
};