import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, Code, Briefcase, GraduationCap, Award, Menu, X, Download, Sparkles, Rocket, Zap, ArrowUp, Terminal } from 'lucide-react';
import './index.css';
import profilehero from "./assets/balkis_img.png";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [showScroll, setShowScroll] = useState(false);
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fullText = "< Building innovative solutions />";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScroll(window.scrollY > 400);
      
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const skills = {
    'Languages & Technologies': ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'Python', 'Node.js'],
    'Front-End': ['Angular', 'ReactJS', 'Vue.js', 'Ionic'],
    'Back-End': ['Spring Boot', '.NET', 'Laravel', 'Symfony', 'Django', 'NestJS'],
    'Databases': ['MySQL', 'MongoDB', 'SQL Server'],
    'CRM Power Platform': ['Microsoft Dynamics 365', 'Power Apps', 'Power Automate', 'Power BI'],
    'DevOps': ['Git', 'GitHub', 'Docker', 'Jenkins', 'CI/CD', 'Kubernetes']
  };

  const experience = [
    {
      company: 'INETUM Tunisia',
      role: 'Full-Stack & CRM Developer',
      period: 'Feb 2025 - Aug 2025',
      location: 'Lac 2, Tunisia',
      color: 'purple-pink',
      tasks: [
        'Contributed to the development of an industrial CRM application using Angular and .NET',
        'Supported business process automation using Power Apps and Power Automate',
        'Designed Power BI dashboards for KPI monitoring',
        'Assisted in implementing secure authentication and user access management'
      ]
    },
    {
      company: 'IPACT Consult Inc.',
      role: 'Web Developer',
      period: 'Jun 2024 - Aug 2024',
      location: 'Remote',
      color: 'blue-cyan',
      tasks: [
        'Contributed to the development of a project management web application using Angular, Spring Boot, and MongoDB',
        'Participated in implementing unit testing to ensure code quality and reliability'
      ]
    },
    {
      company: 'AXE Finance',
      role: 'Mobile Developer',
      period: 'Feb 2022 - May 2022',
      location: 'Lac 1, Tunisia',
      color: 'green-emerald',
      tasks: [
        'Participated in the development of a mobile credit request application',
        'Contributed to front-end development using Ionic and Angular',
        'Assisted in back-end development using .NET and database design'
      ]
    }
  ];

  const projects = [
    {
      name: 'Symptom Checker',
      description: 'A symptom analysis web application integrating an AI chatbot for health diagnostics',
      tech: ['Django', 'Gemini AI'],
      github: 'https://github.com/Imen-Frigui/Symptom_Checker',
      institution: 'ESPRIT',
      gradient: 'red-orange'
    },
    {
      name: 'AutoXpress',
      description: 'A cross-platform carpooling application with web, mobile, and desktop interfaces',
      tech: ['Symfony', 'Codename One', 'JavaFX'],
      github: 'https://github.com/balkishmidi/autoxpress',
      institution: 'ESPRIT',
      gradient: 'blue-purple'
    },
    {
      name: 'TEKTAI',
      description: 'A collaborative web platform connecting industry professionals and data science developers',
      tech: ['NestJS', 'ReactJS', 'MongoDB'],
      github: 'https://github.com/AtefBadreddine/Tektai-Devtech-4TWIN2/tree/balkis',
      institution: 'ESPRIT',
      gradient: 'green-teal'
    },
    {
      name: 'CinéMatch',
      description: 'A mobile app UI/UX design facilitating group decision-making for movie selection, promoting Tunisian cinema',
      tech: ['Figma', 'Adobe XD'],
      figma: 'https://www.figma.com/design/MSJnfMqcPJJD8YT9AQjTos/Cin%C3%A9Match?node-id=0-1&node-type=canvas&t=vW3yuf5TVthc9HJ7-0',
      institution: 'ESPRIT',
      gradient: 'pink-rose'
    },
    {
      name: 'RescueFood',
      description: 'A web application aimed at reducing food waste through smart resource management',
      tech: ['Laravel', 'MySQL'],
      github: 'https://github.com/Imen-Frigui/Netrunners-Rescue-Food-5TWIN2',
      institution: 'ESPRIT',
      gradient: 'yellow-orange'
    }
  ];

  return (
    <div className="portfolio">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Scroll to top button */}
      <button 
        className={`scroll-to-top ${showScroll ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

      {/* Typing indicator */}
      <div className="code-typing">
        <Terminal size={16} />
        <span>{typedText}</span>
        <span className="cursor">|</span>
      </div>

      <div className="gradient-orbs">
        <div 
          className="gradient-orb orb-1"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo" onClick={() => scrollToSection('home')}>
              <span className="bracket">&lt;</span>
              BH
              <span className="bracket">/&gt;</span>
            </div>
            
            <div className="nav-links desktop">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="mobile-menu-link"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <div className="profile-image-container fade-in-up">
            <div className="profile-glow" />
            <div className="profile-image">
              <img src={profilehero} alt="Balkis Hmidi" className="profile-img" />
            </div>
            <div className="rocket-badge">
              <Rocket size={32} />
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-badge fade-in">
              <Zap size={16} className="pulse-icon" />
              <span>Full-Stack Developer</span>
            </div>
            
            <h1 className="hero-title slide-down">
              Hi, I'm <span className="gradient-text">Balkis Hmidi</span>
            </h1>
            
            <p className="hero-subtitle slide-up">
              Computer Engineer specializing in building exceptional digital experiences with modern technologies
            </p>

            <div className="hero-buttons fade-in-delay">
              <button onClick={() => scrollToSection('contact')} className="btn-primary">
                Let's Talk
                <ChevronDown size={20} className="chevron-icon" />
              </button>
              
              <a href="/Resume_BalkisHmidi.pdf" download className="btn-secondary">
                <Download size={20} />
                Download CV
              </a>
            </div>

            <div className="social-links fade-in-delay-2">
              <a href="https://github.com/balkishmidi" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/balkiss-hmidi" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={24} />
              </a>
              <a href="mailto:balkis.hmidi@outlook.com" className="social-link">
                <Mail size={24} />
              </a>
              <a href="tel:+21652259276" className="social-link">
                <Phone size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={40} />
        </div>
      </section>

      <section id="about" className={`section ${isVisible.about ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text">About Me</h2>
            <div className="title-underline" />
          </div>

          <div className="about-grid">
            <div className="about-text-card">
              <div className="card-glow" />
              <div className="card-content">
                <div className="code-snippet">
                  <span className="code-keyword">const</span> developer = {'{'}
                  <div className="code-indent">
                    <span className="code-property">name:</span> <span className="code-string">"Balkis Hmidi"</span>,
                  </div>
                  <div className="code-indent">
                    <span className="code-property">role:</span> <span className="code-string">"Full-Stack Engineer"</span>
                  </div>
                  {'}'};
                </div>
                <p>
                  I'm a passionate <span className="highlight-purple">Computer Engineering graduate</span> with expertise in full-stack web development. My journey in tech has equipped me with comprehensive experience across web, mobile, and CRM applications.
                </p>
                <p>
                  From crafting elegant front-end experiences with <span className="highlight-pink">Angular and ReactJS</span> to building robust backends with <span className="highlight-pink">Spring Boot, .NET, and Django</span>, I love bringing ideas to life through code.
                </p>
                <p>
                  I'm particularly excited about <span className="highlight-purple">AI integration</span> and innovation, always eager to explore cutting-edge technologies and solve complex challenges.
                </p>
              </div>
            </div>

            <div className="stats-grid">
              {[
                { num: '3+', label: 'Internships', icon: Briefcase },
                { num: '5+', label: 'Projects', icon: Code },
                { num: '20+', label: 'Technologies', icon: Zap },
                { num: '4+', label: 'Certifications', icon: Award }
              ].map((stat, idx) => (
                <div key={idx} className="stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="stat-glow" />
                  <div className="stat-content">
                    <stat.icon size={32} className="stat-icon" />
                    <div className="stat-number gradient-text">{stat.num}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={`section section-alt ${isVisible.skills ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text">Technical Skills</h2>
            <div className="title-underline" />
          </div>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={category} className="skill-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="skill-glow" />
                <div className="skill-content">
                  <div className="skill-header">
                    <div className="skill-icon">
                      <Code size={20} />
                    </div>
                    <h3>{category}</h3>
                  </div>
                  <div className="skill-tags">
                    {items.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={`section ${isVisible.experience ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text">Work Experience</h2>
            <div className="title-underline" />
          </div>

          <div className="experience-list">
            {experience.map((exp, idx) => (
              <div key={idx} className="experience-card" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="exp-glow" />
                <div className="exp-content">
                  <div className="exp-layout">
                    <div className={`exp-icon ${exp.color}`}>
                      <Briefcase size={32} />
                    </div>
                    <div className="exp-details">
                      <h3>{exp.role}</h3>
                      <p className="exp-company">{exp.company}</p>
                      <div className="exp-meta">
                        <span>📍 {exp.location}</span>
                        <span>📅 {exp.period}</span>
                      </div>
                      <ul className="exp-tasks">
                        {exp.tasks.map((task, taskIdx) => (
                          <li key={taskIdx}>
                            <span className="task-bullet">▹</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className={`section section-alt ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title gradient-text">Academic Projects</h2>
            <div className="title-underline" />
          </div>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="project-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`project-glow ${project.gradient}`} />
                <div className="project-content">
                  <div className={`project-image ${project.gradient}`}>
                    <div className="project-overlay" />
                    <Code size={64} className="project-icon" />
                    <div className="project-badge">{project.institution}</div>
                  </div>
                  
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    
                    <div className="project-tech">
                      {project.tech.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.figma && (
                        <a href={project.figma} target="_blank" rel="noopener noreferrer" className="project-link">
                          <ExternalLink size={16} />
                          <span>Design</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className={`section ${isVisible.education ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text">Education & Achievements</h2>
            <div className="title-underline" />
          </div>

          <div className="education-grid">
            {[
              {
                institution: 'ESPRIT',
                degree: 'Engineering Degree in Computer Science',
                period: 'Graduation: Oct 2025',
                description: 'École Sup Privée d\'Ingénierie et de Technologies',
                color: 'purple-pink'
              },
              {
                institution: 'ISET Kairouan',
                degree: 'Bachelor\'s Degree in Multimedia and Web Development',
                period: 'Graduation: Jun 2022',
                color: 'blue-cyan'
              },
              {
                institution: 'Borj Cédria High School',
                degree: 'Baccalaureate in Experimental Sciences',
                period: 'Graduation: Jul 2019',
                color: 'green-emerald'
              }
            ].map((edu, idx) => (
              <div key={idx} className="education-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`edu-glow ${edu.color}`} />
                <div className="edu-content">
                  <div className="edu-layout">
                    <div className={`edu-icon ${edu.color}`}>
                      <GraduationCap size={28} />
                    </div>
                    <div className="edu-details">
                      <h3>{edu.degree}</h3>
                      <p className="edu-institution">{edu.institution}</p>
                      {edu.description && <p className="edu-description">{edu.description}</p>}
                      <p className="edu-period">{edu.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="achievements-grid">
            <div className="cert-card">
              <div className="cert-glow" />
              <div className="cert-content">
                <div className="cert-header">
                  <div className="cert-icon">
                    <Award size={24} />
                  </div>
                  <h3>Certifications</h3>
                </div>
                <ul className="cert-list">
                  {[
                    'HTML5 Application Development Fundamentals - Microsoft',
                    'Introduction to HTML & CSS - Microsoft',
                    'Hashgraph Developer - The Hashgraph Association',
                    'Honoris Sustainability, Work Ethics & Gender Equity'
                  ].map((cert, idx) => (
                    <li key={idx}>
                      <span className="cert-check">✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lang-card">
              <div className="lang-glow" />
              <div className="lang-content">
                <div className="lang-header">
                  <div className="lang-icon">
                    <Sparkles size={24} />
                  </div>
                  <h3>Languages</h3>
                </div>
                <div className="lang-list">
                  {[
                    { lang: 'Arabic', level: 'Native', width: '100%' },
                    { lang: 'English', level: 'B2', width: '85%' },
                    { lang: 'Français', level: 'B2', width: '85%' },
                    { lang: 'Turc', level: 'Basic', width: '40%' }
                  ].map((item, idx) => (
                    <div key={idx} className="lang-item">
                      <div className="lang-info">
                        <span>{item.lang}</span>
                        <span className="lang-level">{item.level}</span>
                      </div>
                      <div className="lang-bar">
                        <div className="lang-progress" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`section section-alt ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text">Let's Connect</h2>
            <div className="title-underline" />
            <p className="section-subtitle">
              Ready to collaborate on exciting projects or discuss opportunities? I'm just a message away!
            </p>
          </div>

          <div className="contact-grid">
            {[
              { icon: Mail, label: 'Email', value: 'balkis.hmidi@outlook.com', href: 'mailto:balkis.hmidi@outlook.com', color: 'red-pink' },
              { icon: Phone, label: 'Phone', value: '+216 52 259 276', href: 'tel:+21652259276', color: 'green-emerald' },
              { icon: Linkedin, label: 'LinkedIn', value: 'balkiss-hmidi', href: 'https://linkedin.com/in/balkiss-hmidi', color: 'blue-cyan' },
              { icon: Github, label: 'GitHub', value: 'balkishmidi', href: 'https://github.com/balkishmidi', color: 'purple-pink' }
            ].map((contact, idx) => (
              <a key={idx} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="contact-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`contact-glow ${contact.color}`} />
                <div className="contact-content">
                  <div className={`contact-icon ${contact.color}`}>
                    <contact.icon size={28} />
                  </div>
                  <div className="contact-info">
                    <p className="contact-label">{contact.label}</p>
                    <p className="contact-value">{contact.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="social-section">
            <p>Or find me on social media</p>
            <div className="social-icons">
              {[
                { icon: Github, href: 'https://github.com/balkishmidi' },
                { icon: Linkedin, href: 'https://linkedin.com/in/balkiss-hmidi' },
                { icon: Mail, href: 'mailto:balkis.hmidi@outlook.com' }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="social-icon">
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Designed & Built by <span className="footer-highlight">Balkis Hmidi</span>
          </p>
          <p className="footer-copyright">
            © 2025 All rights reserved. Made with React & CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;