export class Slider {
   constructor() {
      this.num = 0;
      this.intervalNumber;

      this.sliderInfo = [
         {
            headingH4: 'Ogrzewanie wodne za pomocą czystej energii',
            headingH1: 'Pompa ciepła',
            description: 'Są czystym źródłem ciepła – nie wytwarzają dymu, smogu, nie wymagają stałego nadzoru i dokładania paliwa.',
            img: '../../images/sliderPhoto/slider-pompa-ciepla.jpg'
         },
         {
            headingH4: 'Zasilanie urządzeń za pomocą energii słońca',
            headingH1: 'Fotowoltaika',
            description: 'Tworzenie energii elektrycznej za pomocą energii słońca jest aktualnie najbardziej ekonomicznym wymyślonym rozwiązaniem',
            img: '../../images/sliderPhoto/slider-fotowoltaika.jpg'
         },
         {
            headingH4: 'Energooszczędność i komfort użytkowania',
            headingH1: 'Wentylacja i klimatyzacja',
            description: 'W porównaniu z wentylacją grawitacyjną, wentylacja mechaniczna zapewnia stale świeże powietrze w domu oraz oszczędność poprzez rekuperację, a klimatyzacja chłód i komfort latem.',
            img: '../../images/sliderPhoto/slider-klimatyzacja-wentylacja.jpg'
         },
         {
            headingH4: 'Równomierny rozkład temperatury',
            headingH1: 'Ogrzewanie podłogowe',
            description: 'Ogrzewanie podłogowe to jedne z najczęściej wybieranych rozwiązań w nowo budowanych domach.',
            img: '../../images/sliderPhoto/slider-ogrzewanie-podłogowe.jpg'
         },
      ];
      this.slider = document.querySelector('.slider');
      this.sliderHeadingH4 = document.querySelector('.section_slider h4');
      this.sliderHeadingH1 = document.querySelector('.section_slider h1');
      this.sliderPar = document.querySelector('.section_slider p');
   };

   setSlideData() {
      this.slider.style.backgroundImage = `url("${this.sliderInfo[this.num].img}")`;
      this.sliderHeadingH4.textContent = this.sliderInfo[this.num].headingH4;
      this.sliderHeadingH1.textContent = this.sliderInfo[this.num].headingH1;
      this.sliderPar.textContent = this.sliderInfo[this.num].description;
   };

   firstLoadPage() {
      this.setSlideData();
      this.slideOnLoadPage();
      setTimeout(() => this.init(), 6000);
      this.num++;
   }
   
   init() {
      clearInterval(this.intervalNumber);
      this.hideSlide();
      this.setSlideData();
      this.intervalNumber = setInterval(()=>this.intervalChangeSlide(), 6000);
   };

   nextSlide() {
      this.num++;
      this.checkSliderNumber();
      this.init();
   };

   previousSlide() {
      this.num--;
      this.checkSliderNumber();
      this.init();
   };

   checkSliderNumber() {
      if (this.num < 0) {
         this.num = this.sliderInfo.length - 1;
      } else if (this.num > this.sliderInfo.length - 1) {
         this.num = 0;
      };
   };

   intervalChangeSlide() {
      this.num++;
      this.checkSliderNumber();
      this.init();
   };

   showSlide() {
      this.slider.style.transition = '1s';
      this.slider.style.opacity = 1;
   };

   hideSlide() {
      this.slider.style.transition = '0s';
      this.slider.style.opacity = 0.1;
      setTimeout(() => this.showSlide(), 300);
   };

   slideOnLoadPage() {
      const slider = document.querySelector('.section_slider_position');
      setTimeout(() => {
         slider.style.left = '0';
         slider.style.opacity = '1';
      }, 300);
   }
};