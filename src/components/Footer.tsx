import React from 'react';
import { ActiveTab } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import GreenageLogo from './GreenageLogo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#080B0F] border-t border-white/5 pt-16 pb-8 text-slate-400 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div 
              id="footer-logo"
              className="flex items-center cursor-pointer inline-flex group"
              onClick={() => {
                setActiveTab('home');
                scrollToTop();
              }}
            >
              <GreenageLogo theme="dark" className="h-11" />
            </div>
            
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Equipping Africa's next generation of climate innovators, solar technicians, hardware engineers, and entrepreneurs with practical skills that power sustainable development.
            </p>

            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.linkedin.com/company/greenage-technologies/" 
                target="_blank" 
                rel="noreferrer" 
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com/greenagetechng" 
                target="_blank" 
                rel="noreferrer" 
                title="Twitter/X"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/greenagetechng" 
                target="_blank" 
                rel="noreferrer" 
                title="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-green pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); scrollToTop(); }}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); scrollToTop(); }}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('fellowship'); scrollToTop(); }}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Fellowship Program
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('portal'); scrollToTop(); }}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Admission Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('contact'); scrollToTop(); }}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-teal pl-3">
              Our Academies
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <span className="block text-white font-medium">Green Workforce Academy</span>
                <span className="text-xs text-slate-500">Solar, Electric Vehicles, Power Electronics & Robotics Tracks</span>
              </li>
              <li>
                <span className="block text-white font-medium">Innovation Lab</span>
                <span className="text-xs text-slate-500">Venture building, prototyping, climate solutions & hardware production</span>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-green pl-3">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>Enugu, Nigeria</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <span>+234 813 736 9642</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <a href="mailto:info@gth.ng" className="hover:text-white transition-colors">info@gth.ng</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-brand-green shrink-0" />
                <a href="http://www.gth.ng" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.gth.ng</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-display font-medium text-slate-500">Build Skills. Expand Possibilities.</span>
          </div>
          
          <p>© 2026 Greenage Talent Hub. All Rights Reserved. Built with indigenous commitment to African hardware innovation.</p>

          <button
            id="back-to-top-button"
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-brand-green hover:text-white transition-all duration-300 group cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
