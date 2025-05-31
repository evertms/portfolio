export class FocusSearchCommand {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

    if (isCtrlOrCmd && event.key.toLowerCase() === 'k') {
      this.execute();
      event.preventDefault();
    }
  };

  execute() {
    const searchBar = document.querySelector('search-bar');
    if (searchBar && searchBar.shadowRoot) {
      const input = searchBar.shadowRoot.querySelector('.search-bar__input');
      if (input) {
        input.focus();
      }
    }
  }
}

export const focusSearchCommand = new FocusSearchCommand();