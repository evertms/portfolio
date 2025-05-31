import BaseHTMLElement from '../base/BaseHTMLElement.js';
import savedItemsService from '../../services/SavedItemsService.js';
import BlogService from '../../services/blogService.js';

class SearchCommand {
  constructor(query) {
    this.query = query.trim().toLowerCase();
  }

  async execute() {
    const allBlogs = await BlogService.fetchAllBlogs();
    const savedBlogs = savedItemsService.getSavedBlogs(allBlogs);

    console.log(savedBlogs.filter(blog =>
        blog.titulo.toLowerCase().includes(this.query) ||
        blog.descripcion.toLowerCase().includes(this.query)
    ));
    return savedBlogs.filter(blog =>
      blog.titulo.toLowerCase().includes(this.query) ||
      blog.descripcion.toLowerCase().includes(this.query)
    );
  }
}

export default class SearchBar extends BaseHTMLElement {
  constructor() {
    super();
    this.input = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.loadHTML('/blocks/searchBar/searchBar.template').then(() => {
      this.input = this.shadowRoot.querySelector('.search-bar__input');

      this.input.addEventListener('input', this.handleInput);
      this.input.addEventListener('keydown', this.handleKeyDown);
    });
  }

  handleInput = (event) => {
    this.dispatchSearch(event.target.value);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.dispatchSearch(event.target.value);
    }
  };

  dispatchSearch(query) {
    const command = new SearchCommand(query);
    const results = command.execute();

    window.dispatchEvent(new CustomEvent('searchresults', {
      detail: { results, query }
    }));
  }
}

customElements.define('search-bar', SearchBar);