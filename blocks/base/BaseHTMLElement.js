export default class BaseHTMLElement extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    async loadHTML(HTMLPath) {
        const responseHtml = await fetch(HTMLPath);
        const html = await responseHtml.text();
        this.shadowRoot.innerHTML = html;
    }
}