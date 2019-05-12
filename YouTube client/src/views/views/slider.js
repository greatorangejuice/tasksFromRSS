import './slider-style.css';

export default class Slider {
  constructor() {
    this.eventHandlers = {};
  }

  // eventHandlers = {
  //   'meetRightWall': [handler1, handler2]
  // }

  // method() {
  // }

  addEventListener(eventName, handler) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  fire(eventName) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        handler(); // Token will be here
      });
    }
  }

  observe() {
    const slider = document.querySelector('.gallery');
    const clip = document.querySelector('.youtube-item');
    const clipWidth = clip.offsetWidth;
    if (slider.offsetWidth + slider.scrollLeft >= slider.scrollWidth - clipWidth) {
      this.fire('meetRightWall');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  buildSliderButtons() {
    const mainContainer = document.querySelector('.main-container');
    const buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = '⇦';
    buttonPrev.className = 'prev';
    mainContainer.appendChild(buttonPrev);

    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = '⇨';
    buttonNext.className = 'next';
    mainContainer.appendChild(buttonNext);
  }

  // eslint-disable-next-line class-methods-use-this
  async buildSlider() {
    const slider = document.querySelector('.gallery');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      console.log(slider.offsetLeft);
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
      this.observe();
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      slider.classList.add('active');
      console.log(e.changedTouches);
    });

    slider.addEventListener('touchend', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const gallery = document.querySelector('.gallery');

    nextButton.addEventListener('click', () => {
      gallery.scrollBy(1148, 0);
    });

    prevButton.addEventListener('click', () => {
      gallery.scrollBy(-1148, 0);
    });
  }
}
