const MAX_SCEEN_WIDTH_TO_EFECTS = 721;

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

      const everySolutionInOneImg = document.querySelector('.everySolutionInOne>img');
      const everySolutionInOneText = document.querySelector('.everySolutionInOne .description');

      const renewableSorceOfEnergy_textWrapper = document.querySelector('.renewableSorceOfEnergy_textWrapper');
      const renewableSorceOfEnergy_Img = document.querySelectorAll('.renewableSorceOfEnergy .img_wrapper>img');
      const renewableSorceOfEnergy_Wrapper = document.querySelector('.renewableSorceOfEnergy .img_wrapper');

      const footer_leftText = document.querySelector('.footer .contactFooter');
      const footer_rightTextWrapper = document.querySelector('.footer .wrapper');
      const footer_Text = document.querySelectorAll('.footer .wrapper .slide');

      this.boolean = {
         numberToLoop: 0,
         boolean: true,
         interval:0,
      }
      this.checkBoolen = {
         boolean:true,
         number:0,
         interval:0,
      }
      
      window.addEventListener('load', () => this.MoveAllElementOnScrollOrLoad(navHeight, aboutMyExperience, aboutMyServices, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper, everySolutionInOneImg, everySolutionInOneText, renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Img, renewableSorceOfEnergy_Wrapper, footer_leftText, footer_Text, footer_rightTextWrapper));
      window.addEventListener('scroll', () => this.MoveAllElementOnScrollOrLoad(navHeight, aboutMyExperience, aboutMyServices, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper, everySolutionInOneImg, everySolutionInOneText, renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Img, renewableSorceOfEnergy_Wrapper, footer_leftText, footer_Text, footer_rightTextWrapper));
   }

   MoveAllElementOnScrollOrLoad(navHeight, eleExp, eleServ, myOfferPrev, myOfferItems, myOfferItemsWrapper, myRealisationPrev, myRealisationItems, myRealisationItemsWrapper, everySolutionInOneImg, everySolutionInOneText, renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Img, renewableSorceOfEnergy_Wrapper,footer_leftText, footer_Text, footer_rightTextWrapper) {
      this.getPosElement(navHeight, eleExp, eleServ);

      this.aboutMeMovingEl(eleExp, eleServ);

      this.myOfferMovingEl(myOfferPrev, myOfferItems, myOfferItemsWrapper);

      this.myRealisationMovingEl(myRealisationPrev, myRealisationItems, myRealisationItemsWrapper);

      this.solutionDescriptionMovingEl(everySolutionInOneImg, everySolutionInOneText);

      this.renewableDescriptionMovingEl(renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Img, renewableSorceOfEnergy_Wrapper);

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

   connectingOtherElements(leftEl, rightEl, distLeftEl, heightLeftEl) {
      const windowWidth = document.documentElement.clientWidth;
      const boolen = (distLeftEl - this.windowHeight < 0)
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS
         && ((distLeftEl * -1) + 2 * this.navHeight) < heightLeftEl;
      
      if (boolen) {
         this.slideOnLoadPage(leftEl);
         this.slideOnLoadPage(rightEl);
      }
   }


   aboutMeMovingEl(eleExp, eleServ) {
      const param = this.getParam(eleExp, eleServ);

      this.connectingOtherElements(eleExp, eleServ, param.distText, param.heightText);
   }

   solutionDescriptionMovingEl(everySolutionInOneImg, everySolutionInOneText) {
      const param = this.getParam(everySolutionInOneImg, everySolutionInOneText);

      this.connectingOtherElements(everySolutionInOneImg, everySolutionInOneText, param.distText, param.heightText);
   }

   renewableDescriptionMovingEl(renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Img, renewableSorceOfEnergy_Wrapper) {
       const param = this.getParam(renewableSorceOfEnergy_textWrapper, renewableSorceOfEnergy_Wrapper);

      this.connectingFooter(param.distText, param.heightText, renewableSorceOfEnergy_textWrapper, param.distWrapper, param.heightWrapper, renewableSorceOfEnergy_Img, 1, 5);
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

   connectingMyOfferAndRealisation(distTextEl, heightTextEl, textEl, distImgEl, heightImgEl, imgEl, num1 = 1, num2 = 1) {
      const windowWidth = document.documentElement.clientWidth;
      const booleanTextEl = (distTextEl - this.windowHeight < 0)
         && ((distTextEl * -1) + 2 * this.navHeight) < num1 * heightTextEl
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS;
      const booleanImgEl = (distImgEl - this.windowHeight < 0)
         && ((distImgEl * -1) + 2 * this.navHeight) < num2 * heightImgEl
         && windowWidth > MAX_SCEEN_WIDTH_TO_EFECTS;

      if (booleanTextEl) {
         this.slideOnLoadPage(textEl);
      }
      if (booleanImgEl) {
         if (this.boolean.boolean == false) return;
         this.boolean.boolean = false;
         this.setTime(imgEl);
      } 
   }

   myOfferMovingEl(myOfferPrev, myOfferItems, myOfferItemsWrapper) {
      const param = this.getParam(myOfferPrev, myOfferItemsWrapper);

      this.connectingMyOfferAndRealisation(param.distText, param.heightText, myOfferPrev, param.distWrapper, param.heightWrapper, myOfferItems);
   }

   myRealisationMovingEl(myRealisationPrev, myRealisationItems, myRealisationItemsWrapper) {
      const param = this.getParam(myRealisationPrev, myRealisationItemsWrapper);

      this.connectingMyOfferAndRealisation(param.distText, param.heightText, myRealisationPrev, param.distWrapper, param.heightWrapper, myRealisationItems);
   }

   setTime(items) {
      clearInterval(this.boolean.interval);
      this.slideOnLoadPage(items[this.boolean.numberToLoop]);
      this.boolean.numberToLoop++;
      if (this.boolean.numberToLoop == items.length) {
         return this.boolean = {
            boolean: true,
            numberToLoop:0
         }
      }
      this.boolean.interval = setInterval(()=>this.setTime(items), 200);
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