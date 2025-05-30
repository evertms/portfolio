import BaseHTMLElement from '../base/BaseHTMLElement.js';

export default class BlogCard extends BaseHTMLElement {
  constructor(blogData) {
    super();
    this.blogData = blogData;
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    await this.loadHTML('/blocks/blogCard/blogCard.template');

    // Asignar datos dinámicos
    const img = this.shadowRoot.querySelector('.blog-card__image');
    const title = this.shadowRoot.querySelector('.blog-card__subtitle');
    const description = this.shadowRoot.querySelector('.blog-card__description');
    const link = this.shadowRoot.querySelector('.blog-card__read-full');

    if (this.blogData) {
      img.src = this.blogData.imagen.src;
      img.alt = this.blogData.imagen.altImg;
      title.textContent = this.blogData.titulo;
      description.textContent = this.blogData.descripcion;
      link.href = this.blogData.link || 'https://www.linkedin.com/in/evertms/';
    }
  }
}

customElements.define('blog-card', BlogCard);