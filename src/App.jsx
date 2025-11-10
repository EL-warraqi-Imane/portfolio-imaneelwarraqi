import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, Briefcase, Code, Rocket, Mail, Phone, Linkedin, Github, GraduationCap, ChevronDown, ChevronUp, Menu, X, Download, ExternalLink, Brain, Database, BarChart3, Languages, Target, Award, Zap, Star, Sparkles, Calendar, MapPin, Clock } from 'lucide-react';

// ============= CONFIGURATION =============
const CONFIG = {
  personal: {
    name: "Imane EL WARRAQI",
    title: "Future Ingénieure En Informatique Et Ingénierie Des Données",
    subtitle: "Data Science & Intelligence Artificielle",
    school: "ENSA Khouribga",
    year: "5ème année",
    availability: "Disponible pour un stage PFE 2026",
    image: "/assets/imanee.png"
  },
  contact: {
    email: "elwarraqiimane@gmail.com",
    phone: "+212 613 563 708",
    linkedin: "https://linkedin.com/in/imane-el-warraqi",
    github: "https://github.com/EL-warraqi-Imane"
  },
  cv: {
    DA: "/assets/ELwarraqi_Imane_PFE_DA.pdf",
    DS: "/assets/ELwarraqi_Imane_CV_Data.pdf",
    DE: "/assets/ELwarraqi_Imane_CV_DE.pdf"
  },
  stats: [
    { number: '6+', label: 'Projets Data', icon: Target },
    { number: '3+', label: 'Stages Réalisés', icon: Award },
    { number: '15+', label: 'Technologies', icon: Code },
    { number: '2026', label: 'Diplôme', icon: GraduationCap }
  ]
};

// ============= ANIMATIONS & EFFECTS =============
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.1})`;
        this.oscillation = Math.random() * Math.PI * 2;
      }

      update() {
        this.oscillation += 0.02;
        this.x += this.speedX + Math.cos(this.oscillation) * 0.3;
        this.y += this.speedY + Math.sin(this.oscillation) * 0.3;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20 pointer-events-none" />;
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-1"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-2"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-3"></div>
    </div>
    <ParticleBackground />
  </div>
);

// ============= UI COMPONENTS =============
const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-purple-500/5 ${hover ? 'hover:bg-slate-900/60 hover:border-purple-500/30 hover:scale-[1.02] hover:shadow-purple-500/20' : ''} transition-all duration-500 ${className}`}>
    {children}
  </div>
);

const GradientText = ({ children, className = "" }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 ${className}`}>
    {children}
  </span>
);

const IconBadge = ({ icon: Icon, gradient = "from-purple-500 to-pink-500", size = 24 }) => (
  <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300`}>
    <Icon size={size} className="text-white" />
  </div>
);

// ============= CV DOWNLOAD MODAL =============
const CVButton = () => {
  const [showModal, setShowModal] = useState(false);

  const cvOptions = [
    { id: "DA", title: "Data Analyst", desc: "Analyse et visualisation", icon: BarChart3, gradient: "from-purple-500 to-pink-500" },
    { id: "DS", title: "Data Scientist", desc: "Machine Learning et IA", icon: Brain, gradient: "from-blue-500 to-cyan-500" },
    { id: "DE", title: "Data Engineer", desc: "Infrastructure et pipelines", icon: Database, gradient: "from-green-500 to-teal-500" }
  ];

  const handleDownload = (version) => {
    const url = CONFIG.cv[version];
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
      >
        <Download size={20} className="group-hover:animate-bounce" />
        Télécharger CV
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowModal(false)}>
          <GlassCard className="max-w-lg w-full p-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                <GradientText>Choisir la version</GradientText>
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-slate-400 mb-6">Sélectionnez la version qui correspond à vos besoins</p>

            <div className="space-y-4">
              {cvOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDownload(option.id)}
                  className={`group w-full p-5 bg-gradient-to-r ${option.gradient}/10 border border-slate-700 rounded-2xl hover:scale-105 hover:border-slate-500/50 transition-all duration-300 text-left`}
                >
                  <div className="flex items-center gap-4">
                    <IconBadge icon={option.icon} gradient={option.gradient} />
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">{option.title}</h4>
                      <p className="text-slate-400 text-sm">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

// ============= NAVIGATION =============
const Navigation = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Camera },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'projects', label: 'Projets', icon: Rocket },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Sparkles className="text-purple-400 animate-pulse" size={24} />
            <span className="text-2xl font-black">
              <GradientText>{CONFIG.personal.name}</GradientText>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl rounded-full p-2 border border-slate-700/50">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 mx-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden animate-slide-down">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-6 py-4 flex items-center gap-4 transition-all ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-4 border-purple-500 text-purple-400' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ============= HERO SECTION =============
const HeroSection = ({ setActiveSection }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-black leading-tight">
              <GradientText className="animate-gradient">
                {CONFIG.personal.name}
              </GradientText>
            </h1>
            
            <p className="text-xl text-slate-300">{CONFIG.personal.title}</p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm animate-pulse-gentle">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-green-400 font-semibold">{CONFIG.personal.availability}</span>
              <Star size={18} className="text-green-400" />
            </div>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-delayed-2">
            Étudiante en dernière année à l'ENSA Khouribga en Informatique et Ingénierie des Données, 
            passionnée par l'innovation technologique. Spécialisée en <strong className="text-purple-400">Machine Learning, 
            NLP, Deep Learning, LLM, Power BI, Vision par ordinateur</strong> et <strong className="text-purple-400">Big Data</strong>.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveSection('about')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              <User size={20} className="group-hover:rotate-12 transition-transform" />
              Découvrir mon profil
            </button>
            
            <button
              onClick={() => setActiveSection('projects')}
              className="group px-8 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl font-semibold flex items-center gap-3 hover:border-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              <Rocket size={20} className="group-hover:scale-110 transition-transform" />
              Mes projets
            </button>
            
            <CVButton />
          </div>
        </div>

        <div className="flex justify-center animate-fade-in-scale">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-50 group-hover:opacity-70 animate-spin-slow"></div>
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2 animate-pulse-gentle">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-800">
                  <img
                    src={CONFIG.personal.image}
                    alt={CONFIG.personal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-8 border-2 border-purple-400/20 rounded-full animate-ping-slow"></div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActiveSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce hover:text-purple-400 transition-colors"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
};

// ============= STATS SECTION =============
const StatsSection = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-16">
    {CONFIG.stats.map((stat, i) => (
      <GlassCard key={i} className="p-8 group text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
          <stat.icon size={24} className="text-white" />
        </div>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-4 mb-2">
          {stat.number}
        </div>
        <div className="text-sm text-slate-400">{stat.label}</div>
      </GlassCard>
    ))}
  </div>
);

// ============= ABOUT SECTION =============
const AboutSection = ({ setActiveSection }) => {
  const skills = [
    { 
      icon: Brain, 
      title: 'Machine Learning', 
      desc: 'Python, Scikit-learn, TensorFlow, PyTorch', 
      color: 'from-purple-500 to-pink-500',
      details: ['Deep Learning', 'Computer Vision', 'Reinforcement Learning', 'Model Deployment']
    },
    { 
      icon: Languages, 
      title: 'NLP & LLM', 
      desc: 'BERT, Transformers, NLTK, LangChain', 
      color: 'from-blue-500 to-cyan-500',
      details: ['Text Classification', 'Sentiment Analysis', 'Chatbots', 'Text Generation']
    },
    { 
      icon: BarChart3, 
      title: 'Data Analysis & BI', 
      desc: 'Power BI, Tableau, Pandas, SQL', 
      color: 'from-green-500 to-teal-500',
      details: ['Data Visualization', 'Dashboard Creation', 'Statistical Analysis', 'ETL Processes']
    },
    { 
      icon: Database, 
      title: 'Big Data & Engineering', 
      desc: 'Hadoop, Spark, MongoDB, Elasticsearch', 
      color: 'from-orange-500 to-red-500',
      details: ['Data Pipelines', 'Real-time Processing', 'Data Warehousing', 'Cloud Platforms']
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          À propos de moi
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Passionnée par l'intelligence artificielle et la valorisation des données
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 group">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500 group-hover:border-pink-500 transition-colors duration-300 relative">
              <img
                src={CONFIG.personal.image}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-white">
              {CONFIG.personal.name}
            </h3>
            <p className="text-gray-400 text-center text-sm">{CONFIG.personal.school} - {CONFIG.personal.year}</p>
            <p className="text-gray-400 text-center text-sm">Spécialité: Ingénierie Informatique & Données</p>
            
            <div className="mt-6 space-y-3 flex justify-center">
              <CVButton />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Vision & Mission
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Actuellement en dernière année d'ingénierie informatique à l'ENSA Khouribga, je me spécialise dans 
                la Data Science et l'Intelligence Artificielle. Mon parcours académique et mes expériences pratiques 
                m'ont permis de développer une expertise solide dans les technologies émergentes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                J'ai eu l'opportunité de travailler sur plusieurs projets innovants, couvrant des domaines tels que 
                le Machine Learning, l'analyse et la visualisation de données, ainsi que le développement de solutions 
                technologiques avancées. Mon objectif est de continuer à évoluer dans ce domaine passionnant et de 
                contribuer à des projets qui ont un impact réel.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-1 text-white">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">{skill.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.details.map((detail, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveSection('experience')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50"
            >
              <Briefcase size={20} />
              Mes expériences
            </button>
          </div>
        </div>

        <StatsSection />
      </div>
    </section>
  );
};

// ============= EXPERIENCE SECTION AMÉLIORÉE =============
const ExperienceSection = ({ setActiveSection }) => {
  const experiences = [
    {
      date: 'Juillet - Septembre 2025',
      title: 'Stagiaire Data Science',
      company: 'Moteur de Recherche Réglementaire Intelligent',
      location: 'Casablanca, Maroc',
      type: 'Stage de fin d\'études',
      duration: '2 mois',
      description: 'Développement d\'un système de recherche sémantique avancé utilisant BERT pour l\'extraction d\'entités juridiques dans la réglementation marocaine.',
      achievements: [
        'Conception et développement d\'un moteur de recherche sémantique avec BERT et Transformers',
        'Implémentation de l\'extraction d\'entités nommées (NER) pour identifier les concepts juridiques',
        'Optimisation des performances avec Elasticsearch pour l\'indexation et la recherche',
        'Création d\'une API REST avec FastAPI pour l\'intégration du système',
        'Développement d\'une interface utilisateur avec Streamlit pour la démonstration',
        'Amélioration de la précision de recherche de 40% par rapport aux méthodes traditionnelles'
      ],
      technologies: ['Python', 'BERT', 'Transformers', 'Elasticsearch', 'FastAPI', 'Streamlit', 'NLP', 'Spacy'],
      tags: ['Data Science', 'NLP', 'Deep Learning', 'Recherche Sémantique', 'LLM'],
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      date: 'Juillet - Août 2024',
      title: 'Stagiaire Data Analyst',
      company: 'Analyse des ventes avec Power BI',
      location: 'Khouribga, Maroc',
      type: 'Stage d\'été',
      duration: '1 mois',
      description: 'Analyse approfondie des données de ventes avec création de tableaux de bord interactifs pour l\'optimisation des stratégies commerciales.',
      achievements: [
        'Collecte et nettoyage de données de ventes provenant de multiples sources',
        'Création de 5 tableaux de bord interactifs avec Power BI pour le suivi des performances',
        'Automatisation des rapports avec Power Automate réduisant le temps de génération de 70%',
        'Identification de tendances saisonnières permettant une optimisation du stock',
        'Analyse RFM (Récence, Fréquence, Montant) pour la segmentation des clients',
        'Détection d\'anomalies dans les données de vente permettant une action corrective rapide'
      ],
      technologies: ['Power BI', 'Power Automate', 'SQL', 'DAX', 'Excel', 'Data Visualization'],
      tags: ['Data Analysis', 'Business Intelligence', 'Data Visualization', 'ETL'],
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500'
    }
   
  ];

  const [expandedExperience, setExpandedExperience] = useState(null);

  const toggleExperience = (index) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  return (
    <section id="experience" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4">
            <GradientText>Parcours Professionnel</GradientText>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-400">Des expériences enrichissantes qui ont façonné mon expertise</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <GlassCard key={i} className="p-8 group transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${exp.gradient} shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300`}>
                    <exp.icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-purple-400" />
                        <span className="text-sm font-bold text-purple-400">{exp.date}</span>
                        <span className="text-slate-500">•</span>
                        <Clock size={16} className="text-blue-400" />
                        <span className="text-sm text-blue-400">{exp.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-slate-400" />
                        <h4 className="text-lg text-slate-300">{exp.company}</h4>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="text-slate-400 text-sm">{exp.location}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 text-sm">{exp.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed">{exp.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs hover:border-purple-500/50 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Achievements */}
                  <div className="border-t border-slate-700/50 pt-4">
                    <button
                      onClick={() => toggleExperience(i)}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
                    >
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${expandedExperience === i ? 'rotate-180' : ''}`} 
                      />
                      <span className="font-semibold">
                        {expandedExperience === i ? 'Masquer les détails' : `Voir les réalisations (${exp.achievements.length})`}
                      </span>
                    </button>

                    {expandedExperience === i && (
                      <div className="space-y-3 animate-fade-in">
                        <h5 className="font-semibold text-slate-300">Principales réalisations :</h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, j) => (
                            <li key={j} className="flex items-start gap-3 text-slate-400 text-sm">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Timeline Indicator */}
        <div className="relative mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <div className="text-center pt-28">
            <button
              onClick={() => setActiveSection('skills')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 mx-auto group"
            >
              <Code size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Découvrir mes compétences techniques
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= SKILLS SECTION =============
const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Brain,
      title: 'Data Science & ML',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'TensorFlow/PyTorch', level: 85 },
        { name: 'Scikit-learn', level: 88 },
        { name: 'Computer Vision', level: 80 }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Languages,
      title: 'NLP & LLM',
      skills: [
        { name: 'BERT/Transformers', level: 85 },
        { name: 'LangChain', level: 80 },
        { name: 'NLTK/Spacy', level: 88 }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      skills: [
        { name: 'Power BI', level: 90 },
        { name: 'SQL', level: 85 },
        { name: 'Tableau', level: 75 }
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Database,
      title: 'Big Data',
      skills: [
        { name: 'Spark', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Elasticsearch', level: 82 }
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4">
            <GradientText>Compétences Techniques</GradientText>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <GlassCard key={i} className="p-8 group">
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300 mb-6`}>
                <category.icon size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-6 text-white">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-purple-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= PROJECTS SECTION =============
const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      icon: '🎬',
      category: 'data',
      title: 'Real-Time Movie Streaming Analytics',
      description: 'Pipeline de données en temps réel avec Apache Kafka et Spark Streaming pour analyser les films visionnés.',
      tags: ['Kafka', 'Spark', 'MongoDB', 'Power BI'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💊',
      category: 'data',
      title: 'Analyse d\'Impact Médicamenteux',
      description: 'Entrepôt de données et dashboards Power BI pour l\'analyse pharmaceutique.',
      tags: ['Power BI', 'ETL', 'SQL'],
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      icon: '🎤',
      category: 'data',
      title: 'Synthèse Vocale Temps Réel',
      description: 'Entraînement de modèles avancés de synthèse vocale (FastSpeech2, HiFi-GAN).',
      tags: ['FastSpeech2', 'PyTorch', 'Audio'],
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: '💬',
      category: 'data',
      title: 'Analyse des Feedbacks Étudiants',
      description: 'Système d\'analyse des sentiments avec NLP et chatbot intelligent.',
      tags: ['NLP', 'Sentiment Analysis', 'Chatbot'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '👁️',
      category: 'data',
      title: 'Segmentation de Visage',
      description: 'Modèle U-Net pré-entraîné pour la segmentation d\'images faciales.',
      tags: ['Computer Vision', 'U-Net', 'Deep Learning'],
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: '🛒',
      category: 'dev',
      title: 'Application E-commerce',
      description: 'Application complète avec système de paiement et gestion des stocks.',
      tags: ['Laravel', 'Tailwind', 'MySQL'],
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4">
            <GradientText>Mes Projets</GradientText>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'data', label: 'Data Science' },
            { id: 'dev', label: 'Développement' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-900/50 border border-slate-700 text-slate-400 hover:border-purple-500/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <GlassCard key={i} className="overflow-hidden group">
              <div className={`p-8 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-xs hover:border-purple-500/50 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500/50 transition-all flex items-center justify-center gap-2">
                    <Github size={18} />
                    Code
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={18} />
                    Voir
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= CONTACT SECTION =============
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const mailtoLink = `mailto:${CONFIG.contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: CONFIG.contact.email, link: `mailto:${CONFIG.contact.email}`, color: 'from-purple-500 to-pink-500' },
    { icon: Phone, title: 'Téléphone', value: CONFIG.contact.phone, link: `tel:${CONFIG.contact.phone}`, color: 'from-blue-500 to-cyan-500' },
    { icon: Linkedin, title: 'LinkedIn', value: 'Imane EL Warraqi', link: CONFIG.contact.linkedin, color: 'from-blue-600 to-blue-800' },
    { icon: Github, title: 'GitHub', value: 'EL-warraqi-Imane', link: CONFIG.contact.github, color: 'from-gray-600 to-gray-800' }
  ];

  return (
    <section id="contact" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4">
            <GradientText>Contactez-moi</GradientText>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-400">Prête à collaborer sur des projets innovants</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <GlassCard key={i} className="p-6 group">
                <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">{info.title}</h3>
                    <p className="text-slate-400 hover:text-purple-400 transition-colors">{info.value}</p>
                  </div>
                </a>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <h3 className="text-3xl font-bold mb-6">
              <GradientText>Envoyez un message</GradientText>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Nom complet *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Sujet *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all resize-none text-white"
                  placeholder="Décrivez votre projet..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                } transition-all duration-300 text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ============= FOOTER =============
const Footer = () => (
  <footer className="bg-slate-950/50 backdrop-blur-xl border-t border-slate-800 py-12 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="text-2xl font-bold mb-4">
            <GradientText>{CONFIG.personal.name}</GradientText>
          </h4>
          <p className="text-slate-400 mb-6">Future Ingénieure en Data Science & IA</p>
          <div className="flex gap-3">
            <a href={CONFIG.contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-center hover:border-purple-500 hover:scale-110 transition-all">
              <Linkedin size={18} />
            </a>
            <a href={CONFIG.contact.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-center hover:border-purple-500 hover:scale-110 transition-all">
              <Github size={18} />
            </a>
            <a href={`mailto:${CONFIG.contact.email}`} className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-center hover:border-purple-500 hover:scale-110 transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-lg text-white">Navigation</h4>
          <ul className="space-y-2 text-slate-400">
            {['Accueil', 'À propos', 'Expérience', 'Compétences', 'Projets', 'Contact'].map((item, i) => (
              <li key={i}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-purple-400 transition-colors inline-block hover:translate-x-1">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-lg text-white">Contact</h4>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-purple-400" />
              {CONFIG.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-purple-400" />
              {CONFIG.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap size={16} className="text-purple-400" />
              {CONFIG.personal.school}
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-slate-800 text-slate-400">
        <p>&copy; 2025 {CONFIG.personal.name}. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

// ============= SCROLL TO TOP =============
const ScrollToTop = ({ setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <button
      onClick={() => {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all duration-500 z-50 ${
        isVisible ? 'opacity-100 scale-100 hover:scale-110' : 'opacity-0 scale-0'
      }`}
    >
      <ChevronUp size={28} />
    </button>
  );
};

// ============= MAIN APP =============
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = {
    home: HeroSection,
    about: AboutSection,
    experience: ExperienceSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    contact: ContactSection
  };

  const ActiveComponent = sections[activeSection];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <ActiveComponent setActiveSection={setActiveSection} />
      <Footer />
      <ScrollToTop setActiveSection={setActiveSection} />
      
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-120deg); }
          66% { transform: translate(20px, -20px) rotate(-240deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 25s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 15s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-fade-in-scale { animation: fade-in-scale 1s ease-out both; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-gradient { animation: gradient 15s ease infinite; background-size: 200% 200%; }
        .animate-bounce { animation: bounce 2s infinite; }
        .animate-fade-in-delayed-2 { 
          animation: fade-in-up 0.8s ease-out 0.6s both; 
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #9333ea, #db2777); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #7c3aed, #be185d); }
        
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(168, 85, 247, 0.3); }
      `}</style>
    </div>
  );
};

export default Portfolio;