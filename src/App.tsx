import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Events from './pages/Events/Events';
import Gallery from './pages/Gallery/Gallery';
import News from './pages/News/News';
import Volunteer from './pages/Volunteer/Volunteer';
import Partner from './pages/Partner/Partner';
import Contact from './pages/Contact/Contact';
import Donate from './pages/Donate/Donate';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<News />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          {/* Catch-all route to redirect back to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
