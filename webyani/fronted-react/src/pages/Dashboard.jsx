import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const load = async () => {
      setErr(null);
      try {
        const res = await api.get('/api/messages', { headers: authHeaders() });
        setMessages(res?.data?.data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || 'Gagal memuat pesan');
      }
    };

    load();
  }, [navigate]);

  const logout = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await api.post('/api/logout', {}, { headers: authHeaders() });
      }
    } catch {
      // ignore
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashWrap">
      <div className="container">
        <div className="dashTop">
          <div>
            <div className="dashTitle">Dashboard Pesan</div>
            <div className="dashSubtitle">Pesan masuk dari form Contact</div>
          </div>
          <button className="dashLogout" onClick={logout} type="button">
            Logout
          </button>
        </div>

        {err && <div className="notice notice--err">{err}</div>}

        <div className="tableCard card">
          <div className="tableHead">
            <div>Nama</div>
            <div>Email</div>
            <div>Pesan</div>
            <div>Waktu</div>
          </div>

          <div className="tableBody">
            {messages.length === 0 ? (
              <div className="empty">Belum ada pesan.</div>
            ) : (
              messages.map((m) => (
                <div className="row" key={m.id}>
                  <div>{m.name}</div>
                  <div>{m.email}</div>
                  <div className="msg">{m.message}</div>
                  <div>{m.created_at?.slice?.(0, 10) || m.created_at}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dashWrap{ min-height: 100svh; padding: 90px 0 40px; }
        .dashTop{ display:flex; align-items:flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
        .dashTitle{ font-family: var(--font-jp); font-size: 28px; margin-bottom: 6px; }
        .dashSubtitle{ color: var(--muted); }
        .dashLogout{ border-radius: 999px; padding: 10px 14px; border: 1px solid rgba(168,213,226,0.30); background: rgba(168,213,226,0.12); color: var(--text); cursor:pointer; }
        .dashLogout:hover{ background: rgba(168,213,226,0.20); }

        .notice{ margin: 10px 0 14px; padding: 10px 12px; border-radius: 14px; font-size: 14px; border: 1px solid rgba(168,213,226,0.2); }
        .notice--err{ background: rgba(244,167,185,0.10); color: rgba(244,167,185,0.98); }

        .tableCard{ padding: 14px; overflow:auto; }
        .tableHead{ display:grid; grid-template-columns: 160px 220px 1fr 120px; gap: 12px; color: rgba(253,246,236,0.86); font-size: 14px; padding: 6px 8px 10px; }
        @media (max-width: 980px){ .tableHead{ grid-template-columns: 140px 200px 1fr; } .tableHead > div:nth-child(4){ display:none; } }

        .row{ display:grid; grid-template-columns: 160px 220px 1fr 120px; gap: 12px; padding: 12px 8px; border-top: 1px solid rgba(168,213,226,0.12); align-items:start; }
        @media (max-width: 980px){ .row{ grid-template-columns: 140px 200px 1fr; } .row > div:nth-child(4){ display:none; } }
        .msg{ color: rgba(253,246,236,0.88); }
        .empty{ padding: 18px 8px; color: var(--muted); }
      `}</style>
    </div>
  );
}

