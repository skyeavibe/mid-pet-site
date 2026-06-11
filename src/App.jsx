import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Facilities from './components/Facilities';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import "./App.css";
function App() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Facilities />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
