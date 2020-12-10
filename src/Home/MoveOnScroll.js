export class MoveOnScroll{
   constructor() {
      const aboutMyExperience = document.querySelector('.experiences_position');
      const aboutMyServices = document.querySelector('.services_position');

      const posScroll = window.scrollY;
      const DistAboutMyExperience = aboutMyExperience.offsetTop;
      const DistAboutMyServices = aboutMyServices.offsetTop;

      window.addEventListener('load', () => this.AboutMeMovingEl(DistAboutMyExperience, DistAboutMyServices, aboutMyExperience, aboutMyServices));
      window.addEventListener('scroll', () => this.AboutMeMovingEl(DistAboutMyExperience, DistAboutMyServices, aboutMyExperience, aboutMyServices));
   }

   AboutMeMovingEl(posExp,posServ, eleExp, eleServ) {
      const posScroll = document.documentElement.scrollTop;
      const windowWidth = document.documentElement.scrollWidth;
      console.log(posExp, posServ, posScroll, windowWidth);
      if (posScroll > posExp && windowWidth > 721) {
         this.slideOnLoadPage(eleExp);
         this.slideOnLoadPage(eleServ);
      }
   }

   slideOnLoadPage(ele) {
      setTimeout(() => {
         ele.style.transition='opacity 1s, left 1s';
         ele.style.left = '0';
         ele.style.opacity = '1';
      }, 300);
   }
}

// transition: opacity 1s, left 1s;