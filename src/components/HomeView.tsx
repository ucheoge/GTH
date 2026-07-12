import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  BatteryCharging, 
  Cpu, 
  Bot, 
  Globe, 
  LineChart, 
  ArrowRight, 
  CheckCircle,
  GraduationCap,
  Hammer,
  Rocket,
  Shield,
  Briefcase
} from 'lucide-react';
import { ActiveTab, Sector } from '../types';
import heroBanner from '../assets/images/greenage_hero_banner_1783853314702.jpg';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onExplorePrograms: () => void;
}

// Custom hook/component to animate stats on mount
function AnimatedStat({ value, suffix = '', duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (value - startValue) + startValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  // Format numbers nicely
  const formattedCount = count.toLocaleString();

  return (
    <span className="font-display font-bold text-4xl lg:text-5xl text-white tracking-tight bg-gradient-to-r from-white to-brand-green bg-clip-text text-transparent">
      {formattedCount}{suffix}
    </span>
  );
}

export default function HomeView({ setActiveTab, onExplorePrograms }: HomeViewProps) {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const sectors: Sector[] = [
    {
      id: 'renewable',
      title: 'Renewable Energy',
      description: 'Solar design, installation and maintenance.',
      iconName: 'Zap',
      details: ['Photovoltaic system sizing', 'Lithium battery energy storage', 'Field operations & load audits', 'Inverter synchronizations']
    },
    {
      id: 'ev',
      title: 'Electric Vehicles',
      description: 'EV retrofitting, maintenance and diagnostics.',
      iconName: 'BatteryCharging',
      details: ['Electric motor retrofitting', 'Battery management systems (BMS)', 'Powertrain integration', 'State-of-health diagnostics']
    },
    {
      id: 'power-electronics',
      title: 'Power Electronics',
      description: 'Inverters, batteries and advanced electronics systems.',
      iconName: 'Cpu',
      details: ['PCB assembly & soldering', 'Microcontroller programming', 'Hardware debugging & prototyping', 'Power factor correction']
    },
    {
      id: 'robotics',
      title: 'Robotics & Automation',
      description: 'Smart systems, IoT and industrial automation.',
      iconName: 'Bot',
      details: ['Industrial IoT integrations', 'Sensor networks (LoraWAN)', 'Embedded system diagnostics', 'Programmable Logic Controllers (PLC)']
    },
    {
      id: 'climate',
      title: 'Climate Innovation',
      description: 'Solutions for sustainability and energy transition.',
      iconName: 'Globe',
      details: ['Carbon offsetting projects', 'Circular economy processes', 'Waste-to-energy technologies', 'Smart agriculture hardware']
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship',
      description: 'Supporting future founders and green enterprises.',
      iconName: 'LineChart',
      details: ['Venture-backed frameworks', 'Service delivery models', 'Access to green funding pools', 'Incubation & mentorship workspace']
    },
  ];

  // Map icon names to Lucide icon components
  const renderSectorIcon = (iconName: string) => {
    const iconClass = "w-8 h-8 text-brand-green group-hover:text-brand-teal transition-colors duration-300";
    switch (iconName) {
      case 'Zap': return <Zap className={iconClass} />;
      case 'BatteryCharging': return <BatteryCharging className={iconClass} />;
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'Bot': return <Bot className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      case 'LineChart': return <LineChart className={iconClass} />;
      default: return <Zap className={iconClass} />;
    }
  };

  const partners = [
    { name: 'Greenage Technologies', desc: '100MW solar manufacturing partner', logoText: 'GT', subtitle: 'Manufacturing Partner' },
    { name: 'Power Ring Technologies', desc: 'Marketplace & jobs connector', logoText: 'PR', subtitle: 'Workforce Partner' },
    { name: 'Enugu State Government', desc: 'Public sector & funding sponsor', logoText: 'ENS', subtitle: 'Strategic Sponsor' },
    { name: 'Solaris Green Tech Hub', desc: 'Incubation & climate lab', logoText: 'SG', subtitle: 'Ecosystem Partner' },
    { name: 'University of Nigeria UNESCO-UNEVOC Centre', desc: 'Vocational validation center', logoText: 'UN', subtitle: 'Academic Validator' },
  ];

  return (
    <div id="home-view-container" className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section 
        id="home-hero"
        className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-dark"
      >
        {/* Animated Background Gradients & Grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-teal/10 blur-[180px] rounded-full pointer-events-none" />
        
        {/* Diagonal Light Accent Beam */}
        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-brand-green/5 via-brand-teal/5 to-transparent skew-x-12 transform-gpu pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold tracking-wider uppercase font-display"
              >
                <span className="flex h-2 w-2 rounded-full bg-brand-green animate-ping" />
                <span>Empowering Africa's Hardware Pioneers</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
              >
                Build Skills.<br />
                <span className="bg-gradient-to-r from-brand-green via-brand-teal to-emerald-400 bg-clip-text text-transparent">
                  Expand Possibilities.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans leading-relaxed max-w-2xl"
              >
                Greenage Talent Hub equips Africa's next generation of climate innovators, solar technicians, hardware engineers, and entrepreneurs with practical skills that power sustainable development.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <button
                  id="hero-primary-cta"
                  onClick={() => {
                    setActiveTab('portal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-brand-green to-brand-teal text-center shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  Apply for Fellowship
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={onExplorePrograms}
                  className="px-8 py-4 rounded-xl font-display font-semibold text-slate-200 bg-white/5 border border-white/10 text-center hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Explore Programs
                </button>
              </motion.div>
            </div>

            {/* Hero Right Visual Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 aspect-video lg:aspect-[4/5] max-w-lg mx-auto group">
                {/* Embedded generated image with proper referral rule */}
                <img
                  src={heroBanner}
                  alt="Modern clean-energy hardware technical workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                
                {/* Overlay floating micro-card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-brand-dark/80 backdrop-blur-md border border-white/10 flex items-center space-x-4">
                  <div className="p-3 bg-brand-green/20 rounded-lg text-brand-green">
                    <Shield className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">ISO & UNESCO standards</div>
                    <div className="font-sans text-xs text-slate-400">Integrated practical lab framework</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section id="who-we-are" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-16 rounded-3xl bg-gradient-to-b from-brand-gray to-brand-dark border border-white/5 relative overflow-hidden shadow-2xl">
          {/* subtle decoration */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-teal/10 blur-2xl rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">WHO WE ARE</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Creating Africa's Green Workforce
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-brand-green to-brand-teal rounded" />
            </div>

            <div className="lg:col-span-7 space-y-6 text-left text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                Greenage Talent Hub is an immersive climate and hardware technology learning ecosystem that transforms young people into employable innovators capable of building the infrastructure of Africa's green future.
              </p>
              <p>
                We combine practical training, industry partnerships, mentorship, and entrepreneurship support to create pathways into employment and business creation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">Industrial Synergies</h4>
                    <p className="text-xs text-slate-400">Direct access to commercial solar electronics factories.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">Mentorship Matching</h4>
                    <p className="text-xs text-slate-400">Personal guidance from executive engineers and founders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">IMPACT IN NUMBERS</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Our Contribution to Africa's Transformation
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base">
            GTH works diligently alongside community, corporate, and governmental networks to catalog real human and environmental impact across West Africa.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center space-y-2 group hover:border-brand-green/30 transition-all duration-300">
            <AnimatedStat value={120} suffix="+" />
            <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">Youths Trained</span>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center space-y-2 group hover:border-brand-green/30 transition-all duration-300">
            <AnimatedStat value={100} suffix="MW" />
            <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">Factory Synergy</span>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center space-y-2 group hover:border-brand-teal/30 transition-all duration-300">
            <AnimatedStat value={80} suffix="%" />
            <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">Placement Rate</span>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center space-y-2 group hover:border-brand-green/30 transition-all duration-300">
            <AnimatedStat value={500} suffix="" />
            <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">Fellows/Cohort</span>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center space-y-2 group hover:border-brand-teal/30 transition-all duration-300">
            <AnimatedStat value={2} suffix="" />
            <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">Career Paths</span>
          </div>
        </div>
      </section>

      {/* SECTORS WE WORK IN */}
      <section id="sectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-left max-w-xl">
            <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase font-semibold">Sectors We Work In</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Essential Fields of Green Technology
            </h2>
          </div>
          <p className="text-slate-400 font-sans max-w-md text-left text-sm sm:text-base">
            Our curriculum and labs map directly to key employment sectors with immense growth and technical talent deficits across Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              id={`sector-card-${sector.id}`}
              onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
              className={`p-8 rounded-2xl bg-brand-gray/50 border transition-all duration-300 text-left flex flex-col justify-between space-y-6 cursor-pointer group ${
                activeSector === sector.id
                  ? 'border-brand-green/80 shadow-lg shadow-brand-green/10 bg-brand-gray'
                  : 'border-white/5 hover:border-white/10 hover:bg-brand-gray/80 shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green/10">
                  {renderSectorIcon(sector.iconName)}
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-green transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="text-slate-400 text-sm font-sans leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Expandable detailed tags */}
              <div className="pt-2">
                {activeSector === sector.id ? (
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <span className="font-display font-bold text-xs text-brand-green uppercase tracking-wide">Key Topics Covered:</span>
                    <ul className="space-y-1">
                      {sector.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-brand-green flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Click to reveal topics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE CREATE IMPACT */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">OUR METHODOLOGY</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            How We Create Lasting Impact
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base">
            Our three-stage training pipeline bridges the gap between academic theory and real industrial execution.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Desktop timeline connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-green/20 via-brand-teal/20 to-transparent -translate-y-12 z-0" />

          {/* Learn Step */}
          <div className="relative z-10 bg-[#121824] border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 items-center lg:items-start text-center lg:text-left group hover:border-brand-green/20 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-green to-emerald-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-lg shadow-brand-green/10">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-brand-green font-display font-bold text-xs tracking-wide uppercase">Stage 01</span>
              <h3 className="font-display font-bold text-xl text-white">Learn</h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Hands-on core technical training using real high-grade commercial equipment and standard laboratory software tools.
              </p>
            </div>
          </div>

          {/* Build Step */}
          <div className="relative z-10 bg-[#121824] border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 items-center lg:items-start text-center lg:text-left group hover:border-brand-teal/20 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-teal to-cyan-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-lg shadow-brand-teal/10">
              <Hammer className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-brand-teal font-display font-bold text-xs tracking-wide uppercase">Stage 02</span>
              <h3 className="font-display font-bold text-xl text-white">Build</h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Work on genuine field deployments, diagnostic runs, prototype tests, and production loops under professional supervision.
              </p>
            </div>
          </div>

          {/* Launch Step */}
          <div className="relative z-10 bg-[#121824] border border-white/5 p-8 rounded-2xl flex flex-col space-y-4 items-center lg:items-start text-center lg:text-left group hover:border-brand-green/20 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-green via-emerald-600 to-brand-teal text-white font-display font-bold text-xl flex items-center justify-center shadow-lg shadow-brand-green/10">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-brand-green font-display font-bold text-xs tracking-wide uppercase">Stage 03</span>
              <h3 className="font-display font-bold text-xl text-white">Launch</h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Deploy with industry partners for active employment placements or establish climate-focused business enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section id="partners-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase font-semibold">Our Partnerships</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Collaborating with Industry Leaders & Public Sponsors
          </h2>
          <div className="w-12 h-1 bg-brand-green mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              id={`partner-card-${index}`}
              className="p-6 rounded-xl bg-[#111827]/40 border border-white/5 hover:border-brand-green/20 hover:bg-[#111827]/80 hover:translate-y-[-2px] transition-all duration-300 text-left flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-green/20 to-brand-teal/20 text-brand-green group-hover:text-white group-hover:from-brand-green group-hover:to-brand-teal flex items-center justify-center font-display font-bold text-sm transition-all duration-300 shrink-0">
                  {partner.logoText}
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white line-clamp-1">{partner.name}</h4>
                  <span className="text-[10px] text-brand-green font-semibold tracking-wide block uppercase">{partner.subtitle}</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-normal">
                {partner.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 lg:p-16 rounded-3xl bg-gradient-to-tr from-brand-gray to-[#0E1524] border border-white/10 text-center space-y-8 overflow-hidden shadow-2xl">
          {/* grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-green/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-teal/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Ready to Build the Future?
            </h2>
            <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
              Join a new generation of climate innovators and technical professionals shaping Africa's green economy. No prior technical experience required.
            </p>
          </div>

          <div className="flex justify-center relative z-10 pt-2">
            <button
              id="cta-apply-button"
              onClick={() => {
                setActiveTab('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-10 py-4 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-brand-green to-brand-teal shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Apply for Fellowship
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
