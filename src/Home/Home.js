import { Slider } from './Slider.js';

class Home{
   constructor() {
      this.btnNextSlide = document.querySelector('.next_slide_button');
      this.btnPreviousSlide = document.querySelector('.previous_slide_button');

      this.changeSlide = new Slider();

      this.btnNextSlide.addEventListener('click', () => this.changeSlide.nextSlide());
      this.btnPreviousSlide.addEventListener('click', () => this.changeSlide.previousSlide());
   }
}

const home = new Home();