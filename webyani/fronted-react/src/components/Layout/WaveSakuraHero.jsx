import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PERSON = {
  nameLong: 'Halo, Saya Yani 👋',
  subtitle: 'Siswi RPL SMKN 2 Buduran | Calon TKW Jepang | Pecinta Laut',
};

function useSakura(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles = Array.from({ length: 110 }).map(() => ({
      x: Math.random() * canvas.clientWidth,
      y: -Math.random() * canvas.clientHeight,
      r: 2 + Math.random() * 4,
      vy: 0.6 + Math.random() * 1.6,
      vx: -0.3 + Math.random() * 0.6,
      rot: Math.random() * Math.PI * 2,
      vr: -0.02 + Math.random() * 0.04,
      life: 0.4 + Math.random() * 0.6,
    }));

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      particles.forEach((p) => {
        p.life -= 0.004;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        if (p.life <= 0 || p.y > canvas.clientHeight + 20) {
          p.x = Math.random() * canvas.clientWidth;
          p.y = -20 - Math.random() * 60;
          p.life = 0.4 + Math.random() * 0.6;
        }

        const alpha = Math.max(0, Math.min(1, p.life));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha * 0.9;

        // Petal-ish
        ctx.fillStyle = '#F4A7B9';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 0.9, p.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

export default function WaveSakuraHero({ onKenali, onHubungi }) {
  const canvasRef = useRef(null);
  useSakura(canvasRef);

  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__noise" />
      </div>

      <canvas ref={canvasRef} className="hero__sakura" aria-hidden="true" />

      <div className="container hero__content">
        <motion.div
          className="hero__badgeRow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Japanese Ocean • Sakura • Waves</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <span className="hero__titleJP">{PERSON.nameLong}</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          {PERSON.subtitle}
        </motion.p>

        <motion.div
          className="hero__ctaRow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <button type="button" className="btn btnPrimary" onClick={onKenali}>
            Kenali Saya <span aria-hidden>→</span>
          </button>
          <button type="button" className="btn" onClick={onHubungi}>
            Hubungi Saya <span aria-hidden>✉</span>
          </button>
        </motion.div>

        <div className="hero__waveWrap" aria-hidden="true">
          <svg className="hero__wave hero__wave--1" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="rgba(168,213,226,0.26)"
              d="M0,96L80,112C160,128,320,160,480,186.7C640,213,800,235,960,229.3C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </svg>
          <svg className="hero__wave hero__wave--2" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="rgba(244,167,185,0.14)"
              d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,176C840,192,960,192,1080,186.7C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      <style>{`
        .hero{
          position: relative;
          padding-top: 108px;
          overflow: hidden;
          min-height: 92vh;
          display:flex;
          align-items:flex-start;
        }
        .hero__bg{
          position:absolute; inset:0;
          background: radial-gradient(900px 520px at 20% 10%, rgba(168,213,226,0.24), transparent 55%),
                      radial-gradient(780px 480px at 90% 30%, rgba(244,167,185,0.18), transparent 50%);
        }
        .hero__noise{
          position:absolute; inset:-20px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="160" height="160" filter="url(%23n)" opacity="0.20"/></svg>');
          opacity: 0.14;
          mix-blend-mode: overlay;
          pointer-events:none;
        }
        .hero__sakura{
          position:absolute; inset:0;
          width:100%; height:100%;
          pointer-events:none;
          opacity:0.95;
        }
        .hero__content{ position: relative; z-index: 2; padding-bottom: 90px; }
        .hero__badgeRow{ margin-top: 16px; }
        .hero__title{
          margin: 22px 0 12px;
          font-size: clamp(34px, 4.2vw, 56px);
          letter-spacing: -0.02em;
          font-family: var(--font-jp);
        }
        .hero__titleJP{ display:inline-block; text-shadow: 0 18px 60px rgba(11,61,107,0.45); }
        .hero__subtitle{ max-width: 820px; color: rgba(253,246,236,0.82); font-size: clamp(16px, 1.7vw, 20px); line-height: 1.6; }
        .hero__ctaRow{ display:flex; gap: 14px; margin-top: 26px; flex-wrap: wrap; justify-content: flex-start; }

        .hero__waveWrap{
          position:absolute;
          left:0; right:0; bottom:-1px;
          height: 140px;
          pointer-events:none;
          z-index: 1;
        }
        .hero__wave{
          position:absolute;
          left:0; bottom:0;
          width: 100%;
          height: 140px;
          transform-origin: center;
        }
        .hero__wave--1{ animation: wave1 10s ease-in-out infinite; }
        .hero__wave--2{ animation: wave2 12s ease-in-out infinite; }

        @keyframes wave1{ 
          0%{ transform: translateX(0) scaleY(1); opacity:1; }
          50%{ transform: translateX(-14px) scaleY(0.98); opacity:0.95; }
          100%{ transform: translateX(0) scaleY(1); opacity:1; }
        }
        @keyframes wave2{ 
          0%{ transform: translateX(0) scaleY(1); opacity:0.9; }
          50%{ transform: translateX(10px) scaleY(0.99); opacity:0.8; }
          100%{ transform: translateX(0) scaleY(1); opacity:0.9; }
        }

        @media (max-width: 768px){
          .hero{ min-height: 84vh; }
          .hero__ctaRow{ justify-content: center; }
        }
      `}</style>
    </section>
  );
}

