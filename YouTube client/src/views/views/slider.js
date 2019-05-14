import './slider-style.css';

export default class Slider {
  constructor() {
    this.eventHandlers = {};
  }

  addEventListener(eventName, handler) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  fire(eventName) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        handler();
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  observe() {
    const slider = document.querySelector('.gallery');
    if (slider.scrollWidth - slider.scrollLeft < window.innerWidth) {
      this.fire('meetRightWall');
    }
  }

  // alignGallery() {
  //   const slider = document.querySelector('.gallery');
  //   if
  // }

  // eslint-disable-next-line class-methods-use-this
  buildSliderButtons() {
    const mainContainer = document.querySelector('.main-container');

    const sliderControlBlock = document.createElement('div');
    sliderControlBlock.className = 'slider-control';
    mainContainer.appendChild(sliderControlBlock);

    const buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = '⇦';
    buttonPrev.className = 'prev-slider-button';
    sliderControlBlock.appendChild(buttonPrev);

    const pageIdent = document.createElement('span');
    pageIdent.setAttribute('page', 1);
    pageIdent.className = 'page';
    pageIdent.id = 'page';
    pageIdent.innerText = '0';
    sliderControlBlock.appendChild(pageIdent);

    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = '⇨';
    buttonNext.className = 'next-slider-button';
    sliderControlBlock.appendChild(buttonNext);
  }

  // eslint-disable-next-line class-methods-use-this
  async buildSlider() {
    const slider = document.querySelector('.gallery');
    const page = document.querySelector('.page');
    let isDown = false;
    let startX;
    let scrollLeft;
    let walk;
    const handleDown = (e) => {
      this.observe();
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
      console.log('scrollLeft ', slider.scrollLeft);
    };
    const handleLeave = () => {
      isDown = false;
      slider.classList.remove('active');
      // if (slider.scrollLeft)
      // if (!walk % 273 === 0) {
      //   console.log('align');
      //   slider.scrollLeft -= 100;
      // }
      // walk = 0;
    };
    const handleUp = () => {
      isDown = false;
      slider.classList.remove('active');
      const sliderWrapper = document.querySelector('.wrapper');
      // const test = slider.scrollWidth / sliderWrapper.offsetWidth ^ 0;
      // eslint-disable-next-line no-bitwise
      const test = (slider.scrollWidth - slider.scrollLeft) / sliderWrapper.offsetWidth ^ 0;
      console.log('test, ', test);
      console.log(slider.scrollWidth);
      console.log(sliderWrapper.offsetWidth);
      page.innerText = test;
      /*
        Как только slider.ScrollLeft станет больше половины длины блока, то есть
        длины wrapper, то переключаем страницу на плюс один.
      */
    };
    const handleMove = (e) => {
      const gallery = document.querySelector('.gallery');
      // let alignWalk;
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      walk = (x - startX) * 3;
      // slider.scrollLeft = scrollLeft - walk;
      if (walk > 0) {
        // slider.scrollLeft = 1148;
        gallery.scrollBy(1148, 0);
      } else if (walk < 0) {
        gallery.scrollBy(-1148, 0);
      }
      console.log(walk);

      // if (walk % 273 !== 0) {
      //   alignWalk = 273 - slider.scrollLeft;
      // }
      // slider.scrollLeft = alignWalk;


      // console.log('PageX MOVE: ', e.pageX);
      // console.log('Slider offsetLeft MOVE: ', slider.offsetLeft);
      // console.log(window.innerWidth);
      console.log('walk', walk);
      console.log('slider.scrollLeft: ', slider.scrollLeft);
    };
    slider.addEventListener('mousedown', handleDown);
    slider.addEventListener('mouseleave', handleLeave);
    slider.addEventListener('mouseup', handleUp);
    slider.addEventListener('mousemove', handleMove);

    const handleTouchStart = (e) => {
      this.observe();
      isDown = true;
      slider.classList.add('active');
      startX = e.changedTouches[0].pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
      console.log('test ', slider.scrollWidth);
      console.log(slider.scrollLeft);
      console.log(window.innerWidth);
    };
    const handleTouchMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.changedTouches[0].pageX - slider.offsetLeft;
      walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    };
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleLeave);
    slider.addEventListener('touchmove', handleTouchMove);

    const nextButton = document.querySelector('.next-slider-button');
    const prevButton = document.querySelector('.prev-slider-button');
    const gallery = document.querySelector('.gallery');
    /*
    sliderWrapper using below, because it class set the slider width.
    You can call only slider, if your slider don't have wrapper.
    */
    const sliderWrapper = document.querySelector('.wrapper');
    const handleButtonNext = () => {
      this.observe();
      const currentSliderWidth = sliderWrapper.offsetWidth;
      gallery.scrollBy(currentSliderWidth, 0);
      console.log(currentSliderWidth);
      console.log(slider.scrollWidth);
      console.log(slider.scrollLeft);
      console.log('offsetLeft: ', slider.offsetLeft);
      if (slider.scrollLeft === 0) {
        page.setAttribute('page', 1);
        page.innerText = 1;
      }
      // if (slider.scrollLeft)
    };
    const handleButtonPrev = () => {
      const currentSliderWidth = sliderWrapper.offsetWidth;
      gallery.scrollBy(-currentSliderWidth, 0);
      console.log(currentSliderWidth);
    };
    nextButton.addEventListener('click', handleButtonNext);
    prevButton.addEventListener('click', handleButtonPrev);
  }
}

// Передлать свайпы! За один мах перелистывать сразу по 4 слайда и всё.
