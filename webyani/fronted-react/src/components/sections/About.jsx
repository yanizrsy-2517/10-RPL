import { motion } from 'framer-motion';

const PROFILE = {
  nameLong: 'Suciati Cahyani',
  nickname: 'Yani',
  school: 'SMKN 2 Buduran',
  fromSMP: 'SMPN 1 Buduran',
  jurusan: 'Rekayasa Perangkat Lunak (RPL)',
  city: 'Madiun',
  dob: '17 November 2009',
  hobbies: 'Coding, Renang, Nonton Drama China',
  dream: 'Bekerja sebagai Tenaga Kerja Wanita (TKW) di Jepang',
  interest: 'Laut lepas Jepang, budaya Jepang, dunia teknologi',
};

const skills = [
  { label: 'HTML', value: 92 },
  { label: 'CSS', value: 88 },
  { label: 'JavaScript', value: 82 },
  { label: 'PHP', value: 84 },
  { label: 'Laravel', value: 78 },
  { label: 'React', value: 80 },
];

function SkillBar({ label, value }) {
  return (
    <div className="skill">
      <div className="skill__row">
        <span>{label}</span>
        <span className="skill__val">{value}%</span>
      </div>
      <div className="skill__track">
        <motion.div
          className="skill__bar"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-10% 0px' }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="sectionHead">
            <h2 className="sectionHead__title">About</h2>
            <p className="sectionHead__desc">
              {PROFILE.fromSMP} → {PROFILE.school}, jurusan {PROFILE.jurusan}.
            </p>
          </div>

          <div className="aboutGrid">
            <div className="aboutCard card">
              <div className="aboutAvatar" aria-hidden>
                <div className="aboutAvatar__inner">
                  <span>Foto</span>
                  <span className="aboutAvatar__sub">Profil</span>
                </div>
              </div>

              <div className="aboutText">
                <p className="lead">
                  Saya <b>{PROFILE.nickname}</b> ({PROFILE.nameLong}), asal {PROFILE.city}.
                  Lahir {PROFILE.dob}.
                </p>
                <p className="muted">
                  {PROFILE.interest}. {PROFILE.hobbies}.
                </p>
                <p className="dream">
                  <span className="dream__label">Impian:</span> {PROFILE.dream}
                </p>

                <div className="quote">
                  <div className="quote__mark">“</div>
                  <p>
                    Di tengah laut lepas Jepang, aku belajar—pelan, konsisten, dan tetap melangkah.
                  </p>
                  <div className="quote__by">— Yani</div>
                </div>
              </div>
            </div>

            <div className="skillsCard card">
              <div className="skillsCard__title">Skill (RPL)</div>
              <div className="skills">
                {skills.map((s) => (
                  <SkillBar key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .sectionHead{ margin-bottom: 26px; }
        .sectionHead__title{ font-family: var(--font-jp); font-size: 34px; margin: 0 0 6px; }
        .sectionHead__desc{ margin: 0; color: var(--muted); max-width: 720px; }

        .aboutGrid{ display:grid; grid-template-columns: 1.15fr 0.85fr; gap: 16px; }
        @media (max-width: 980px){ .aboutGrid{ grid-template-columns: 1fr; } }

        .aboutCard{ padding: 18px; display:flex; gap: 16px; align-items: flex-start; }
        @media (max-width: 720px){ .aboutCard{ flex-direction: column; align-items: stretch; } }

        .aboutAvatar{ width: 160px; height: 160px; border-radius: 24px; border: 1px solid rgba(168,213,226,0.25); background: rgba(168,213,226,0.08); display:flex; align-items:center; justify-content:center; }
        .aboutAvatar__inner{ text-align:center; font-family: var(--font-jp); }
        .aboutAvatar__sub{ display:block; color: rgba(244,167,185,0.92); font-size: 18px; margin-top: 6px; }

        .aboutText{ flex:1; }
        .lead{ margin: 0; font-size: 16px; line-height: 1.7; }
        .muted{ margin: 10px 0 0; color: var(--muted); line-height: 1.7; }
        .dream{ margin: 12px 0 0; color: rgba(244,167,185,0.95); line-height: 1.7; }
        .dream__label{ font-weight: 700; }

        .quote{ margin-top: 16px; padding: 12px 14px; border-radius: 16px; border: 1px solid rgba(244,167,185,0.22); background: rgba(244,167,185,0.08); }
        .quote__mark{ font-family: var(--font-jp); font-size: 34px; line-height: 1; color: rgba(244,167,185,0.95); }
        .quote p{ margin: 8px 0 0; color: rgba(253,246,236,0.88); }
        .quote__by{ margin-top: 10px; color: rgba(168,213,226,0.9); font-size: 14px; }

        .skillsCard{ padding: 18px; }
        .skillsCard__title{ font-family: var(--font-jp); font-size: 22px; margin-bottom: 10px; }
        .skills{ display:flex; flex-direction: column; gap: 14px; margin-top: 10px; }

        .skill{ background: rgba(253,246,236,0.04); border: 1px solid rgba(168,213,226,0.16); border-radius: 16px; padding: 12px; }
        .skill__row{ display:flex; align-items:center; justify-content: space-between; font-size: 14px; color: rgba(253,246,236,0.86); }
        .skill__val{ color: rgba(244,167,185,0.95); }
        .skill__track{ height: 10px; border-radius: 999px; background: rgba(253,246,236,0.07); overflow:hidden; margin-top: 10px; }
        .skill__bar{ height: 100%; border-radius: 999px; background: linear-gradient(90deg, rgba(244,167,185,0.7), rgba(168,213,226,0.8)); }
      `}</style>
    </section>
  );
}

