import { slider, NUMBER_OF_PICTURES_IN_HEAT_POMP, NUMBER_OF_PICTURES_IN_PV, NUMBER_OF_PICTURES_IN_WENT, NUMBER_OF_PICTURES_IN_HEATING } from './Slider.js';

export class ShowPicture{
   constructor() {
      this.idElement;
      this.pathElement;
      this.numberOfElements;
      this.modalIsOn = false;
   }

   showPicture(interval, img, modal) {
      if (event.target.hasAttribute('id') && event.target.hasAttribute('src')) {
         const src = event.target.getAttribute('src');
         const id = event.target.getAttribute('id');
         const dataPath = event.target.dataset.path;

         this.setAttributes(img, src, id);
         this.idElement = id;
         this.pathElement = dataPath;
         this.numberOfElements = this.checkHowManyPictureIsInFolder(this.pathElement);
         img.dataset.path = dataPath;
         modal.style.display = 'block';
         clearInterval(interval);

         this.modalIsOn = true;
      };
   }

   hidePicture(interval, modal) {
      clearInterval(interval);
      modal.style.display = 'none';
      this.modalIsOn = false;

      slider.interval = setInterval(() => slider.nextSliderInterval(), 3000);
   }

   nextSlide(clickedImg) {
      this.idElement++;
      this.changeSlide(clickedImg);
   }

   previousSlide(clickedImg) {
      this.idElement--;
      this.changeSlide(clickedImg);
   }

   changeSlide(clickedImg) {
      this.idElement = this.validNumber(this.idElement, this.numberOfElements);
      let src = `../images/realization/${this.pathElement}/realization-${this.idElement}.jpeg`;
      this.setAttributes(clickedImg, src, this.idElement);
   }

   changeSlideOfHideOnKeybordaClick(interval, modal, clickedImg) {
      if (this.modalIsOn) {
         if (event.keyCode == 27) {
            this.hidePicture(interval, modal);
         } else if (event.keyCode == 37) {
            this.previousSlide(clickedImg);
         } else if (event.keyCode == 39) {
            this.nextSlide(clickedImg);
         };
      };
   }

   setAttributes(img, src, id) {
      img.setAttribute('src', src);
      img.setAttribute('id', id);
   }

   checkHowManyPictureIsInFolder(datasetEl) {
      let numberOfElements;
      switch (datasetEl) {
         case 'realizationHeatPomp':
            numberOfElements = NUMBER_OF_PICTURES_IN_HEAT_POMP;
            break;
         case 'realizationPV':
            numberOfElements = NUMBER_OF_PICTURES_IN_PV;
            break;
         case 'realizationWent':
            numberOfElements = NUMBER_OF_PICTURES_IN_WENT;
            break;
         case 'realizationHeating':
            numberOfElements = NUMBER_OF_PICTURES_IN_HEATING;
            break;
         default:
            console.log('błąd');
      };
      return numberOfElements;
   }

   validNumber(number, numberOfPictures) {
      if (number >= numberOfPictures) {
         number = 0;
      }else if (number < 0) {
         number = numberOfPictures - 1;
      };
      return number;
   }
}