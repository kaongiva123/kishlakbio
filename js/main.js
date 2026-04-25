document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const mobileMenu=document.getElementById('mobileMenu');
  const cursorGlow=document.getElementById('cursorGlow');
  const particles=document.getElementById('particles');

  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',window.scrollY>50);
  });

  burger.addEventListener('click',()=>{
    mobileMenu.classList.toggle('active');
    burger.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      mobileMenu.classList.remove('active');
      burger.classList.remove('open');
    });
  });

  if(window.innerWidth>768){
    document.addEventListener('mousemove',e=>{
      cursorGlow.style.left=e.clientX+'px';
      cursorGlow.style.top=e.clientY+'px';
      cursorGlow.style.opacity='1';
    });
  }

  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});

  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

  document.querySelectorAll('.stat-number').forEach(el=>{
    const target=parseInt(el.dataset.count);
    const dur=2000;
    let start=null;
    const step=ts=>{
      if(!start)start=ts;
      const p=Math.min((ts-start)/dur,1);
      const ease=1-Math.pow(1-p,3);
      el.textContent=Math.floor(ease*target);
      if(p<1)requestAnimationFrame(step);
    };
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
    obs.observe(el);
  });

  for(let i=0;i<60;i++){
    const p=document.createElement('div');
    Object.assign(p.style,{
      position:'absolute',
      width:Math.random()*3+1+'px',
      height:Math.random()*3+1+'px',
      background:['#8b5cf6','#ec4899','#06b6d4','#fff'][Math.floor(Math.random()*4)],
      borderRadius:'50%',
      left:Math.random()*100+'%',
      top:Math.random()*100+'%',
      opacity:Math.random()*.5+.1,
      animation:`particleFloat ${Math.random()*10+10}s ease-in-out infinite`,
      animationDelay:`-${Math.random()*10}s`
    });
    particles.appendChild(p);
  }

  const style=document.createElement('style');
  style.textContent=`@keyframes particleFloat{
    0%,100%{transform:translate(0,0) scale(1);opacity:.3}
    25%{transform:translate(${r()}px,${r()}px) scale(1.5);opacity:.6}
    50%{transform:translate(${r()}px,${r()}px) scale(.8);opacity:.2}
    75%{transform:translate(${r()}px,${r()}px) scale(1.2);opacity:.5}
  }`;
  document.head.appendChild(style);

  function r(){return(Math.random()-.5)*100}

  document.querySelectorAll('.project-card').forEach(card=>{
    const color=card.dataset.color;
    if(color){
      card.addEventListener('mouseenter',()=>{
        card.style.borderColor=color+'33';
        card.querySelector('.project-icon').style.background=`linear-gradient(135deg,${color},${color}88)`;
      });
      card.addEventListener('mouseleave',()=>{
        card.style.borderColor='';
        card.querySelector('.project-icon').style.background='';
      });
    }
  });

  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const img=item.querySelector('img');
      const overlay=document.createElement('div');
      Object.assign(overlay.style,{
        position:'fixed',inset:'0',background:'rgba(0,0,0,.9)',
        display:'flex',alignItems:'center',justifyContent:'center',
        zIndex:'10000',cursor:'zoom-out',opacity:'0',transition:'opacity .3s'
      });
      const clone=img.cloneNode();
      Object.assign(clone.style,{
        maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain',
        borderRadius:'8px',transform:'scale(.9)',transition:'transform .4s cubic-bezier(.16,1,.3,1)'
      });
      overlay.appendChild(clone);
      document.body.appendChild(overlay);
      requestAnimationFrame(()=>{
        overlay.style.opacity='1';
        clone.style.transform='scale(1)';
      });
      overlay.addEventListener('click',()=>{
        overlay.style.opacity='0';
        clone.style.transform='scale(.9)';
        setTimeout(()=>overlay.remove(),300);
      });
    });
  });
});
