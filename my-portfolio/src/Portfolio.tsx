import React, { useState, useEffect } from "react";
import "./index.css";
import profilehero from "./assets/balkis_img.png";
import project1 from "./assets/autoxpress.png";
import project2 from "./assets/tektai.png";
import profileImg  from "./assets/me_graduated.jpg";

import { FaArrowLeft, FaArrowRight, FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";

export default function App() {


interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  
}
type ProjectCategory = "academic" | "professional";
const [category, setCategory] = useState<ProjectCategory>("academic");
const [currentSlide, setCurrentSlide] = useState<number>(0);


/*   const projectsDatas = {
  academic: [
    {
      title: "Symptom Checker",
      description: "AI medical chatbot analyzing 500+ symptoms.",
      image: "/assets/symptom.png",
      github: "#"
    },
    {
      title: "TektAI",
      description: "NestJS backend and ReactJS frontend for scalable platform.",
      image: "/assets/tektai.png",
      github: "#"
    },
    {
      title: "AutoXpress",
      description: "Cross-platform carpooling solution reducing commute costs.",
      image: "/assets/autoxpress.png",
      github: "#"
    }
  ],
  professional: [
    {
      title: "CRM Platform",
      description: "Industrial CRM platform improving client tracking by 25%.",
      image: "/assets/crm.png",
      github: "#"
    },
    {
      title: "Project Management System",
      description: "Angular & Spring Boot system increasing task visibility by 25%.",
      image: "/assets/projectmgmt.png",
      github: "#"
    },
    {
      title: "Bank Platform",
      description: "Internal platform optimization for 200+ client profiles.",
      image: "/assets/bank.png",
      github: "#"
    }
  ]
};
 */





const [loading, setLoading] = useState(false);


const projectsData: Record<ProjectCategory, Project[]> = {
  academic: [
    { title: "Symptom Checker", description: "AI medical chatbot analyzing 500+ symptoms.", image: project1, github: "#" },
    { title: "TektAI", description: "NestJS backend and ReactJS frontend for scalable platform.", image: project2, github: "#" },
    { title: "AutoXpress", description: "Cross-platform carpooling solution reducing commute costs.", image: project1, github: "#" }
  ],
  professional: [
    { title: "CRM Platform", description: "Industrial CRM platform improving client tracking by 25%.", image: project2, github: "#" },
    { title: "Project Management System", description: "Angular & Spring Boot system increasing task visibility by 25%.", image: project1, github: "#" },
    { title: "Bank Platform", description: "Internal platform optimization for 200+ client profiles.", image: project2, github: "#" }
  ]
};

const projects = projectsData[category];



  // Slideshow auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);




  const [form, setForm] = useState({ Name: "", Email: "", Message: "" });


  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  setLoading(true); // start spinner

  const scriptURL = "https://script.google.com/macros/s/AKfycbwBbMru1B3gEjgnRPhhzAeKs9AL1Ja6y5W3O9Ukl4qjoLZvArEyYX_iZSZRGOsRsayk/exec";

  try {
    const formData = new FormData(form);
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const data = await response.json();

    setSuccessMessage(data.result === "success" ? "Message sent successfully!" : "Error sending message.");
    setShowMessage(true);

    form.reset();
  } catch (err) {
    console.error(err);
    setSuccessMessage("Something went wrong.");
    setShowMessage(true);
  } finally {
    setLoading(false); // stop spinner
    setTimeout(() => setShowMessage(false), 3000); // hide after 3s
  }
};
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Bika.dev</h1>
        <nav>
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero */}
    <div>
      <section id="hero">
  {/* Left text side */}
  <div className="hero-left">
        <h1>Hi, I'm Balkis</h1>
        <h2>Full Stack Developer</h2>
        <p>I build modern web applications with clean code and beautiful UI.</p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-work">See My Work</a>
          <a href="/Resume_BalkisHmidi.pdf" download className="btn-resume"><FaDownload style={{ marginRight: "0.5rem" }} />
  Download Resume
</a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/balkisshmidi" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/balkiss-hmidi/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
        </div>


 {/* Right image side */}
  <div className="hero-right">
  <img src={profilehero} alt="Balkis" />
  </div>
      </section>
    </div>

{/* About Section */}
<section id="about">
  {/* Section title */}
  <div className="about-title-container">
    <h3 className="about-title">About Me</h3>
  </div>

  <div className="about-content">
    {/* Left image */}
    <img src={profileImg} alt="Balkis" />

    {/* Right text */}
    <div className="about-text">
      <h2>I'm Balkis Hmidi</h2>
      <p>I'm a graduate of Esprit, specializing in Computer Engineering.</p>
        <p>I build modern web applications with scalable backends and smooth UX.</p>
        <p>I love problem solving, learning new technologies, and creating elegant software solutions.
      </p>

   
      <div className="skill-cards">
         <div className="skill-cards">
      <div className="skill-card">
        <span>Web Application Development</span>
      </div>
      <div className="skill-card">
        <span>CRM Dynamics 365</span>
      </div>
      <div className="skill-card">
        <span>Software Development</span>
      </div>
      <div className="skill-card">
        <span>Problem Solving</span>
      </div>
    </div>
      </div>
    </div>
  </div>
</section>
 

<section id="bring-to-table">
  <div className="bring-card">
    <h3>What I Bring to the Table</h3>
    <ul>
<li>End-to-end application development with modern tech stacks </li>
      <li>RESTful API design and microservices architecture </li>
      <li>Continuous integration and deployment pipelines </li>
      <li>Database design and optimization (SQL & NoSQL) </li>
      <li>Agile methodologies and collaborative development </li>
      <li>User experience and interface optimization to improve engagement and efficiency </li>
      <li>Performance optimization and problem-solving for scalable applications</li>
      <li>Secure and reliable systems through authentication and access control </li>
    </ul>
  </div>
</section>









<section id="skills">
  <h3 className="section-title">Skills & Technologies</h3>
  <div className="skills-slider">
    <div className="skills-track">
      {/* Languages & Frameworks Card */}
      <div className="skill-card">
        <h4>💻 Languages & Frameworks</h4>
  <div className="skill-tags">
    {`HTML5 CSS3 JavaScript TypeScript PHP Java Python Angular ReactJS Vue.js Ionic .NET SpringBoot Laravel Symfony Django Node.js`
      .split(" ") // split by space
      .map((word) => (
        <span key={word} className="skill-tag">{word}</span>
      ))}
  </div>
      </div>

      {/* Databases Card */}
      <div className="skill-card">
        <h4>🗄️ Databases</h4>
        <div className="skill-tags">
          {["MySQL","MongoDB","SQL Server"].map((db) => (
            <span key={db} className="skill-tag">{db}</span>
          ))}
        </div>
      </div>

      {/* DevOps & Version Control Card */}
      <div className="skill-card">
        <h4>⚙️ DevOps & Version Control</h4>
        <div className="skill-tags">
          {["Git","GitHub","Docker","Jenkins","CI/CD","Kubernetes"].map((tool) => (
            <span key={tool} className="skill-tag">{tool}</span>
          ))}
        </div>
      </div>

      {/* CRM & Power Platform Card */}
      <div className="skill-card">
        <h4>🔧 CRM & Power Platform</h4>
        <div className="skill-tags">
          {["Microsoft Dynamics 365","Power Apps","Power Automate","Power BI"].map((crm) => (
            <span key={crm} className="skill-tag">{crm}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>





<section id="projects">
  <h3 className="section-title">Projects</h3>

<div className="project-buttons">
  <button
    className={category === "academic" ? "active" : ""}
    onClick={() => { setCategory("academic"); setCurrentSlide(0); }}
  >
    Academic Projects
  </button>
  <button
    className={category === "professional" ? "active" : ""}
    onClick={() => { setCategory("professional"); setCurrentSlide(0); }}
  >
    Professional Projects
  </button>
</div>


  {/* Slider */}
  <div className="project-slider">
    <button className="arrow left" onClick={() => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)}>
      <FaArrowLeft />
    </button>

    <div className="project-cards">
      {projects.map((proj, index) => {
        // show 3 cards in rotation
        const isVisible =
          index === currentSlide ||
          index === (currentSlide + 1) % projects.length ||
          index === (currentSlide + 2) % projects.length;
        return isVisible ? (
          <div className="project-card" key={index}>
            <img src={proj.image} alt={proj.title} />
            <h4>{proj.title}</h4>
            <p>{proj.description}</p>
            <a href={proj.github} target="_blank" rel="noreferrer" className="github-btn">
              <FaGithub /> GitHub
            </a>
          </div>
        ) : null;
      })}
    </div>

    <button className="arrow right" onClick={() => setCurrentSlide((prev) => (prev + 1) % projects.length)}>
      <FaArrowRight />
    </button>
  </div>
</section>




      {/* Projects */}
   {/*    <section id="projects">
        <h3>Projects</h3>
        <div className="project-slideshow">
          {projects.map((proj, index) => (
            <div className={`project-slide ${index === currentSlide ? "active" : ""}`} key={index}>
              <img src={proj.image} alt={proj.title} />
              <h4>{proj.title}</h4>
              <p>{proj.description}</p>
              <a href={proj.github} target="_blank">GitHub</a>
            </div>
          ))}
        </div>
      </section>

 */}



 <section id="contact" className="contact-section">
      <h3 className="contact-title">Contact Me</h3>

      <div className="contact-container">
        {/* Left: contact info */}
        <div className="contact-info">
          <h4>Get In touch</h4>
          <p>If you’d like to collaborate or hire me you can send a message!</p>

          <div className="contact-item">
            <span>📧</span>
            <a href="mailto:balkis.hmidi@outlook.com">balkis.hmidi@outlook.com</a>
          </div>

          <div className="contact-item">
            <span>📍</span>
            <p>Borj Cedria, Tunisia</p>
          </div>

          <div className="contact-item">
            <span>💼</span>
            <a href="https://www.linkedin.com/in/balkiss-hmidi/" target="_blank">LinkedIn Profile</a>
          </div>
        </div>

  {/* Right: form */}




  <form  className="contact-form" onSubmit={handleSubmit} name="submit-to-google-sheet">
      <input
        type="text"
        name="Name"
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="Email"
        placeholder="Your Email"
        required
      />
      <textarea
        name="Message"
        placeholder="Your Message"
        required
      />

{showMessage && (
  <div className={`success slide`}>
    <div className="success__icon">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" fill="#393a37" fillRule="evenodd"></path>
      </svg>
    </div>
    <div className="success__title">{successMessage}</div>
  </div>
)}



<button type="submit" className="contact-btn" disabled={loading}>
  {loading ? (
    <>
      <span className="spinner"></span> Sending...
    </>
  ) : (
    "Send Message"
  )}
</button>
    </form>

      </div>
    </section>






      {/* Contact */}
      <section id="contact">
        <h3>Get in Touch</h3>
        <p>Email: balkis.hmidi@outlook.com</p>
        <p>Phone: +216 52259276</p>
      </section>






      {/* Footer */}
      <footer>© {new Date().getFullYear()} Bika</footer>
    </div>
  );
}
