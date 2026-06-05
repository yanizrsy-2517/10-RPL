import WaveSakuraHero from '../components/Layout/WaveSakuraHero';
import Navbar from '../components/Layout/Navbar';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';
import Footer from '../components/Layout/Footer';

export default function Home() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 66 }}>
        <WaveSakuraHero onKenali={() => scrollTo('about')} onHubungi={() => scrollTo('contact')} />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

