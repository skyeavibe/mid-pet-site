import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { Cursor } from './components/ui/Cursor'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import './App.css'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
