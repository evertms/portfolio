class StateService {
    constructor() {
        this.observers = [];
        this.state = JSON.parse(localStorage.getItem('blogState')) || {
            likes: {},
            bookmarks: {}
        };
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyAll() {
        this.observers.forEach(observer => observer.update(this.state));
        localStorage.setItem('blogState', JSON.stringify(this.state));
        console.log('Guardado en localStorage' + this.state);
    }

    toggleLike(blogId) {
        this.state.likes[blogId] = !this.state.likes[blogId];
        this.notifyAll();
    }

    toggleBookmark(blogId) {
        this.state.bookmarks[blogId] = !this.state.bookmarks[blogId];
        this.notifyAll();
    }
}

export const stateService = new StateService();