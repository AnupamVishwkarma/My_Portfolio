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
    const techs = [
      { name: 'React', icon: 'fa-brands fa-react' },
      { name: 'Next.js', icon: 'fa-solid fa-layer-group' },
      { name: 'TypeScript', icon: 'fa-solid fa-code' },
      { name: 'Node.js', icon: 'fa-brands fa-node-js' },
      { name: 'MongoDB', icon: 'fa-solid fa-database' },
      { name: 'MySQL', icon: 'fa-solid fa-server' },
      { name: 'Express.js', icon: 'fa-solid fa-network-wired' },
      { name: 'REST API', icon: 'fa-solid fa-plug' },
      { name: 'Tailwind CSS', icon: 'fa-solid fa-wind' },
      { name: 'JavaScript', icon: 'fa-brands fa-js' },
      { name: 'GitHub', icon: 'fa-brands fa-github' },
      { name: 'Figma', icon: 'fa-brands fa-figma' }
    ];
    const track = document.getElementById('marqueeTrack');
    const doubled = [...techs, ...techs, ...techs];
    track.innerHTML = doubled
      .map(
        ({ name, icon }) =>
          `<span class="marquee-item"><i class="${icon}" aria-hidden="true"></i><span>${name}</span></span>`
      )
      .join('');

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

    // Contact Form API Submit
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm) {
      contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.form-submit');
        const payload = {
          name: (formData.get('name') || '').toString().trim(),
          email: (formData.get('email') || '').toString().trim(),
          subject: (formData.get('subject') || '').toString().trim(),
          message: (formData.get('message') || '').toString().trim()
        };

        if (formStatus) {
          formStatus.textContent = 'Sending your message...';
          formStatus.className = 'form-note';
        }
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'SENDING...';
        }

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Unable to send message right now.');
          }

          contactForm.reset();
          if (formStatus) {
            formStatus.textContent = data.message || 'Message sent successfully.';
            formStatus.className = 'form-note is-success';
          }
        } catch (error) {
          if (formStatus) {
            formStatus.textContent = error.message || 'Something went wrong. Please try again later.';
            formStatus.className = 'form-note is-error';
          }
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'SEND MESSAGE →';
          }
        }
      });
    }
