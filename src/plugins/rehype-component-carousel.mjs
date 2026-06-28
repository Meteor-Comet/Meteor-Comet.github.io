import { h } from 'hastscript';

export function CarouselComponent(children) {
  // 1. 过滤出真正的图片段落
  const imageNodes = children.filter(
    (node) => node.tagName === 'p' && 
              node.children?.some((c) => c.tagName === 'img')
  );

  if (imageNodes.length === 0) return children;

  // 2. 生成 N 个独立的 slide
  const slideNodes = imageNodes.map((para, index) => {
    const img = para.children.find((c) => c.tagName === 'img');
    return h('div', {
      class: `carousel-slide${index === 0 ? ' active' : ''}`,
      'data-index': index,
    }, [h('p', {}, [img])]);
  });

  // 3. 🔑 生成与 slide 数量完全一致的 N 个 dot
  const dotNodes = imageNodes.map((_, index) =>
    h('span', {
      class: `carousel-dot${index === 0 ? ' active' : ''}`,
      'data-index': index,
    })
  );

  const id = `carousel-${Math.random().toString(36).slice(2, 8)}`;

  // 4. 组装完整结构（包含修复后的内联脚本）
  return [
    h('div', { id, class: 'carousel-container' }, [
      h('div', { class: 'carousel-track' }, slideNodes),
      h('button', { class: 'carousel-prev', 'aria-label': 'Previous slide' }, '‹'),
      h('button', { class: 'carousel-next', 'aria-label': 'Next slide' }, '›'),
      h('div', { class: 'carousel-indicators' }, dotNodes),
      // 移除 defer，因为脚本在 DOM 底部，执行时元素已就绪
      h('script', { id: `${id}-script`, type: 'text/javascript' }, `
        (function() {
          var c = document.getElementById('${id}');
          if (!c) return;
          var slides = c.querySelectorAll('.carousel-slide');
          var dots = c.querySelectorAll('.carousel-dot');
          var cur = 0;
          function show(i) {
            slides.forEach(function(s, n) { s.classList.toggle('active', n === i); });
            dots.forEach(function(d, n) { d.classList.toggle('active', n === i); });
            cur = i;
          }
          // 箭头事件绑定
          var prevBtn = c.querySelector('.carousel-prev');
          var nextBtn = c.querySelector('.carousel-next');
          if (prevBtn) prevBtn.addEventListener('click', function() {
            show((cur - 1 + slides.length) % slides.length);
          });
          if (nextBtn) nextBtn.addEventListener('click', function() {
            show((cur + 1) % slides.length);
          });
          // 圆点事件绑定
          dots.forEach(function(dot) {
            dot.addEventListener('click', function() { 
              show(parseInt(dot.dataset.index)); 
            });
          });
        })();
      `),
    ]),
  ];
}