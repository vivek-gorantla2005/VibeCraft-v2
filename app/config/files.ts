export const files = {
  "package.json": {
    file: {
      contents: JSON.stringify({
        name: "vibecraft-demo",
        private: true,
        scripts: {
          dev: "vite",
          start: "nodemon src/main.jsx"
        },
        dependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "lucide-react": "^0.294.0",
          "framer-motion": "^10.16.4",
          "clsx": "^2.0.0",
          "nodemon": "latest"
        },
        devDependencies: {
          "vite": "^5.0.0",
          "@vitejs/plugin-react": "^4.0.0"
        }
      }, null, 2)
    }
  },

  "index.html": {
    file: {
      contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VibeCraft | Modern Web Experiences</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
      body { margin: 0; font-family: 'Outfit', sans-serif; background: #020617; color: #f8fafc; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
    }
  },

  "src": {
    directory: {
      "main.jsx": {
        file: {
          contents: `
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`
        }
      },
      "App.jsx": {
        file: {
          contents: `
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div className="app-container">
      <div className="noise"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;
`
        }
      },
      "components": {
        directory: {
          "Navbar.jsx": {
            file: {
              contents: `
import React from 'react';

export const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <div className="logo-icon">V</div>
      <span>VibeCraft</span>
    </div>
    <div className="nav-links">
      <a href="#">Features</a>
      <a href="#">Showcase</a>
      <a href="#">Pricing</a>
      <button className="btn-primary">Get Started</button>
    </div>
  </nav>
);
`
            }
          },
          "Hero.jsx": {
            file: {
              contents: `
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Layers } from 'lucide-react';

export const Hero = () => (
  <section className="hero">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hero-content"
    >
      <div className="badge">
        <Sparkles size={14} />
        <span>Now in Public Beta</span>
      </div>
      <h1>Create <span className="gradient-text">Experiences</span> That Matter</h1>
      <p>The ultimate platform for building high-performance, visually stunning web applications with the power of WebContainers.</p>
      <div className="hero-actions">
        <button className="btn-primary lg">Start Building <Rocket size={18} /></button>
        <button className="btn-secondary lg">Documentation</button>
      </div>
    </motion.div>
    
    <div className="hero-visual">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="glass-card-preview">
        <div className="card-header">
          <div className="dots"><span></span><span></span><span></span></div>
        </div>
        <div className="card-body">
          <Layers size={40} className="floating-icon" />
          <div className="skeleton-lines">
            <div className="line long"></div>
            <div className="line med"></div>
            <div className="line short"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
`
            }
          },
          "Features.jsx": {
            file: {
              contents: `
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="feature-card"
  >
    <div className="feature-icon"><Icon size={24} /></div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.div>
);

export const Features = () => (
  <section className="features">
    <div className="section-header">
      <h2>Engineered for Speed</h2>
      <p>Everything you need to ship world-class software in record time.</p>
    </div>
    <div className="features-grid">
      <FeatureCard 
        icon={Zap} 
        title="Instant Deployment" 
        desc="Your code goes from editor to production in milliseconds with our edge-ready stack." 
        delay={0.1}
      />
      <FeatureCard 
        icon={Shield} 
        title="Bank-Grade Security" 
        desc="Isolated environments ensure your data and users stay protected at all costs." 
        delay={0.2}
      />
      <FeatureCard 
        icon={Sparkles} 
        title="Pixel Perfect" 
        desc="Built-in components designed to look gorgeous on every screen size automatically." 
        delay={0.3}
      />
    </div>
  </section>
);
`
            }
          },
          "Footer.jsx": {
            file: {
              contents: `
import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="logo">
          <div className="logo-icon">V</div>
          <span>VibeCraft</span>
        </div>
        <p>Building the future of the web........</p>
      </div>
      <div className="footer-links">
        <div className="link-group">
          <h4>Product</h4>
          <a href="#">Features</a>
          <a href="#">Integrations</a>
        </div>
        <div className="link-group">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Blog</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 VibeCraft. All rights reserved.</p>
      <div className="socials">
        <Twitter size={18} />
        <Github size={18} />
      </div>
    </div>
  </footer>
);
`
            }
          }
        }
      },
      "index.css": {
        file: {
          contents: `
:root {
  --primary: #6366f1;
  --secondary: #0ea5e9;
  --accent: #d946ef;
  --bg: #020617;
  --card-bg: rgba(30, 41, 59, 0.5);
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  position: relative;
}

.noise {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://grainy-gradients.vercel.app/noise.svg');
  opacity: 0.05;
  pointer-events: none;
  z-index: 50;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  position: sticky;
  top: 0;
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(12px);
  z-index: 100;
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.nav-links a:hover {
  color: var(--text);
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary.lg {
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-secondary.lg {
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
}

/* Hero */
.hero {
  padding: 8rem 5% 4rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.hero h1 {
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blob {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(60px);
  border-radius: 50%;
  z-index: -1;
}

.blob-1 {
  background: var(--primary);
  top: -10%;
  right: -10%;
  opacity: 0.3;
  animation: float 10s infinite alternate;
}

.blob-2 {
  background: var(--accent);
  bottom: -10%;
  left: -10%;
  opacity: 0.2;
  animation: float 12s infinite alternate-reverse;
}

.glass-card-preview {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 450px;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.dots { display: flex; gap: 6px; }
.dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }

.card-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skeleton-lines { display: flex; flex-direction: column; gap: 0.75rem; }
.line { height: 10px; border-radius: 5px; background: var(--border); }
.line.long { width: 80%; }
.line.med { width: 60%; }
.line.short { width: 40%; }

.floating-icon {
  color: var(--secondary);
  filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.4));
  animation: bob 4s infinite ease-in-out;
}

/* Features */
.features {
  padding: 8rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 { font-size: 3rem; margin-bottom: 1rem; }
.section-header p { color: var(--text-muted); font-size: 1.2rem; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 2.5rem;
  border-radius: 24px;
  transition: transform 0.3s, border-color 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.feature-card h3 { margin-bottom: 1rem; font-size: 1.5rem; }
.feature-card p { color: var(--text-muted); line-height: 1.6; }

/* Footer */
.footer {
  padding: 4rem 5% 2rem;
  border-top: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.2);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
}

.footer-brand p {
  color: var(--text-muted);
  margin-top: 1rem;
  max-width: 300px;
}

.footer-links { display: flex; gap: 4rem; }
.link-group h4 { margin-bottom: 1.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.link-group { display: flex; flex-direction: column; gap: 0.75rem; }
.link-group a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.8rem;
}

.socials { display: flex; gap: 1.5rem; cursor: pointer; }

/* Animations */
@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(20px, 30px); }
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .hero h1 { font-size: 3.5rem; }
  .hero p { margin: 0 auto 2.5rem; }
  .hero-actions { justify-content: center; }
  .features-grid { grid-template-columns: 1fr; }
}
`
        }
      }
    }
  }
};
