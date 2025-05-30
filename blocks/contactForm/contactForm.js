import BaseHTMLElement from "../base/BaseHTMLElement.js";

export default class ContactForm extends BaseHTMLElement {
  constructor() {
    super();
    this.fields = {};
    this.validators = {
      name: this.validateRequired,
      email: this.validateEmail,
      subject: this.validateRequired,
      message: this.validateRequired
    };
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    await this.loadHTML('/blocks/contactForm/contactForm.template')
    // Asignar campos
    this.fields.name = this.shadowRoot.getElementById('name');
    this.fields.email = this.shadowRoot.getElementById('email');
    this.fields.subject = this.shadowRoot.getElementById('subject');
    this.fields.message = this.shadowRoot.getElementById('message');

    // Agregar validación reactiva
    this.setupValidation();
  }

  setupValidation() {
    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key];
      if (field) {
        field.addEventListener('blur', () => this.validateField(key));
        field.addEventListener('input', () => this.clearError(field));
      }
    });

    const form = this.shadowRoot.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.validateAllFields();
      });
    }
  }

  validateField(key) {
    const field = this.fields[key];
    const validator = this.validators[key];
    const errorMessageElement = field.closest('.contact-form__field').querySelector('.contact-form__error-message');
    const value = field.value.trim();

    const error = validator ? validator(value) : null;

    if (error) {
      this.showError(field, error);
    } else {
      this.clearError(field);
    }
  }

  validateAllFields() {
    let isValid = true;

    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key];
      const error = this.validators[key] ? this.validators[key](field.value.trim()) : null;

      if (error) {
        this.showError(field, error);
        isValid = false;
      } else {
        this.clearError(field);
      }
    });

    if (isValid) {
      // Aquí puedes enviar el formulario si es válido
      console.log("Formulario válido");
      this.shadowRoot.getElementById('contact-form').reset();
    }

    return isValid;
  }

  validateRequired(value) {
    if (!value || value.trim() === '') {
      return "Este campo no puede estar vacío.";
    }
    return null;
  }

  validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || value.trim() === '') {
      return "El correo es obligatorio.";
    } else if (!emailRegex.test(value)) {
      return "Introduce un correo electrónico válido.";
    }
    return null;
  }

  showError(field, message) {
    const fieldContainer = field.closest('.contact-form__field');
    if (!fieldContainer) return;

    fieldContainer.classList.add('contact-form__field--error');
    const errorSpan = fieldContainer.querySelector('.contact-form__error-message');
    if (errorSpan) errorSpan.textContent = message;
  }

  clearError(field) {
    const fieldContainer = field.closest('.contact-form__field');
    if (!fieldContainer) return;

    fieldContainer.classList.remove('contact-form__field--error');
    const errorSpan = fieldContainer.querySelector('.contact-form__error-message');
    if (errorSpan) errorSpan.textContent = '';
  }
}

customElements.define('contact-form', ContactForm);