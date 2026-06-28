import { h } from 'hastscript';

export function CarouselComponent(children) {
  // 1. 防御性检查
  if (!Array.isArray(children)) return [];

  // 2. 安全过滤图片节点
  const imageNodes = children.filter(
    (node) => node?.tagName === 'p' && 
              Array.isArray(node.children) &&
              node.children.some((c) => c?.tagName === 'img')
  );

  if (imageNodes.length === 0) return children;

  // 3. 生成 slides 和 dots（数量严格一致）
  const slideNodes = imageNodes.map((para, index) => {
    const img = para.children.find((c) => c?.tagName === 'img');
    return h('div', {
      class: `carousel-slide${index === 0 ? ' active' : ''}`,
      'data-index': index,
    }, [h('p', {}, [img])]);
  });

  const dotNodes = imageNodes.map((_, index) =>
    h('span', {
      class: `carousel-dot${index === 0 ? ' active' : ''}`,
      'data-index': index,
    })
  );

  const id = `carousel-${Math.random().toString(36).slice(2, 8)}`;

  return [
    h('div', { id, class: 'carousel-container' }, [
      h('div', { class: 'carousel-track' }, slideNodes),
      h('button', { class: 'carousel-prev', 'aria-label': 'Previous' }, '‹'),
      h('button', { class: 'carousel-next', 'aria-label': 'Next' }, '›'),
      h('div', { class: 'carousel-indicators' }, dotNodes),
      h('script', { type: 'text/javascript' }, `
        (function(){
          var c=document.getElementById('${id}');if(!c)return;
          var s=c.querySelectorAll('.carousel-slide'),d=c.querySelectorAll('.carousel-dot'),cur=0;
          function show(i){s.forEach(function(n,x){n.classList.toggle('active',x===i)});d.forEach(function(n,x){n.classList.toggle('active',x===i)});cur=i}
          var p=c.querySelector('.carousel-prev'),n=c.querySelector('.carousel-next');
          if(p)p.onclick=function(){show((cur-1+s.length)%s.length)};
          if(n)n.onclick=function(){show((cur+1)%s.length)};
          d.forEach(function(dot){dot.onclick=function(){show(parseInt(dot.dataset.index))}});
        })();
      `),
    ]),
  ];
}