import React from "react";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BlurBlob from './components/BlurBlob';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,209,102,0.06),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_18%),linear-gradient(180deg,#020308_0%,#03040a_100%)] text-white">
      <BlurBlob position={{ top: '20%', left: '18%' }} size={{ width: '30%', height: '35%' }} />
      <BlurBlob position={{ top: '80%', left: '85%' }} size={{ width: '22%', height: '30%' }} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,209,102,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:14px_24px] opacity-25" />

      <div className="relative pt-16">
        <Navbar />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
