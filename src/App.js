import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/NavBar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <main className="container mx-auto px-3 pb-12">Content</main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
