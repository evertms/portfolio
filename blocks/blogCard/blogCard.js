import BaseHTMLElement from '../base/BaseHTMLElement.js';
import { stateService } from '../../services/StateService.js';

export default class BlogCard extends BaseHTMLElement {
  constructor(blogData) {
      super();
      this.blogData = blogData;
      this.stateService = stateService;
      stateService.subscribe(this);
  }

  update(state) {
    const likeBtn = this.shadowRoot.querySelector('.blog-card__icon-button--like');
    const bookmarkBtn = this.shadowRoot.querySelector('.blog-card__icon-button--bookmark');
    
    if (state.likes[this.blogData.id]) {
        likeBtn.classList.add('active');
    } else {
        likeBtn.classList.remove('active');
    }
    
    if (state.bookmarks[this.blogData.id]) {
        bookmarkBtn.classList.add('active');
    } else {
        bookmarkBtn.classList.remove('active');
    }
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    await this.loadHTML('/blocks/blogCard/blogCard.template');

    this.update(stateService.state);
    
    const likeBtn = this.shadowRoot.querySelector('.blog-card__icon-button--like');
    const bookmarkBtn = this.shadowRoot.querySelector('.blog-card__icon-button--bookmark');
    
    likeBtn.addEventListener('click', () => {
      this.stateService.toggleLike(this.blogData.id);
    });
    
    bookmarkBtn.addEventListener('click', () => {
      this.stateService.toggleBookmark(this.blogData.id);
    });

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