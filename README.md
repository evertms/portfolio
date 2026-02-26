# Web portfolio
Un portafolio web para mostrar mis proyectos, habilidades y experiencia. Construido con tecnologías estándar de la web y un ligero router del lado del cliente, este sitio sirve como un centro personal para mostrar mi viaje profesional y logros.

## Tecnologías usadas
- **HTML5** para estructura básica de las páginas.
- **CSS (Flexbox/Grid)** con variables CSS y una arquitectura de bloques para estilos.
- **JavaScript moderno (ES modules)** para la lógica de navegación, componentes y estado.
  - Enrutador propio (`services/Router.js`) con `history.pushState`.
  - Componentes personalizados (`<blog-page>`, `<contact-form>`, etc.).
- **JSON** para datos simulados (`data/fakeblogs.json`).
- **Fuentes de Google** y `normalize.css` como reset.

> No se utiliza ningún framework externo; todo está implementado de forma sencilla con vanila JS para mantener el proyecto liviano.

## Estructura de páginas y estado del desarrollo
| Ruta | Contenido | Estado |
|------|-----------|--------|
| `/` o `/#home` | Página principal con texto introductorio y acción de contacto. | ✅ Desarrollada y funcional. |
| `/blog` | Listado de entradas de blog (cards generadas desde JSON). | ✅ Funcional. |
| `/contact` | Formulario de contacto personalizado. | ✅ Funcional. |
| `/work` | Sección de "Work" / proyectos (ancla en home por ahora). | 🚧 En proceso (corresponde a sección anclada en home). |
| `/about` | Sección "About me" (ancla en home). | 🚧 En proceso (todavía en maquetación). |

El enrutador y los componentes permiten ampliar el sitio fácilmente a medida que se vayan completando nuevas secciones.

Diseño en Figma: https://www.figma.com/design/oizeOf5fTfHewkvGlDM7F6/Portfolio-for-Developers--Community-?m=auto&t=a3TJFMnbVSrDmLsU-6
