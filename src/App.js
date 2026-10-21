import './App.css';
import Guides from './components/layout/Guides/Guides.js';
import Grain from './components/layout/Grain/Grain.js';
import Loader from './components/layout/Loader/Loader.js';
import Cursor from './components/layout/Cursor/Cursor.js';
import Rail from './components/layout/Rail/Rail.js';
import Footer from './components/layout/Footer/Footer.js';
import Hero from './components/sections/Hero/Hero.js';
import About from './components/sections/About/About.js';
import Work from './components/sections/Work/Work.js';
import Skills from './components/sections/Skills/Skills.js';
import Contact from './components/sections/Contact/Contact.js';
import Marquee from './components/ui/Marquee/Marquee.js';
import { skillGroups } from './data/work.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';

const skillNames = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));

function App() {
  useSmoothScroll();

  return(
    <div className='app'>
      <Loader/>
      <a className='skip-link' href='#main'>Skip to content</a>
      <Grain/>
      <Guides/>
      <Rail/>
      <main id='main' tabIndex={-1}>
        <Hero/>
        <div className='chapters'>
          <About/>
          <Work/>
          <Marquee items={skillNames} label='Skills ticker'/>
          <Skills/>
          <Contact/>
        </div>
      </main>
      <Footer/>
      <Cursor/>
    </div>
  );
}

export default App;
