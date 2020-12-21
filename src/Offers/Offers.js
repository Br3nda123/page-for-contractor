import { Nav } from '../Home/Nav.js';
import { Footer } from '../Home/Footer.js';
import { MoveOnScroll } from './MoveOnScroll.js';

class Offers{
   constructor() {
      this.navigation = new Nav();
      this.btnShowBarNav = document.querySelector('.nav_bar');

      this.btnShowBarNav.addEventListener('click', () => this.navigation.toggleMobileNav(this.btnShowBarNav));

      this.footer = new Footer();

      this.moveOnScroll = new MoveOnScroll();
   }
}

const offers = new Offers();