import { ShowPicture } from './ShowPicture.js';

const MAX_WIDTH_BY_3_ELEMENTS = 750;
const MAX_WIDTH_BY_2_ELEMENTS = 500;
export const NUMBER_OF_PICTURES_IN_HEAT_POMP = 5;
export const NUMBER_OF_PICTURES_IN_PV = 5;
export const NUMBER_OF_PICTURES_IN_WENT = 5;
export const NUMBER_OF_PICTURES_IN_HEATING = 5;

class Slider{
   constructor() {
      this.heatPompWrapper = document.getElementById('realization__heat-pomp-section');
      this.pvWrapper = document.getElementById('realization__PV-section');
      this.wentWrapper = document.getElementById('realization__went-section');
      this.heatingWrapper = document.getElementById('realization__heating-section');

      this.btnNextSlide = document.querySelectorAll('.realization__arrow-right');
      this.btnPreviousSlide = document.querySelectorAll('.realization__arrow-left');

      this.modal = document.querySelector('.modal__show-picture');
      this.img = this.modal.querySelector('.modal__picture-wrapper img');
      this.btnModalNextSlide = this.modal.querySelector('.modal__show-picture-arrows > .fa-chevron-right');
      this.btnModalPreviousSlide = this.modal.querySelector('.modal__show-picture-arrows > .fa-chevron-left');
      this.btnModalHide = this.modal.querySelector('.modal__picture-wrapper .fa-times');

      this.arrayByElements;
      this.transition = true;
      this.interval;
      
      this.sliderPath = [
         {
            path: 'realizationHeatPomp',
            number: 0,
            wrapper: this.heatPompWrapper,
            numberOfPictures: NUMBER_OF_PICTURES_IN_HEAT_POMP,
         },
         {
            path: 'realizationPV',
            number: 0,
            wrapper: this.pvWrapper,
            numberOfPictures: NUMBER_OF_PICTURES_IN_PV,
         },
         {
            path: 'realizationWent',
            number: 0,
            wrapper: this.wentWrapper,
            numberOfPictures: NUMBER_OF_PICTURES_IN_WENT,
         },
         {
            path: 'realizationHeating',
            number: 0,
            wrapper: this.heatingWrapper,
            numberOfPictures: NUMBER_OF_PICTURES_IN_HEATING,
         }
      ];

      this.showPicture = new ShowPicture( this.interval, () => this.nextSliderInterval());
         
      window.addEventListener('load', () => this.checkWindowWidth());
      window.addEventListener('resize', () => this.checkWindowWidth());
      this.btnNextSlide.forEach(next => next.addEventListener('click',()=>this.nextSlide()));
      this.btnPreviousSlide.forEach(prev => prev.addEventListener('click', () => this.previousSlide())); 

      this.btnModalHide.addEventListener('click', () => this.showPicture.hidePicture(this.interval, this.modal));
      this.btnModalNextSlide.addEventListener('click', () => this.showPicture.nextSlide(this.img))
      this.btnModalPreviousSlide.addEventListener('click', () => this.showPicture.previousSlide(this.img));

      window.addEventListener('keyup', ()=>this.showPicture.changeSlideOfHideOnKeybordaClick(this.interval, this.modal, this.img));
   }

   checkWindowWidth() {
      const windowWidth = document.documentElement.clientWidth;
      let array;

      if (windowWidth > MAX_WIDTH_BY_3_ELEMENTS) {
         array = ['-33%', '0', '33%', '66%', '100%'];
      } else if(windowWidth > MAX_WIDTH_BY_2_ELEMENTS) {
         array = ['-50%', '0', '50%', '100%'];
      } else {
         array = ['-100%', '0', '100%'];
      };

      if (!this.arrayByElements || this.arrayByElements.length != array.length) {
         this.removeAllEl();
         this.arrayByElements = array;
         this.init();
      };
   }

   removeAllEl() {
      this.sliderPath.forEach(slider => {
         const imgElements = [...slider.wrapper.querySelectorAll('img')];

         for (let i = 0; i < imgElements.length; i++) {
            imgElements[i].remove();
         };
      });
   }
   
   init() {
      clearInterval(this.interval);
      this.sliderPath.forEach(slider => {
         for (let i = 0; i < this.arrayByElements.length; i++) {
            const img = this.createImg(i, slider);
            slider.wrapper.appendChild(img);
            
            slider.number++;
            if (slider.number >= slider.numberOfPictures) {
               slider.number = 0;
            };
         };
      });
      this.interval = setInterval(() => this.nextSliderInterval(), 3000);
      event.target.addEventListener('click', () => this.showPicture.showPicture(this.interval, this.img, this.modal));
   }

   createImg(i, slider) {
      let img = document.createElement('img');
      img.setAttribute('src', `../images/realization/${slider.path}/realization-${slider.number}.jpeg`);
      img.setAttribute('alt', 'Photo from our realization');
      img.setAttribute('id', slider.number);
      img.dataset.path = slider.path;

      img.style.left = `${this.arrayByElements[i]}`;

      return img;
   }

   checkWhichArrow() {
      const element = event ? event.target.closest('.realization__photos').getAttribute('id') : null;
      if (element == 'realization__heat-pomp-section') {
         return this.sliderPath[0];
      } else if (element == 'realization__PV-section') {
         return this.sliderPath[1];
      } else if (element == 'realization__went-section') {
         return this.sliderPath[2];
      } else if (element == 'realization__heating-section') {
         return this.sliderPath[3];
      };
   }

   slide(slider) {
      const imgElements = [...slider.wrapper.querySelectorAll('img')];
      this.transition = false;
      imgElements[0].remove();
      imgElements.shift();

      for (let i = 0; i < imgElements.length; i++){
         imgElements[i].style.left = `${this.arrayByElements[i]}`;
      };
      this.transitioned(imgElements);

      const img = this.createImg(this.arrayByElements.length - 1, slider);

      slider.number++;
      slider.number = this.showPicture.validNumber(slider.number, slider.numberOfPictures)

      slider.wrapper.appendChild(img);
   }

   nextSliderInterval() {
      if (this.transition == true) {
         this.sliderPath.forEach(slider => {
            this.slide(slider);
         });
      };
   }

   nextSlide() {
      if (this.transition == true) {
         clearInterval(this.interval);

         const sliderPath = this.checkWhichArrow();
         this.slide(sliderPath);

         this.interval = setInterval(() => this.nextSliderInterval(), 3000);
      };
   }

   previousSlide() {
      if (this.transition == true) {
         const sliderPath = this.checkWhichArrow();

         clearInterval(this.interval);
         const imgElements = [...sliderPath.wrapper.querySelectorAll('.realization__photos img')];

         this.transition = false;
         imgElements[this.arrayByElements.length-1].remove();
         imgElements.pop();

         for (let i = imgElements.length; i > 0; i--){
            imgElements[i-1].style.left = `${this.arrayByElements[i]}`;
         };
         this.transitioned(imgElements);

         sliderPath.number--;
         sliderPath.number = this.showPicture.validNumber(sliderPath.number, sliderPath.numberOfPictures);

         const img = this.createImg(0, sliderPath);

         sliderPath.wrapper.insertBefore(img, imgElements[0]);

         this.interval = setInterval(() => this.nextSliderInterval(), 3000);
      };
   }

   transitioned(elements) {
      elements.forEach(img => img.addEventListener('transitionend', () => {
         this.transition = true;
      }));
   };
}

export const slider = new Slider();