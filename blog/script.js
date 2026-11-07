
(() => {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); btn.textContent='☰';
    }));
  }
  const id='111453801';
  if (/^\d+$/.test(id)) {
    window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
    window.ym.l=Date.now();
    window.ym(Number(id),'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
    const s=document.createElement('script');s.async=true;s.src='https://mc.yandex.ru/metrika/tag.js';document.head.appendChild(s);
  }
})();
