import { motion } from 'framer-motion';

const services = [
  {
    title: 'Web Development',
    desc: 'Membangun website responsif dari frontend sampai backend.',
    icon: '🌐',
  },
  {
    title: 'UI/UX Design Basic',
    desc: 'Mendesain tampilan yang rapi, nyaman dibaca, dan mudah dipakai.',
    icon: '🎨',
  },
  {
    title: 'Database Management',
    desc: 'Menyusun relasi data dan memastikan integritas informasi.',
    icon: '🗄️',
  },
  {
    title: 'Responsive Design',
    desc: 'Tampilan tetap konsisten dari HP hingga desktop.',
    icon: '📱',
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="sectionHead">
            <h2 className="sectionHead__title">Services</h2>
            <p className="sectionHead__desc">
              Kemampuan yang aku latih sebagai siswi RPL—biar siap menghadapi dunia nyata.
            </p>
          </div>

          <div className="gridServices">
            {services.map((s) => (
              <motion.div
                key={s.title}
                className="serviceCard card"
                whileHover={{ y: -6, boxShadow: '0 22px 80px rgba(11,61,107,0.55)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
              >
                <div className="serviceCard__icon" aria-hidden>
                  {s.icon}
                </div>
                <div className="serviceCard__title">{s.title}</div>
                <div className="serviceCard__desc">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .sectionHead__title{ font-family: var(--font-jp); font-size: 34px; margin: 0 0 6px; }
        .sectionHead__desc{ margin: 0; color: var(--muted); max-width: 720px; }

        .gridServices{ display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 980px){ .gridServices{ grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px){ .gridServices{ grid-template-columns: 1fr; } }

        .serviceCard{ padding: 18px; text-align:left; }
        .serviceCard__icon{ font-size: 26px; margin-bottom: 10px; }
        .serviceCard__title{ font-family: var(--font-jp); font-size: 20px; margin-bottom: 8px; }
        .serviceCard__desc{ color: var(--muted); line-height: 1.7; }
      `}</style>
    </section>
  );
}

