const STORAGE_KEY = 'blogState';

class SavedItemsService {
  constructor() {
    if (SavedItemsService.instance) {
      return SavedItemsService.instance;
    }

    this.storageKey = STORAGE_KEY;
    this.state = this.getStorageState();
    SavedItemsService.instance = this;
  }

  getStorageState() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return { bookmarks: {} };

    try {
      const parsed = JSON.parse(stored);
      return {
        likes: parsed.likes || {},
        bookmarks: parsed.bookmarks || {}
      };
    } catch (e) {
      console.error('Error parsing blogState from localStorage', e);
      return { bookmarks: {} };
    }
  }

  saveToLocalStorage(newState) {
    const currentState = this.getStorageState();
    const updatedState = {
      ...currentState,
      bookmarks: newState
    };

    localStorage.setItem(this.storageKey, JSON.stringify(updatedState));

    window.dispatchEvent(new CustomEvent('bookmarktoggledglobal', {
      detail: { bookmarks: updatedState.bookmarks }
    }));
  }

  getSavedBlogs(allBlogs) {
    return allBlogs.filter(blog => this.state.bookmarks[blog.id]);
  }

  updateState(newBookmarks) {
    this.state = {
      ...this.state,
      bookmarks: newBookmarks
    };

    this.saveToLocalStorage(newBookmarks);
  }

  addSavedItem(blogId) {
    this.updateState({
      ...this.state.bookmarks,
      [blogId]: true
    });
  }

  removeSavedItem(blogId) {
    const newBookmarks = { ...this.state.bookmarks };
    delete newBookmarks[blogId];
    this.updateState(newBookmarks);
  }

  isSaved(blogId) {
    return !!this.state.bookmarks[blogId];
  }
}

export default new SavedItemsService();