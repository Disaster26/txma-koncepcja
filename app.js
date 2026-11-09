(function(){
  var d=document;

  // menu mobilne
  var burger=d.getElementById('burger'), menu=d.getElementById('menu');
  function zamknij(){menu.classList.remove('otw');burger.setAttribute('aria-expanded','false');d.body.style.overflow=''}
  burger.addEventListener('click',function(){
    var otw=!menu.classList.contains('otw');
    menu.classList.toggle('otw',otw);burger.setAttribute('aria-expanded',String(otw));d.body.style.overflow=otw?'hidden':'';
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
  window.addEventListener('resize',function(){if(window.innerWidth>=960)zamknij()});

  // aktywna pozycja menu = bieżąca sekcja
  var linki=[].slice.call(menu.querySelectorAll('a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(wp){
      wp.forEach(function(w){if(w.isIntersecting){linki.forEach(function(a){if(a.getAttribute('href')==='#'+w.target.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}});
    },{rootMargin:'-45% 0px -50% 0px'});
    linki.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
    var hero=d.querySelector('.hero');
    new IntersectionObserver(function(wp){if(wp[0].isIntersecting)linki.forEach(function(a){a.removeAttribute('aria-current')})},{rootMargin:'-45% 0px -50% 0px'}).observe(hero);
  }

  // tory przewijane: palec natywnie, mysz przeciąganiem, strzałki i klawiatura
  [].forEach.call(d.querySelectorAll('.tor'),function(tor){
    var x0=0,s0=0,ciag=false,ruch=false;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;ciag=true;ruch=false;x0=e.clientX;s0=tor.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;if(!ruch&&Math.abs(dx)>5){ruch=true;tor.classList.add('ciag')}if(ruch){tor.scrollLeft=s0-dx;e.preventDefault()}});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;if(ruch){var sl=tor.scrollLeft;tor.classList.remove('ciag');tor.scrollLeft=sl;setTimeout(function(){ruch=false},0)}});
    tor.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation()}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();krok(tor,1)}if(e.key==='ArrowLeft'){e.preventDefault();krok(tor,-1)}});
  });
  function krok(tor,k){var el=tor.firstElementChild;var w=el?el.getBoundingClientRect().width+16:320;tor.scrollBy({left:k*w,behavior:'smooth'})}
  [].forEach.call(d.querySelectorAll('[data-tor]'),function(b){b.addEventListener('click',function(){krok(d.getElementById(b.dataset.tor),+b.dataset.k)})});

  // formularz pokazowy, bez wysyłki
  var f=d.getElementById('form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('formInfo').hidden=false});

  var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
})();
