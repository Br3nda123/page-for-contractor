const MAX_SCEEN_WIDTH_TO_EFECTS = 721;

export class Footer{
   constructor() {
      const navHeight = document.querySelector('.navigation');

      const footer_leftText = document.querySelector('.footer .contactFooter');
      const footer_rightTextWrapper = document.querySelector('.footer .wrapper');
      const footer_Text = document.querySelectorAll('.footer .wrapper .slide');

      this.checkBoolen = {
         boolean:true,
         number:0,
         interval:0,
      }
      
      window.addEventListener('load', () => this.MoveAllElementOnScrollOrLoad(navHeight, footer_leftText, footer_Text, footer_rightTextWrapper));
      window.addEventListener('scroll', () => this.MoveAllElementOnScrollOrLoad(navHeight, footer_leftText, footer_Text, footer_rightTextWrapper));
   }

   MoveAllElementOnScrollOrLoad(navHeight, footer_leftText, footer_Text, footer_rightTextWrapper) {
      this.getPosElement(navHeight);
      this.footerMovingEl(footer_leftText, footer_Text, footer_rightTextWrapper);
   }
   
   getPosElement = (navHeight) => {
      this.navHeight = navHeight.clientHeight;
      this.posScroll = window.scrollY;
      this.windowHeight = document.documentElement.clientHeight;
   };

   getParam(text, wrapper) {
      const distText = text.getBoundingClientRect().top;
      const distWrapper = wrapper.getBoundingClientRect().top;
      const heightText = text.clientHeight;
      const heightWrapper = wrapper.clientHeight;

      return { distText, distWrapper, heightText, heightWrapper };
   }

   footerMovingEl(footer_leftText, footer_Text, footer_rightTextWrapper) {
      const param = this.getParam(footer_leftText,footer_rightTextWrapper);

      this.connectingFooter(param.distText, param.heightText, footer_leftText, param.distWrapper, param.heightWrapper, footer_Text);
   }

   connectingFooter(distTextEl, heightTextEl, textEl, distImgEl, heightImgEl, imgEl) {
      const windowWidth = document.documentElement.clientWidth;
      const booleanTextEl = (distTextEl - this.windowHeight < 0)
         && ((distTextEl * -1) + 2 * this.navHeight) <  heightTextEl
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS;
      const booleanImgEl = (distImgEl - this.windowHeight < 0)
         && ((distImgEl * -1) + 2 * this.navHeight) <  heightImgEl
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS;

      if (booleanTextEl) {
         this.slideOnLoadPage(textEl);
      }
      if (booleanImgEl) {
         if (this.checkBoolen.boolean == false) return;
         this.checkBoolen.boolean = false;
         this.setTimeFooter(imgEl);
      } 
   }

   setTimeFooter(items) {
      clearInterval(this.checkBoolen.interval);
      this.slideOnLoadPage(items[this.checkBoolen.number]);
      this.checkBoolen.number++;
      if (this.checkBoolen.number == items.length) {
         return this.checkBoolen = {
            boolean: true,
            number: 0,
         };
      };
      this.checkBoolen.interval = setInterval(()=>this.setTimeFooter(items), 200);
   }

   slideOnLoadPage(ele) {
      setTimeout(() => {
         ele.style.transition='opacity 0.9s, left 0.9s';
         ele.style.left = '0';
         ele.style.opacity = '1';
      }, 100);
   };
}