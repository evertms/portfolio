import BaseHTMLElement from "../base/BaseHTMLElement.js";
import BlogCard from "../blogCard/blogCard.js";

export default class BlogPage extends BaseHTMLElement {
  constructor() {
    super();
    this.observer = null;
    this.blogs = [];
    this.container = null;
    this.batchSize = 4; // Cuántas tarjetas mostrar cada vez
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    await this.loadHTML('/blocks/blogPage/blogPage.template');
    this.container = this.shadowRoot.getElementById('blog-list');
    const response = await fetch('/data/fakeblogs.json');
    this.blogs = await response.json();

    this.showNextBatch();

    this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.currentIndex < this.blogs.length) {
            this.showNextBatch();
        }
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    const sentinel = document.createElement('div');
    sentinel.style.height = '20px';
    sentinel.style.width = '100%';
    this.container.appendChild(sentinel);

    this.observer.observe(sentinel);
  }
  showNextBatch() {
    const endIndex = this.currentIndex + this.batchSize;
    const batch = this.blogs.slice(this.currentIndex, endIndex);

    batch.forEach(blog => {
      const card = new BlogCard(blog);
      this.container.insertBefore(card, this.container.lastChild);
    });

    this.currentIndex = endIndex;

    if (this.currentIndex >= this.blogs.length) {
      this.observer.disconnect();
    }
  }
}

customElements.define('blog-page', BlogPage);