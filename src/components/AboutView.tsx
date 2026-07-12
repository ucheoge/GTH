import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Target, 
  Sparkles, 
  Compass, 
  Users, 
  Lightbulb, 
  Hammer, 
  LineChart, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const approaches = [
    {
      title: 'Practical Skills Training',
      desc: 'Industry-based learning and real-world projects with professional laboratory kits.',
      icon: <Hammer className="w-6 h-6 text-brand-green" />
    },
    {
      title: 'Inclusive Access',
      desc: 'Creating opportunities for underserved communities, remote areas, and female participation.',
      icon: <Users className="w-6 h-6 text-brand-teal" />
    },
    {
      title: 'Climate Focus',
      desc: 'Training strictly aligned with renewable energy systems and sustainable decarbonized technology.',
      icon: <Sparkles className="w-6 h-6 text-brand-green" />
    },
    {
      title: 'Entrepreneurship Support',
      desc: 'Active business-development mentorship to support graduates to become employers and founders.',
      icon: <LineChart className="w-6 h-6 text-brand-teal" />
    },
  ];

  const partners = [
    {
      name: 'Greenage Technologies',
      desc: 'Renewable energy technology company operating a 100MW solar electronics manufacturing facility in Enugu, Nigeria.',
      badge: 'Manufacturing & Tech Hub',
      role: 'Core Practice Residency'
    },
    {
      name: 'Power Ring Technologies',
      desc: 'Digital energy marketplace, logistics pipeline, and direct workforce placement partner.',
      badge: 'Job Market Broker',
      role: 'Immediate Career Matching'
    },
    {
      name: 'Enugu State Government',
      desc: 'Public sector partner supporting localized technical workforce empowerment and youth development grants.',
      badge: 'Sponsor & Policy Partner',
      role: 'Civic Alignment & Scale'
    },
    {
      name: 'Solaris Green Tech Hub',
      desc: 'Climate innovation, mentorship networks, and clean-tech entrepreneurship incubation ecosystem.',
      badge: 'Incubator Network',
      role: 'Venture Incubation Support'
    },
    {
      name: 'University of Nigeria UNESCO-UNEVOC Centre',
      desc: 'Technical education and vocational training center validating curriculum credentials.',
      badge: 'Academic Validator',
      role: 'Curriculum Standardization'
    }
  ];

  return (
    <div id="about-view-container" className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section id="about-hero" className="relative pt-32 pb-16 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">ABOUT GREENAGE TALENT HUB</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Building Talent for<br />
            <span className="bg-gradient-to-r from-brand-green via-brand-teal to-emerald-400 bg-clip-text text-transparent">
              Africa's Green Future
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-green to-brand-teal mx-auto rounded-full" />
        </div>
      </section>

      {/* OUR STORY */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="font-display font-bold text-xs text-brand-green tracking-wider uppercase">HOW IT BEGAN</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">Our Story</h2>
            
            <div className="space-y-4 text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                Greenage Talent Hub was created at the intersection of two urgent realities:
              </p>
              <p className="border-l-4 border-brand-green pl-4 italic text-slate-200 bg-white/5 py-3 pr-3 rounded-r-xl">
                The global climate transition requires massive amounts of skilled technical talent, yet millions of energetic African youths remain disconnected from opportunities in emerging modern industries.
              </p>
              <p>
                Through immersive, hands-on learning, Greenage Talent Hub equips young people with the confidence and competence to build, repair, deploy and innovate solutions that power communities and create sustainable economic opportunity.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Elegant glowing frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-brand-teal/20 blur-xl opacity-30 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video bg-[#121824] p-2">
              <div className="w-full h-full rounded-xl bg-[#090D14] flex flex-col justify-center items-center p-8 text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="p-4 bg-brand-green/10 rounded-full text-brand-green">
                  <Building className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-lg text-white">Commercial Hardware Synergies</h4>
                  <p className="text-xs text-slate-400 font-sans max-w-sm">
                    GTH fellows do not just study in academic isolation. They operate alongside Greenage Technologies' commercial lines, exposing them directly to high-standard manufacturing environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision-mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#121824] to-brand-dark border border-white/5 space-y-6 text-left relative overflow-hidden group hover:border-brand-green/20 transition-all duration-300">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-green/10 blur-2xl rounded-full" />
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Our Vision</h3>
            <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
              To build a resilient society powered by skilled talent, sustainable solutions, and equal access to opportunity.
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#121824] to-brand-dark border border-white/5 space-y-6 text-left relative overflow-hidden group hover:border-brand-teal/20 transition-all duration-300">
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-brand-teal/10 blur-2xl rounded-full" />
            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Our Mission</h3>
            <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
              To unlock human potential through accessible technical and green skills training that promotes inclusion, expands possibilities, and supports sustainable livelihoods while advancing Africa's indigenous hardware industry.
            </p>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section id="our-approach" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">PILLARS OF SUCCESS</span>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">Our Strategic Approach</h2>
          <div className="w-12 h-0.5 bg-brand-green mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {approaches.map((item, index) => (
            <div
              key={index}
              id={`approach-card-${index}`}
              className="p-8 rounded-xl bg-[#111827]/30 border border-white/5 hover:border-brand-green/20 transition-all duration-300 text-left space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-sm font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROGRAMS */}
      <section id="our-programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">ACADEMIC PATHS</span>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">Core Program Offerings</h2>
          <p className="text-slate-400 text-sm font-sans">
            We operate two dynamic departments designed to serve both career-seekers and hardware entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Green Workforce Academy */}
          <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-b from-brand-gray to-brand-dark border border-white/10 text-left flex flex-col justify-between space-y-8 shadow-xl relative overflow-hidden group hover:border-brand-green/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green to-brand-teal" />
            
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold tracking-wide uppercase font-display inline-block">
                Workforce Development
              </span>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
                Green Workforce Academy
              </h3>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                A structured technical development platform that prepares young people for highly active roles in emerging green hardware fields:
              </p>
              
              <ul className="space-y-2 font-sans text-sm text-slate-400">
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span>Solar Energy & Battery Installation</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span>Power Electronics PCB Assembly</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span>Electric Vehicle Diagnostics & Retrofitting</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span>Robotics & IoT Workflows</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">TARGET OUTCOME</span>
                <span className="font-display font-bold text-sm text-white">Employment-Ready Technical Graduates</span>
              </div>
              <button
                id="view-workforce-academy"
                onClick={() => {
                  setActiveTab('fellowship');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-green hover:text-brand-teal group-hover:translate-x-1 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Academy Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Innovation Lab */}
          <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-b from-brand-gray to-brand-dark border border-white/10 text-left flex flex-col justify-between space-y-8 shadow-xl relative overflow-hidden group hover:border-brand-teal/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-green" />

            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-semibold tracking-wide uppercase font-display inline-block">
                Practical Incubation
              </span>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
                Innovation Lab
              </h3>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                A hands-on engineering lab and venture-building studio where advanced innovators build hardware solutions, test prototypes, and establish sustainable startups:
              </p>

              <ul className="space-y-2 font-sans text-sm text-slate-400">
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span>Build real hardware prototypes</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span>Develop targeted clean-tech solutions</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span>Test indigenous electrical designs</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span>Launch green hardware ventures</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">TARGET OUTCOME</span>
                <span className="font-display font-bold text-sm text-white">Job Creators & Venture Founders</span>
              </div>
              <button
                id="view-innovation-lab"
                onClick={() => {
                  setActiveTab('fellowship');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-teal hover:text-brand-green group-hover:translate-x-1 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Lab Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PARTNERS DETAIL */}
      <section id="our-partners-detail" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">INTEGRATED COALITION</span>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">Our Ecosystem Partners</h2>
          <p className="text-slate-400 text-sm font-sans">
            How we integrate with industrial, financial, and regulatory frameworks to secure genuine opportunities for our fellows.
          </p>
        </div>

        <div className="space-y-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              id={`partner-row-${index}`}
              className="p-6 sm:p-8 rounded-2xl bg-[#111827]/40 border border-white/5 hover:border-brand-green/20 hover:bg-[#111827]/80 transition-all duration-300 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
            >
              <div className="space-y-2 md:max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-brand-green transition-colors duration-200">
                    {partner.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-sans font-medium text-slate-400 uppercase tracking-wider">
                    {partner.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-sans leading-relaxed">
                  {partner.desc}
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0 md:text-right border-t md:border-t-0 border-white/5 pt-4 md:pt-0 flex md:flex-col justify-between items-center md:items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">ROLE IN FELLOWSHIP</span>
                <span className="font-display font-bold text-xs text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-lg border border-brand-teal/20">
                  {partner.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
