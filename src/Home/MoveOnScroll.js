export class MoveOnScroll{
   constructor() {
      const navHeight = document.querySelector('.navigation')
      const aboutMyExperience = document.querySelector('.experiences_position');
      const aboutMyServices = document.querySelector('.services_position');

      const myOfferPrev = document.querySelector('.offer_prev');
      const myOfferItems = document.querySelectorAll('.offer_items>.offer_item>div');
      const myOfferItemsWrapper = document.querySelector('.offer_items');

      const myRealisationPrev = document.querySelector('.pictureOfrealisation .offer_prev');
      const myRealisationItems = document.querySelectorAll('.offer_items>.realisation_item>div');
      const myRealisationItemsWrapper = document.querySelector('.pictureOfrealisation .offer_items');

      this.numberToLoop = 0;
      this.offerBoolen = true;
      this.realisationBoolen = true;
      this.interval;
      
      window.addEventListener('load', () => this.MoveAllElementOnScrollOrLoad(navHeight, aboutMyExperience, aboutMyServices, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper));
      window.addEventListener('scroll', () => this.MoveAllElementOnScrollOrLoad(navHeight, aboutMyExperience, aboutMyServices, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper));
   }

   MoveAllElementOnScrollOrLoad(navHeight, eleExp, eleServ, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper) {
      this.getPosElement(navHeight, eleExp, eleServ, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper);

      this.aboutMeMovingEl(eleExp, eleServ);

      this.myOfferMovingEl(myOfferPrev, myOfferItems);

      this.myRealisationMovingEl(myRealisationPrev, myRealisationItems);
   }
   
   getPosElement = (navHeight, eleExp, eleServ, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper) => {
      this.navHeight = navHeight.clientHeight;
      this.posScroll = window.scrollY;
      this.windowHeight = document.documentElement.clientHeight;
      
      // DONT REAPEAT YOURSELF!!!!!!
      this.DistAboutMyExperience = eleExp.getBoundingClientRect().top;
      this.DistAboutMyServices = eleServ.getBoundingClientRect().top;
      this.aboutMyExperienceHeight = eleExp.clientHeight;

      this.distOfferPrevEl = myOfferPrev.getBoundingClientRect().top;
      this.distOfferItemEl = myOfferItemsWrapper.getBoundingClientRect().top;
      this.offerPrevElHeight = myOfferPrev.clientHeight;
      this.offerItemElHeight = myOfferItemsWrapper.clientHeight;

      this.distRealisationPrevEl = myRealisationPrev.getBoundingClientRect().top;
      this.distRealisationItemEl = myRealisationItemsWrapper.getBoundingClientRect().top;
      this.RealisationPrevElHeight = myRealisationPrev.clientHeight;
      this.RealisationItemElHeight = myRealisationItemsWrapper.clientHeight;
   };

   aboutMeMovingEl(eleExp, eleServ) {
      const windowWidth = document.documentElement.clientWidth;

      if ((this.DistAboutMyExperience -  this.windowHeight < 0) && windowWidth > 721 && ((this.DistAboutMyExperience *-1)+ 2 * this.navHeight)<this.aboutMyExperienceHeight ) {
         this.slideOnLoadPage(eleExp);
         this.slideOnLoadPage(eleServ);
      }
   }

   // DONT REPEAT YOURSELF!!!!!!
   myOfferMovingEl(myOfferPrev, myOfferItems) {
      if ((this.distOfferPrevEl -  this.windowHeight < 0) && ((this.distOfferPrevEl *-1)+ 2 * this.navHeight)<this.offerPrevElHeight ) {
         this.slideOnLoadPage(myOfferPrev)
      }
      if ((this.distOfferItemEl - this.windowHeight < 0) && ((this.distOfferItemEl * -1) + 2 * this.navHeight) < this.offerItemElHeight) {
         if (this.number2 === false) return
         this.offerBoolen = false;
         this.setTime(myOfferItems);
      }
   }

   myRealisationMovingEl(myRealisationPrev, myRealisationItems) {
      if ((this.distRealisationPrevEl -  this.windowHeight < 0) && ((this.distRealisationPrevEl *-1)+ 2 * this.navHeight)<this.RealisationPrevElHeight ) {
         this.slideOnLoadPage(myRealisationPrev)
      }
      if ((this.distRealisationItemEl - this.windowHeight < 0) && ((this.distRealisationItemEl * -1) + 2 * this.navHeight) < this.RealisationItemElHeight) {
         if (this.number2 === false) return
         this.realisationBoolen = false;
         this.setTime(myRealisationItems)
      }
   }

   setTime(items) {
      clearInterval(this.interval)
      this.slideOnLoadPage(items[this.numberToLoop])
      this.numberToLoop++;
      if (this.numberToLoop == 4) return this.numberToLoop=0;
      this.interval = setInterval(()=>this.setTime(items), 100);
   }

   slideOnLoadPage(ele) {
      setTimeout(() => {
         ele.style.transition='opacity 1s, left 1s';
         ele.style.left = '0';
         ele.style.opacity = '1';
      }, 100);
   }
}