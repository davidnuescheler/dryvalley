export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  const slides = [...block.children];
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const button = buttons.children[slides.indexOf(entry.target)];
      if (entry.isIntersecting) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');

      }
    });
  }, {
      root: block,
      threshold: 0.5,
  });

  const scrollToSlide = (slideIndex) => {
      const slide = slides[slideIndex];
      block.scrollTo({ top: 0, left: slide.offsetLeft - slide.parentNode.offsetLeft, behavior: 'smooth' });
  };

  slides.forEach((row, i) => {
    const classes = ['image', 'text'];
    const children = [...row.children];
    children.forEach((e, j) => {
      e.classList.add(`carousel-${classes[j]}`);
    });
    /* buttons */
    const button = document.createElement('button');
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      scrollToSlide(i);
    });
    buttons.append(button);
    io.observe(row);
  });
  block.parentElement.append(buttons);

  setInterval(() => {
    const selected = buttons.querySelector('.selected');
    const next = selected.nextElementSibling || selected.parentElement.firstElementChild;
    next.click();
  }, 5000);
}