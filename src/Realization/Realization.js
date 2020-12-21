import { Nav } from '../Home/Nav.js';
import { Footer } from '../Home/Footer.js';
import { slider } from './Slider.js';

class Realization{
   constructor() {
      this.navigation = new Nav();
      this.btnShowBarNav = document.querySelector('.nav_bar');

      this.btnShowBarNav.addEventListener('click', () => this.navigation.toggleMobileNav(this.btnShowBarNav));

      this.footer = new Footer();
   };
}

const realization = new Realization();