import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import LoadingScreen from './components/LoadingScreen';

function App() {

  return (
    <Router>
      <LoadingScreen />
      <div className="font-sans bg-black text-white min-h-screen">
        <Layout>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Layout>
      </div>
    </Router>
  );
}

export default App;