import Notiflix from 'notiflix';
const orderModal = () => {
  const refs = {
    openModalBtn: document.querySelectorAll('[data-modal-open="order-now"]'),
    closeModalBtn: document.querySelector('.modal-close'),
    sendBtn: document.querySelector('.modal-submit'),

    modal: document.getElementById('modal'),
    modalContent: document.querySelector('.order-modal'),
  };

  refs.openModalBtn.forEach(button => {
    button.addEventListener('click', toggleModal);
  });

  refs.closeModalBtn.addEventListener('click', event => {
    event.stopPropagation();
    toggleModal();
  });

  refs.modalContent.addEventListener('click', event => {
    event.stopPropagation();
  });

  refs.modal.addEventListener('click', event => {
    if (event.target === refs.modal) {
      toggleModal();
    }
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (!refs.modal.classList.contains('is-hidden')) {
        toggleModal();
      }
    }
  });

  function toggleModal() {
    if (!refs.modal) return;

    refs.modal.classList.toggle('is-hidden');

    const body = document?.body;

    if (!body) return;

    if (refs.modal.classList.contains('is-hidden')) {
      body.style.overflow = '';
    } else {
      body.style.overflow = 'hidden';
    }
  }

  const form = document.getElementById('order-form');
  if (!refs.modal || !form) return;
  const inputs = form.querySelectorAll('.input-js');

  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      validateInput(input);
      checkFormValidity();
    });
  });
  function validateInput(input) {
    if (input.checkValidity()) {
      input.classList.add('valid');
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
    }
  }
  function checkFormValidity() {
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
      }
    });

    if (isValid) {
      refs.sendBtn.removeAttribute('disabled');
    } else {
      refs.sendBtn.setAttribute('disabled', 'disabled');
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      const formDataObj = new FormData(form);
      const formData = {
        name: formDataObj.get('name')?.trim(),
        phone: formDataObj.get('phone')?.trim(),
        email: formDataObj.get('email')?.trim(),
        comment: formDataObj.get('comment')?.trim(),
      };

      if (
        formData.name === '' ||
        formData.phone === '' ||
        formData.email === ''
      ) {
        Notiflix.Report.failure('Please fill out all required fields.', '');
        return;
      }

      saveFormDataToLocalStorage(formData);
      Notiflix.Report.success('Your order has successfully *been sent.', '');

      form.reset();
      inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
      toggleModal();
    } else {
      Notiflix.Report.failure('Please enter valid data.', '');
    }
  });

  function saveFormDataToLocalStorage(formData) {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    storedData.push(formData);
    localStorage.setItem('storedData', JSON.stringify(storedData));
  }
};

orderModal();
export default orderModal;
