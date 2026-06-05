import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { hash } = useLocation();
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navClass = useMemo(() => {
    return scrolled
      ? 'navbar navbar--solid'
      : 'navbar navbar--transparent';
  }, [scrolled]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = (hash || '').replace('#', '');
    if (id) setActive(id);
  }, [hash]);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.7] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onNav = (id) => {
    setOpen(false);
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={navClass}>
      <div className="container navbar__inner">
        <div className="navbar__brand">
          <span className="brand__dot" />
          <span className="brand__name">Yani</span>
        </div>

        <nav className="navbar__links" aria-label="Primary">
          {items.map((it) => (
            <button
              key={it.id}
              className={active === it.id ? 'navLink navLink--active' : 'navLink'}
              onClick={() => onNav(it.id)}
              type="button"
            >
              {it.label}
            </button>
          ))}
        </nav>

        <button
          className="navbar__burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          <div className="container navbar__mobileInner">
            {items.map((it) => (
              <button
                key={it.id}
                className={active === it.id ? 'navLink navLink--active' : 'navLink'}
                onClick={() => onNav(it.id)}
                type="button"
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .navbar{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 14px 0;
          transition: background .25s ease, border-color .25s ease;
        }
        .navbar--transparent{
          background: rgba(6,31,51,0.15);
          border-bottom: 1px solid rgba(168,213,226,0.10);
          backdrop-filter: blur(10px);
        }
        .navbar--solid{
          background: rgba(6,31,51,0.70);
          border-bottom: 1px solid rgba(168,213,226,0.22);
          backdrop-filter: blur(10px);
        }
        .navbar__inner{
          display:flex;
          align-items:center;
          justify-content: space-between;
        }
        .navbar__brand{ display:flex; align-items:center; gap:10px; }
        .brand__dot{
          width: 12px; height: 12px; border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, #fff, rgba(244,167,185,0.9));
          box-shadow: 0 0 0 6px rgba(244,167,185,0.12), 0 10px 40px rgba(244,167,185,0.22);
        }
        .brand__name{ font-family: var(--font-jp); font-weight: 700; letter-spacing: .3px; }

        .navbar__links{ display:flex; gap: 18px; align-items:center; }
        .navLink{
          background: transparent;
          border: none;
          color: rgba(253,246,236,0.82);
          font-size: 15px;
          padding: 10px 10px;
          border-radius: 999px;
          cursor: pointer;
          transition: background .2s ease, color .2s ease;
        }
        .navLink:hover{ background: rgba(168,213,226,0.12); color: rgba(253,246,236,0.98); }
        .navLink--active{ background: rgba(244,167,185,0.14); color: rgba(244,167,185,0.98); border: 1px solid rgba(244,167,185,0.25); }

        .navbar__burger{ display:none; background: transparent; border: none; padding: 10px; cursor: pointer; }
        .navbar__burger span{ display:block; width: 24px; height: 2px; background: rgba(253,246,236,0.78); margin: 5px 0; border-radius: 2px; }

        .navbar__mobile{ display:none; }

        @media (max-width: 820px){
          .navbar__links{ display:none; }
          .navbar__burger{ display:block; }
          .navbar__mobile{ display:block; padding-top: 8px; }
          .navbar__mobileInner{ display:flex; flex-direction: column; gap: 8px; padding-bottom: 10px; }
          .navLink{ text-align:left; }
        }
      `}</style>
    </header>
  );
}

