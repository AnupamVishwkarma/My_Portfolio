// Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });
    (function animateFollower() {
      fx += (mx - fx - 18) * 0.12;
      fy += (my - fy - 18) * 0.12;
      follower.style.transform = `translate(${fx}px, ${fy}px)`;
      requestAnimationFrame(animateFollower);
    })();
    document.querySelectorAll('a, button, .skill-card, .project-card, .contact-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        follower.style.width = '56px';
        follower.style.height = '56px';
        follower.style.borderColor = 'rgba(99,255,180,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(99,255,180,0.4)';
      });
    });

    // Typed Effect
    const words = ['Developer.', 'Engineer.', 'Architect.', 'Creator.'];
    let wi = 0, ci = 0, del = false;
    const el = document.getElementById('typed');
    function type() {
      const w = words[wi];
      if (!del) {
        el.textContent = w.slice(0, ++ci);
        if (ci === w.length) { del = true; setTimeout(type, 2000); return; }
      } else {
        el.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, del ? 60 : 120);
    }
    type();

    // Marquee
    const techs = ['React','Next.js','TypeScript','Node.js','GraphQL','PostgreSQL','MongoDB','Redis','AWS','Docker','Kubernetes','Prisma','Tailwind CSS','Figma','Python','FastAPI'];
    const track = document.getElementById('marqueeTrack');
    const doubled = [...techs, ...techs, ...techs];
    track.innerHTML = doubled.map(t => `<span class="marquee-item"><span>âœ¦</span>${t}</span>`).join('');

    // Scroll Reveal
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Projects Toggle
    const extraProjects = document.querySelectorAll('.project-extra');
    const projectsToggle = document.getElementById('projectsToggle');

    extraProjects.forEach(card => card.classList.add('project-hidden'));

    if (projectsToggle) {
      projectsToggle.addEventListener('click', () => {
        const isHidden = Array.from(extraProjects).some(card => card.classList.contains('project-hidden'));

        extraProjects.forEach(card => card.classList.toggle('project-hidden', !isHidden));
        projectsToggle.textContent = isHidden ? 'Show Less Projects' : 'Show More Projects';
      });
    }
