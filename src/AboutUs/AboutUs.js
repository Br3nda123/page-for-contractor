import { Nav } from '../Home/Nav.js';
import { Footer } from '../Home/Footer.js';
import { MoveOnScroll } from './MoveOnScroll.js';

class AboutUs{
   constructor() {
      this.navigation = new Nav();
      this.btnShowBarNav = document.querySelector('.nav_bar')
      this.btnHideBarNav = document.querySelector('.back-to-main-page')

      this.btnShowBarNav.addEventListener('click', () => this.navigation.toggleMobileNav(this.btnShowBarNav));

      this.footer = new Footer();

      this.move = new MoveOnScroll();
   }
}

const about = new AboutUs();