import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import api from '../../api/axios';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = useState({
    type: null,
    message: null,
  });

  const onSubmit = async (data) => {
    setStatus({ type: null, message: null });
    try {
      await api.post('/api/contact', data);
      setStatus({ type: 'success', message: 'Pesan berhasil dikirim ✨' });
      reset();
    } catch (e) {
      const msg = e?.response?.data?.message || 'Gagal mengirim pesan';
      setStatus({ type: 'error', message: msg });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="sectionHead">
            <h2 className="sectionHead__title">Contact</h2>
            <p className="sectionHead__desc">
              Tinggalkan pesan untuk Yani. Nanti aku balas secepatnya.
            </p>
          </div>

          <div className="contactGrid">
            <div className="contactCard card">
              <form className="contactForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <label>Nama</label>
                  <input
                    {...register('name', { required: 'Nama wajib diisi' })}
                    placeholder="Nama kamu"
                  />
                  {errors.name && <span className="err">{errors.name.message}</span>}
                </div>

                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email wajib diisi' })}
                    placeholder="nama@email.com"
                  />
                  {errors.email && <span className="err">{errors.email.message}</span>}
                </div>

                <div className="field">
                  <label>Pesan</label>
                  <textarea
                    rows={5}
                    {...register('message', { required: 'Pesan wajib diisi' })}
                    placeholder="Tulis pesan..."
                  />
                  {errors.message && <span className="err">{errors.message.message}</span>}
                </div>

                <button
                  className="submitBtn"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <span className="ripple" aria-hidden />
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>

                {status.type && (
                  <div
                    className={
                      status.type === 'success' ? 'notice notice--ok' : 'notice notice--err'
                    }
                    role="status"
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>

            <div className="sideCard card">
              <div className="sideCard__title">Socials</div>
              <div className="socialList">
                <a className="socialItem" href="#" onClick={(e) => e.preventDefault()}>
                  <span aria-hidden>📷</span> Instagram (placeholder)
                </a>
                <a className="socialItem" href="#" onClick={(e) => e.preventDefault()}>
                  <span aria-hidden>🐙</span> GitHub (placeholder)
                </a>
              </div>

              <div className="sideCard__divider" />

              <div className="sideCard__note">
                Impian Yani: bekerja di Jepang. Kamu bisa jadi bagian dari dukungan perjalanannya 💙
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .sectionHead__title{ font-family: var(--font-jp); font-size: 34px; margin: 0 0 6px; }
        .sectionHead__desc{ margin: 0; color: var(--muted); max-width: 720px; }

        .contactGrid{ display:grid; grid-template-columns: 1.2fr 0.8fr; gap: 14px; align-items: start; }
        @media (max-width: 980px){ .contactGrid{ grid-template-columns: 1fr; } }

        .contactCard{ padding: 18px; }
        .contactForm{ display:flex; flex-direction: column; gap: 14px; text-align:left; }

        .field label{ display:block; margin-bottom: 8px; color: rgba(253,246,236,0.86); font-size: 14px; }
        input, textarea{
          width:100%;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(168,213,226,0.25);
          background: rgba(253,246,236,0.04);
          color: var(--text);
          outline: none;
        }
        input:focus, textarea:focus{ border-color: rgba(244,167,185,0.45); box-shadow: 0 0 0 4px rgba(244,167,185,0.12); }
        .err{ color: rgba(244,167,185,0.98); font-size: 13px; margin-top: 7px; display:block; }

        .submitBtn{
          position: relative;
          overflow:hidden;
          align-self:flex-start;
          margin-top: 6px;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(244,167,185,0.35);
          background: linear-gradient(135deg, rgba(244,167,185,0.30), rgba(168,213,226,0.15));
          color: var(--text);
          cursor: pointer;
          transition: transform .2s ease;
          font-weight: 600;
        }
        .submitBtn:disabled{ opacity: 0.6; cursor: not-allowed; }
        .submitBtn:hover:not(:disabled){ transform: translateY(-2px); }

        .ripple{
          position:absolute;
          width: 14px; height: 14px;
          border-radius: 999px;
          left: 18px; top: 50%;
          transform: translateY(-50%);
          background: rgba(253,246,236,0.35);
          animation: ripple 1.4s ease infinite;
          opacity: 0.0;
        }
        @keyframes ripple{
          0%{ transform: translateY(-50%) scale(0.2); opacity: 0.0; }
          25%{ opacity: 0.35; }
          100%{ transform: translateY(-50%) scale(2.2); opacity: 0.0; }
        }

        .notice{ margin-top: 6px; padding: 10px 12px; border-radius: 14px; font-size: 14px; border: 1px solid rgba(168,213,226,0.2); }
        .notice--ok{ background: rgba(168,213,226,0.10); color: rgba(168,213,226,0.95); }
        .notice--err{ background: rgba(244,167,185,0.10); color: rgba(244,167,185,0.98); }

        .sideCard{ padding: 18px; text-align:left; }
        .sideCard__title{ font-family: var(--font-jp); font-size: 22px; margin-bottom: 12px; }
        .socialList{ display:flex; flex-direction: column; gap: 10px; }
        .socialItem{ text-decoration:none; padding: 12px 12px; border-radius: 14px; border: 1px solid rgba(168,213,226,0.18); background: rgba(253,246,236,0.04); color: rgba(253,246,236,0.88); display:flex; gap: 10px; align-items:center; transition: transform .2s ease; }
        .socialItem:hover{ transform: translateY(-2px); }
        .sideCard__divider{ height:1px; background: rgba(168,213,226,0.18); margin: 16px 0; }
        .sideCard__note{ color: var(--muted); line-height: 1.7; }
      `}</style>
    </section>
  );
}

