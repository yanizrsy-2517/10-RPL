export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>Made with 💙 by Yani — Dreaming of Japan's Ocean</div>
      </div>

      <style>{`
        .footer{
          padding: 26px 0 40px;
          border-top: 1px solid rgba(168,213,226,0.18);
          margin-top: 20px;
        }
        .footer__inner{ color: rgba(253,246,236,0.78); text-align:center; }
      `}</style>
    </footer>
  );
}

