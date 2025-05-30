export const Router = {
  init: () => {
      document.querySelectorAll('.header__nav-link').forEach((a) => {
          a.addEventListener('click', (event) => {
              event.preventDefault();
              const url = event.target.getAttribute('href');
              Router.go(url);
          });
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
  },
};