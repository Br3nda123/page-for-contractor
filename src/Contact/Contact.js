import { Nav } from '../Home/Nav.js';
import { Footer } from '../Home/Footer.js';
import { ValidForm } from './ValidForm.js';

class Contact{
   constructor() {
      this.navigation = new Nav();
      this.footer = new Footer();
      this.validForm = new ValidForm();

      this.btnShowBarNav = document.querySelector('.nav_bar');
      this.navBarArrowOffers = document.querySelector('.fa-arrow-alt-circle-down');

      this.btnShowBarNav.addEventListener('click', () => this.navigation.toggleMobileNav(this.btnShowBarNav));
      this.navBarArrowOffers.addEventListener('click', () => this.navigation.ejectOrHideNavOffers(this.navBarArrowOffers));
   }
}

const contact = new Contact();