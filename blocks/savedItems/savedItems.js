// blocks/savedItems/SavedItems.js

import BaseHTMLElement from "../base/BaseHTMLElement.js";
import BlogCard from "../blogCard/blogCard.js";
import savedItemsService from "../../services/SavedItemsService.js";

export default class SavedItems extends BaseHTMLElement {
  constructor() {
    super();
    this.allBlogs = [];
    this.container = null;
    this.savedBlogElements = new Map(); // Mapea blog.id => DOM Element
  }

  connectedCallback() {
    this.load();
    window.addEventListener("bookmarktoggledglobal", this.handleGlobalStateUpdate);
  }

  disconnectedCallback() {
    window.removeEventListener("bookmarktoggledglobal", this.handleGlobalStateUpdate);
  }

  async load() {
    await this.loadHTML("/blocks/savedItems/savedItems.template");
    this.container = this.shadowRoot.getElementById("saved-list");

    const response = await fetch("/data/fakeblogs.json");
    this.allBlogs = await response.json();

    this.render();
  }

  handleGlobalStateUpdate = (event) => {
    const { bookmarks } = event.detail;
    savedItemsService.state.bookmarks = bookmarks;
    this.render();
  };

  render() {
    if (!this.container) return;

    this.container.innerHTML = "";
    this.savedBlogElements.clear();

    const savedBlogs = savedItemsService.getSavedBlogs(this.allBlogs);

    if (savedBlogs.length === 0) {
      this.container.innerHTML = "<p>No hay artículos guardados.</p>";
      return;
    }

    savedBlogs.forEach((blog) => {
      const card = new BlogCard(blog);
      this.container.appendChild(card);
      this.savedBlogElements.set(blog.id, card);
    });
  }
}

customElements.define("saved-items", SavedItems);