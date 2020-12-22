const MAX_SCEEN_WIDTH_TO_EFECTS = 721;

export class MoveOnScroll{
   constructor() {
      const navHeight = document.querySelector('.navigation');

      const advantagesHeadWrapper = document.querySelector('.offer__head-wrapper');
      const advantagesBottomElements = document.querySelectorAll('.offer__bottom-offers');
      
      window.addEventListener('load', () => this.MoveAllElementOnScrollOrLoad(navHeight, advantagesHeadWrapper, advantagesBottomElements));
      window.addEventListener('scroll', () => this.MoveAllElementOnScrollOrLoad(navHeight, advantagesHeadWrapper, advantagesBottomElements));
   }

   MoveAllElementOnScrollOrLoad(navHeight, advantagesHeadWrapper, advantagesBottomElements) {
      this.getPosElement(navHeight);

      this.MoveAdvantagesHeadElements(advantagesHeadWrapper);
      this.MoveAdvantagesBottomElements(advantagesBottomElements);
   }
   
   getPosElement = (navHeight) => {
      this.navHeight = navHeight.clientHeight;
      this.posScroll = window.scrollY;
      this.windowHeight = document.documentElement.clientHeight;
   };

   getParam(wrapper) {
      const distWrapper = wrapper.getBoundingClientRect().top;
      const heightWrapper = wrapper.clientHeight;

      return [ distWrapper, heightWrapper ];
   }

   connectingSingleEl(wrapper, distWrapper, heightWrapper) {
      const windowWidth = document.documentElement.clientWidth;
      const boolen = (distWrapper - this.windowHeight < 0)
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS
         && ((distWrapper * -1) + 1.5 * this.navHeight) < heightWrapper;

      if (boolen) {
         this.slideOnLoadPage(wrapper);
      };
   }
   
   MoveAdvantagesHeadElements(advantagesHeadWrapper) {
      this.connectingSingleEl(advantagesHeadWrapper, ...this.getParam(advantagesHeadWrapper));
   }

   MoveAdvantagesBottomElements(advantagesBottomElements) {
      advantagesBottomElements.forEach(el => {
         this.connectingSingleEl(el, ...this.getParam(el));
      });
   }

   slideOnLoadPage(ele) {
      setTimeout(() => {
         ele.style.transition='opacity 0.9s, left 0.9s';
         ele.style.left = '0';
         ele.style.opacity = '1';
      }, 100);
   };
}