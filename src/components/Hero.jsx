import React from 'react';
import { User, Rocket, Download, Star, ChevronDown } from 'lucide-react';
import { CONFIG } from '../../data/config';
import GradientText from '../ui/GradientText';
import CVButton from '../ui/CVButton';

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
export default HeroSection;
