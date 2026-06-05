import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMsg(null);
    try {
      const res = await api.post('/api/login', data);
      const token = res?.data?.token;
      if (!token) throw new Error('Token tidak ditemukan');
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="authWrap">
      <div className="authCard card">
        <div className="authTitle">Admin Login</div>
        <div className="authSubtitle">Masuk untuk melihat pesan masuk</div>

        <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Email</label>
            <input type="email" {...register('email', { required: 'Email wajib' })} />
            {errors.email && <span className="err">{errors.email.message}</span>}
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password wajib' })}
            />
            {errors.password && <span className="err">{errors.password.message}</span>}
          </div>

          <button className="authBtn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Login...' : 'Login'}
          </button>

          {msg && <div className="notice notice--err">{msg}</div>}
        </form>
      </div>

      <style>{`
        .authWrap{ min-height: 100svh; display:flex; align-items:center; justify-content:center; padding: 90px 20px 40px; }
        .authCard{ width: min(520px, 100%); padding: 18px; }
        .authTitle{ font-family: var(--font-jp); font-size: 28px; margin-bottom: 6px; }
        .authSubtitle{ color: var(--muted); margin-bottom: 14px; }
        .authForm{ display:flex; flex-direction: column; gap: 14px; text-align:left; }
        .field label{ display:block; margin-bottom: 8px; color: rgba(253,246,236,0.86); font-size: 14px; }
        input{ width:100%; padding: 12px 12px; border-radius: 14px; border: 1px solid rgba(168,213,226,0.25); background: rgba(253,246,236,0.04); color: var(--text); outline:none; }
        input:focus{ border-color: rgba(244,167,185,0.45); box-shadow: 0 0 0 4px rgba(244,167,185,0.12); }
        .err{ color: rgba(244,167,185,0.98); font-size: 13px; margin-top: 7px; display:block; }
        .authBtn{ padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(244,167,185,0.35); background: linear-gradient(135deg, rgba(244,167,185,0.30), rgba(168,213,226,0.15)); color: var(--text); cursor:pointer; font-weight: 700; }
        .authBtn:disabled{ opacity:0.6; cursor:not-allowed; }
        .notice{ margin-top: 6px; padding: 10px 12px; border-radius: 14px; font-size: 14px; border: 1px solid rgba(168,213,226,0.2); }
        .notice--err{ background: rgba(244,167,185,0.10); color: rgba(244,167,185,0.98); }
      `}</style>
    </div>
  );
}

