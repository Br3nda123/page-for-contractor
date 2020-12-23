export class ValidForm{
   constructor() {
      this.infoValidForm = document.querySelector('.form__valid > p');
      this.infoSendedForm = document.querySelector('.form__sended-info > p');
      this.btnSendForm = document.querySelector('.form__submit > .submit');
      this.btnResetForm = document.querySelector('.form__submit > .reset');
      this.inputCheck = document.querySelector('#check');
      this.inputFile = document.querySelector('#files');

      const inputMail = document.querySelector('#mail');
      const inputTelephon = document.querySelector('#tel');
      const inputsArr = [...document.querySelectorAll('[data-requered]')];
      
      this.inputCheck.addEventListener('change', () => this.enabledSubmitButton());
      this.btnSendForm.addEventListener('click', () => this.sendForm(inputsArr, inputTelephon, inputMail));
      this.btnResetForm.addEventListener('click', () => this.resetInputs(inputsArr));
   }

   sendForm(inputsArr, inputTelephon, inputMail) {
      event.preventDefault();
      this.resetClassInInputs(inputsArr);
      const formLength = this.checkLength(inputsArr);
      const formTel = this.checkTel(inputTelephon);
      const formMail = this.checkMail(inputMail);

      if (!formLength) {
         this.checkLength(inputsArr);
         this.infoValidForm.textContent = 'Pola oznaczone gwiazdką sa wymagane!';
      };
      if (formTel) {
         this.checkTel(inputTelephon);
         this.infoValidForm.textContent = "Nieprawidłowy numer telefonu.";
      };
      if (formMail) {
         this.checkMail(inputMail);
         this.infoValidForm.textContent = "Nieprawidłowy e-mail.";
      };

      this.checkForm(inputsArr);
   }

   checkForm(inputsArr) {
      let errorCount = 0;
      inputsArr.forEach(el => {
         if (el.classList.contains('input-error')) {
            errorCount++;
         };
      });
      if (errorCount == 0) {
         this.resetClassInInputs(inputsArr);
         this.resetWhenSended(inputsArr);
      } else if (errorCount > 0) {
         this.infoValidForm.classList.add('visible-par');
         this.infoSendedForm.classList.remove('visible-par');
      };
   }

   resetClassInInputs(inputsArr) {
      inputsArr.forEach(el => {
         el.classList.remove('input-error');
      });
   }

   enabledSubmitButton() {
      if (this.inputCheck.checked) {
         this.btnSendForm.disabled = false;
         this.btnSendForm.style.cursor = 'pointer';
      } else {
         this.btnSendForm.disabled = true;
         this.btnSendForm.style.cursor = 'not-allowed';
      };
   }

   resetWhenSended(inputsArr) {
      this.infoValidForm.classList.remove('visible-par');
      this.infoSendedForm.classList.add('visible-par');
      this.inputCheck.checked = false;
      this.enabledSubmitButton();
      this.inputFile.value = '';
      inputsArr.forEach(el => {
         el.value = '';
      });
   }

   resetInputs(inputsArr) {
      this.inputCheck.checked = false;
      this.enabledSubmitButton();
      this.inputFile.value = '';
      this.infoValidForm.classList.remove('visible-par');
      this.infoSendedForm.classList.remove('visible-par');
      inputsArr.forEach(el => {
         el.classList.remove('input-error');
         el.value = '';
      });
   }

   checkLength(inputsArr) {
      inputsArr.some(el => {
         if (!el.value.trim()) {
            el.classList.add('input-error');
            return false;
         };
      });
   }

   checkTel(inputTelephon) {
      const number = Number(inputTelephon.value);

      if (inputTelephon.classList.contains('input-error')) {
         return false;
      } else if (isNaN(number) || inputTelephon.value.length < 8) {
         inputTelephon.classList.add('input-error');

         return true;
      };
      return false;
   }

   checkMail(inputMail) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (inputMail.classList.contains('input-error')) {
         return false;
      } else if(!re.test(inputMail.value)) {
         inputMail.classList.add('input-error');

         return true;
      };
      return false;
   }
}