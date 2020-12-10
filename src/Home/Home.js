import { Slider } from './Slider.js';
import { Nav } from './Nav.js';

class Home{
   constructor() {
      this.navigation = new Nav();
      this.btnShowBarNav = document.querySelector('.nav_bar')
      this.btnHideBarNav = document.querySelector('.back-to-main-page')

      this.slider = new Slider();
      this.btnNextSlide = document.querySelector('.next_slide_button');
      this.btnPreviousSlide = document.querySelector('.previous_slide_button');

      this.slider.firstLoadPage();

      this.btnShowBarNav.addEventListener('click', () => this.navigation.toggleMobileNav(this.btnShowBarNav));

      this.btnNextSlide.addEventListener('click', () => this.slider.nextSlide());
      this.btnPreviousSlide.addEventListener('click', () => this.slider.previousSlide());
   }
}

const home = new Home();