import './App.css';
import Bar from './components/Bar.js';
import Contact from './components/Contact.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Final from './components/Final.js';
import Skills from './components/Skills.js';

function App() {
  return(
    <div className='app'>
      <Bar/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Final/>
    </div>
  );
}

export default App;
