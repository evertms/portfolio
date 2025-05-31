import BaseHTMLElement from '../base/BaseHTMLElement.js';
import { stateService } from '../../services/StateService.js';
import savedItemsService from '../../services/SavedItemsService.js';

export default class BlogCard extends BaseHTMLElement {
  constructor(blogData) {
    super();
    this.blogData = blogData;
    this.stateService = stateService;
    this.stateService.subscribe(this);
  }

  update(state) {
    const likeBtn = this.shadowRoot.querySelector('.blog-card__icon-button--like');
    const bookmarkBtn = this.shadowRoot.querySelector('.blog-card__icon-button--bookmark');

    if (likeBtn) likeBtn.classList.toggle('active', !!state.likes[this.blogData.id]);
    if (bookmarkBtn) bookmarkBtn.classList.toggle('active', !!state.bookmarks[this.blogData.id]);
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    await this.loadHTML('/blocks/blogCard/blogCard.template');
    this.update(this.stateService.state);

    const bookmarkBtn = this.shadowRoot.querySelector('.blog-card__icon-button--bookmark');

    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', () => {
        const isCurrentlyBookmarked = this.stateService.state.bookmarks[this.blogData.id];

        // Actualiza el estado global de bookmarks
        if (isCurrentlyBookmarked) {
          savedItemsService.removeSavedItem(this.blogData.id);
        } else {
          savedItemsService.addSavedItem(this.blogData.id);
        }

        // Sincroniza con StateService para mantener otros estados
        this.stateService.toggleBookmark(this.blogData.id);
      });
    }

    // Asignar datos dinámicos
    const img = this.shadowRoot.querySelector('.blog-card__image');
    const title = this.shadowRoot.querySelector('.blog-card__subtitle');
    const description = this.shadowRoot.querySelector('.blog-card__description');
    const link = this.shadowRoot.querySelector('.blog-card__read-full');

    if (this.blogData) {
      if (img) {
        img.src = this.blogData.imagen?.src || '';
        img.alt = this.blogData.imagen?.altImg || 'Imagen del blog';
      }

      if (title) title.textContent = this.blogData.titulo || '';

      if (description) description.textContent = this.blogData.descripcion || '';

      if (link) link.href = this.blogData.link || 'https://www.linkedin.com/in/evertms/'; 
    }
  }
}

customElements.define('blog-card', BlogCard);