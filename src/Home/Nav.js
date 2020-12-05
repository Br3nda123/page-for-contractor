export class Nav{
   constructor() {
      this.navigationBarList = document.querySelector('.nav_phone_list');
   }

   toggleMobileNav(hamburger) {
      if (this.navigationBarList.className.includes('showNav')) {
         this.hideMobileNav(hamburger);
      } else if (!this.navigationBarList.className.includes('showNav')) {
         this.showMobileNav(hamburger);
      };
   };

   showMobileNav(hamburger) {
      this.navigationBarList.classList.add('showNav');
      hamburger.innerHTML = '<i class="fas fa-times"></i>';
      hamburger.style.color = 'var(--color-white)';
   };

   hideMobileNav(hamburger) {
      this.navigationBarList.classList.remove('showNav');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      hamburger.style.color = 'black';
   };
};