/* ==========================================================================
   Bits, LLC - Node Graph Animation + Page Interactions
   ========================================================================== */

// ==========================================================================
// Node Graph / Constellation Canvas
// ==========================================================================

(function () {
  const canvas = document.getElementById('nodeGraph');
  const ctx = canvas.getContext('2d');

  let width, height;
  let nodes = [];
  let mouse = { x: null, y: null };
  let animationId;

  const CONFIG = {
    nodeCount: 80,
    nodeRadius: 1.5,
    connectionDistance: 180,
    mouseInfluence: 250,
    speed: 0.3,
    nodeColor: 'rgba(230, 168, 23, 0.4)',      // accent amber
    lineColor: 'rgba(230, 168, 23, 0.08)',
    lineColorActive: 'rgba(230, 168, 23, 0.2)',
    bgDotColor: 'rgba(136, 136, 160, 0.03)',
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createNodes() {
    nodes = [];
    const count = Math.min(CONFIG.nodeCount, Math.floor((width * height) / 15000));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        radius: CONFIG.nodeRadius + Math.random() * 1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  function update() {
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges with padding
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Keep in bounds
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          const opacity = 1 - dist / CONFIG.connectionDistance;

          // Brighter near mouse
          let isNearMouse = false;
          if (mouse.x !== null) {
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseDist = Math.sqrt(
              (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
            );
            isNearMouse = mouseDist < CONFIG.mouseInfluence;
          }

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = isNearMouse
            ? `rgba(230, 168, 23, ${opacity * 0.25})`
            : `rgba(230, 168, 23, ${opacity * 0.08})`;
          ctx.lineWidth = isNearMouse ? 1 : 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      const pulse = Math.sin(time * 0.002 + node.pulseOffset) * 0.3 + 0.7;
      const radius = node.radius * pulse;

      // Glow near mouse
      let glowAmount = 0;
      if (mouse.x !== null) {
        const dist = Math.sqrt(
          (node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2
        );
        if (dist < CONFIG.mouseInfluence) {
          glowAmount = 1 - dist / CONFIG.mouseInfluence;
        }
      }

      // Outer glow
      if (glowAmount > 0) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4 * glowAmount, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 168, 23, ${glowAmount * 0.15})`;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = glowAmount > 0
        ? `rgba(230, 168, 23, ${0.4 + glowAmount * 0.5})`
        : CONFIG.nodeColor;
      ctx.fill();
    }
  }

  function loop(time) {
    update();
    draw(time);
    animationId = requestAnimationFrame(loop);
  }

  // Events
  window.addEventListener('resize', () => {
    resize();
    createNodes();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  resize();
  createNodes();
  loop(0);
})();


// ==========================================================================
// Typewriter Effect
// ==========================================================================

(function () {
  const phrases = [
    'suno.generate("ambient_track_07")',
    'midjourney.create("neon cityscape")',
    'claude.build("landing_page")',
    'bits.ship("everything")',
    'l2karma.deploy("game_server")',
  ];

  const el = document.getElementById('typewriter');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseTimer = 0;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        pauseTimer = setTimeout(() => {
          deleting = true;
          tick();
        }, 2200);
        return;
      }
      setTimeout(tick, 55 + Math.random() * 40);
    } else {
      charIndex--;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 30);
    }
  }

  setTimeout(tick, 1000);
})();


// ==========================================================================
// Scroll Reveal - fade in cards
// ==========================================================================

(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.stack-card, .showcase-item').forEach((el) => {
    observer.observe(el);
  });
})();


// ==========================================================================
// Smooth nav highlight (optional subtle touch)
// ==========================================================================

(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text-primary)';
      }
    });
  });
})();
