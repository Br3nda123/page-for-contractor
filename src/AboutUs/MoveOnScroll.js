const MAX_SCEEN_WIDTH_TO_EFECTS = 721;

export class MoveOnScroll{
   constructor() {
      const navHeight = document.querySelector('.navigation');

      const authorizedInstallerWrapper = document.querySelectorAll('.authorized-installer__wrapper');
      const descriptWhereWeWorkWrapper = document.querySelector('.whereWeWork__descript');
      const guaranteeWhereWeWorkWrapper = document.querySelector('.whereWeWork__guarantee');
      const leftGuaranteeWhereWeWorkEl = document.querySelector('.whereWeWork__guarantee-producense');
      const rightGuaranteeWhereWeWorkEl = document.querySelector('.whereWeWork__guarantee-guarantee');
      
      window.addEventListener('load', () => this.MoveAllElementOnScrollOrLoad(navHeight, authorizedInstallerWrapper, descriptWhereWeWorkWrapper, guaranteeWhereWeWorkWrapper, leftGuaranteeWhereWeWorkEl, rightGuaranteeWhereWeWorkEl));
      window.addEventListener('scroll', () => this.MoveAllElementOnScrollOrLoad(navHeight, authorizedInstallerWrapper, descriptWhereWeWorkWrapper, guaranteeWhereWeWorkWrapper, leftGuaranteeWhereWeWorkEl, rightGuaranteeWhereWeWorkEl));
   }

   MoveAllElementOnScrollOrLoad(navHeight, authorizedInstallerWrapper, descriptWhereWeWorkWrapper, guaranteeWhereWeWorkWrapper, leftGuaranteeWhereWeWorkEl, rightGuaranteeWhereWeWorkEl) {
      this.getPosElement(navHeight);

      this.MoveAuthorizedInstallerWrapper(authorizedInstallerWrapper);
      this.MoveDescriptWhereWeWorkWrapper(descriptWhereWeWorkWrapper);
      this.MoveGuaranteeWhereWeWorkWrapper(guaranteeWhereWeWorkWrapper, leftGuaranteeWhereWeWorkEl, rightGuaranteeWhereWeWorkEl);
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

   connectingGuaranteeEl(leftEl, rightEl, distWrapper, heightWrapper) {
      const windowWidth = document.documentElement.clientWidth;
      const boolen = (distWrapper - this.windowHeight < 0)
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS
         && ((distWrapper * -1) + 1.5 * this.navHeight) < heightWrapper;

      if (boolen) {
         this.slideOnLoadPage(leftEl);
         this.slideOnLoadPage(rightEl);
      };
   }

   MoveAuthorizedInstallerWrapper(authorizedInstallerWrapper) {
      authorizedInstallerWrapper.forEach(wrapper =>
         this.connectingSingleEl(wrapper, ...this.getParam(wrapper)));
   }

   MoveDescriptWhereWeWorkWrapper(descriptWhereWeWorkWrapper) {
      const param = this.getParam(descriptWhereWeWorkWrapper);

      this.connectingSingleEl(descriptWhereWeWorkWrapper, ...param);
   }

   MoveGuaranteeWhereWeWorkWrapper(wrapper, leftEl, rightEl) {
       const param = this.getParam(wrapper);

      this.connectingGuaranteeEl(leftEl, rightEl, ...param);
   }

   slideOnLoadPage(ele) {
      setTimeout(() => {
         ele.style.transition='opacity 0.9s, left 0.9s';
         ele.style.left = '0';
         ele.style.opacity = '1';
      }, 100);
   };
}