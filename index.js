import { Router } from './services/Router.js';
import BlogPage from './blocks/blogPage/blogPage.js';
import BlogCard from './blocks/blogCard/blogCard.js';
import ContactForm from './blocks/contactForm/contactForm.js';
import SavedItems from './blocks/savedItems/savedItems.js';
import SearchBar from './blocks/searchBar/searchBar.js';
import { FocusSearchCommand } from './services/command.js';

window.addEventListener('DOMContentLoaded', () => {
    Router.init();
});