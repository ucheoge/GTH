import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  BatteryCharging, 
  Cpu, 
  Bot, 
  Calendar, 
  Map, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Send,
  Sparkles,
  ClipboardList,
  Loader2,
  Trash2,
  UserCheck
} from 'lucide-react';
import { ActiveTab, Track, FellowshipApplication } from '../types';
import fellowshipLearning from '../assets/images/fellowship_learning_1783853330047.jpg';

interface FellowshipViewProps {
  onSuccess: (app: FellowshipApplication) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function FellowshipView({ onSuccess, setActiveTab }: FellowshipViewProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>('solar');
  const [applications, setApplications] = useState<FellowshipApplication[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastSubmittedName, setLastSubmittedName] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: 'Enugu',
    educationalBackground: 'B.Sc/B.Eng/HND',
    preferredTrack: 'Solar Inverter & Power Electronics',
    motivation: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load registered applications from local storage
  useEffect(() => {
    const saved = localStorage.getItem('gth_applications');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved applications');
      }
    }
  }, []);

  const tracks: Track[] = [
    {
      id: 'solar',
      title: 'Solar Inverter & Power Electronics',
      description: 'Acquire high-grade engineering competencies to manufacture, install, diagnostic and maintain commercial solar hardware.',
      learnPoints: [
        'Inverter production lines & board troubleshooting',
        'Commercial sizing, capacity loads, and diagnostics',
        'Deep solar systems engineering and grid synchronizations',
        'Safety regulations and installation management standards'
      ],
      duration: '6 Months (Immersive)',
      equipment: ['Industrial Oscilloscopes', 'High-Load Electronic Testers', 'SMD Solder Stations'],
      careers: ['Inverter Assembly Specialist', 'Solar Systems Integrator', 'Power Grid Technician']
    },
    {
      id: 'ev',
      title: 'Electric Vehicle Systems',
      description: 'Master EV architecture, lithium battery pack configurations, electric motor retrofitting, and custom automotive repairs.',
      learnPoints: [
        'Electric powertrain retrofitting from internal combustion engines',
        'State-of-health diagnostics for electric motors & controls',
        'Lithium-ion Battery Management Systems (BMS) architectures',
        'Cooling networks and dynamic EV load calculations'
      ],
      duration: '6 Months (Immersive)',
      equipment: ['EV OBD Scanners', 'Lithium Cell Balancers', 'High-current busbar welders'],
      careers: ['EV Conversion Technician', 'Battery Pack Assembler', 'Automotive Diagnostics Specialist']
    },
    {
      id: 'repair',
      title: 'Power Electronics Repair',
      description: 'Gain specialized technical skills to fault-find and remediate core component failures inside advanced grid power gear.',
      learnPoints: [
        'Advanced board troubleshooting and component desoldering',
        'Microcircuit diagnostics and schematic reading',
        'Transformer and inductor rewinding configurations',
        'Power factor correction and surge dampener diagnostic tests'
      ],
      duration: '6 Months (Immersive)',
      equipment: ['Thermal Vision Cameras', 'Microscope stations', 'Logic analyzers'],
      careers: ['Diagnostics Analyst', 'Electronics QA Specialist', 'Systems Reclamation Engineer']
    },
    {
      id: 'robotics',
      title: 'Robotics & Automation',
      description: 'Implement cyber-physical systems, automated machinery networks, sensor controls, and Internet of Things (IoT) field protocols.',
      learnPoints: [
        'Microcontroller coding & sensor mesh topologies',
        'LoraWAN, Bluetooth, and cellular IoT hardware configurations',
        'Industrial Programmable Logic Controllers (PLC) mapping',
        'Actuator calibrations & pneumatic process loops'
      ],
      duration: '6 Months (Immersive)',
      equipment: ['ARM-Cortex Microcontrollers', 'Pneumatic loops', 'Industrial PLC kits'],
      careers: ['Automation Field Architect', 'IoT Hardware Installer', 'Industrial Robotics Operator']
    },
    {
      id: 'solar-installation',
      title: 'Solar Installation',
      description: 'Acquire practical, industry-aligned expertise in photovoltaic system design, structural mounting, wiring configurations, and grid integration.',
      learnPoints: [
        'Photovoltaic solar module mounting & safety protocols',
        'DC/AC electrical system wiring, conduit runs, and grounding',
        'Inverter, charge controller, and deep-cycle battery configuration',
        'System testing, site assessment audits, and peak load balancing'
      ],
      duration: '3 Months (Core Practical)',
      equipment: ['Digital Multimeters', 'Crimping Tools', 'Conduit Benders', 'Roof-mounting structural kits'],
      careers: ['Solar Installation Technician', 'Field Operational Foreman', 'PV Systems Inspector']
    },
    {
      id: 'energy-management',
      title: 'Energy Management',
      description: 'Master resource auditing, energy-efficiency methodologies, power analytics systems, and industrial green transition strategies.',
      learnPoints: [
        'Energy load profiling, structural auditing, and efficiency tracking',
        'Smart metering infrastructure & cloud power analytics integrations',
        'Peak demand management, power factor correction, and load shifting',
        'Regulatory environmental compliance and green utility strategies'
      ],
      duration: '3 Months (Analytic & Practice)',
      equipment: ['Smart Power Analyzers', 'Data loggers', 'Infrared Thermometers'],
      careers: ['Energy Conservation Auditor', 'Green Energy Analyst', 'Facility Resource Manager']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.length < 8) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.motivation.trim()) {
      errors.motivation = 'Please share your motivation statement';
    } else if (formData.motivation.length < 20) {
      errors.motivation = 'Motivation statement should be at least 20 characters';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to errors
      document.getElementById('application-form-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate server delays
    setTimeout(() => {
      const newApp: FellowshipApplication = {
        id: `GTH-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        educationalBackground: formData.educationalBackground,
        preferredTrack: formData.preferredTrack,
        motivation: formData.motivation,
        submittedAt: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Received'
      };

      const updated = [newApp, ...applications];
      setApplications(updated);
      localStorage.setItem('gth_applications', JSON.stringify(updated));

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        state: 'Enugu',
        educationalBackground: 'B.Sc/B.Eng/HND',
        preferredTrack: formData.preferredTrack, // keep track selected
        motivation: ''
      });

      setLastSubmittedName(newApp.fullName);
      setIsSubmitting(false);
      setShowSuccessToast(true);
      onSuccess(newApp);

      // Scroll to dashboard to review submission status
      setTimeout(() => {
        document.getElementById('applications-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      // Clear toast after 5s
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);

    }, 1500);
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem('gth_applications', JSON.stringify(updated));
  };

  const handleSelectTrackTab = (trackId: string, trackTitle: string) => {
    setSelectedTrack(trackId);
    setFormData(prev => ({ ...prev, preferredTrack: trackTitle }));
  };

  const activeTrackObj = tracks.find(t => t.id === selectedTrack) || tracks[0];

  return (
    <div id="fellowship-view-container" className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section id="fellowship-hero" className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        {/* grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-green/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider font-display">
                SIX-MONTH RESIDENCY PROGRAM
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                Green Workforce<br />
                <span className="bg-gradient-to-r from-brand-green via-brand-teal to-emerald-400 bg-clip-text text-transparent">
                  Fellowship
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-sans max-w-2xl leading-relaxed">
                Training Africa's Next Generation of Solar, EV and Automation Professionals. Direct paths into industry employment and technical venture creation.
              </p>
              
              <div className="pt-2">
                <button
                  id="fellowship-apply-now"
                  onClick={() => {
                    setActiveTab('portal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-brand-green to-brand-teal shadow-lg hover:shadow-brand-green/30 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Right generated image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video max-w-md mx-auto group">
                <img
                  src={fellowshipLearning}
                  alt="Fellowship engineers assembling electronics"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#121C2B] border-2 border-brand-green px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 text-left w-11/12 max-w-md"
          >
            <div className="p-2 bg-brand-green/20 rounded-full text-brand-green">
              <CheckCircle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Application Received!</h4>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Excellent, <strong>{lastSubmittedName}</strong>. Your fellowship application has been recorded. Check its progress below.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROGRAM OVERVIEW */}
      <section id="fellowship-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-12 rounded-2xl bg-brand-gray/40 border border-white/5 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display font-bold text-xs text-brand-green uppercase tracking-wider">Academics & Operations</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              Comprehensive Hardware Residency
            </h2>
            <div className="w-12 h-1 bg-brand-green rounded" />
          </div>

          <div className="lg:col-span-7 text-slate-300 font-sans text-base leading-relaxed space-y-4">
            <p>
              The Green Workforce Fellowship is a practical six-month training-to-employment program designed to equip young people with industry-relevant technical skills and direct pathways into employment or entrepreneurship.
            </p>
            <p>
              Participants gain hands-on experience in real-world projects, manufacturing environments, field deployments, and innovation activities.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TRACKS */}
      <section id="fellowship-tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-xs text-brand-green uppercase tracking-wider">SPECIALIZATION TRACKS</span>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">Choose Your Specialization</h2>
          <p className="text-slate-400 text-sm font-sans">
            Our curriculum divides into four highly targeted hardware residency tracks. Select a track to inspect details:
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          {tracks.map((track) => (
            <button
              key={track.id}
              id={`track-tab-${track.id}`}
              onClick={() => handleSelectTrackTab(track.id, track.title)}
              className={`px-5 py-3 rounded-xl font-display text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedTrack === track.id
                  ? 'bg-gradient-to-r from-brand-green to-brand-teal text-white shadow-md'
                  : 'bg-white/5 text-slate-300 border border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {track.title.split(' & ')[0]}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#121824] to-[#0A0E17] border border-white/10 text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-4 right-4 w-32 h-32 bg-brand-green/5 blur-2xl rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-brand-green uppercase tracking-wider font-display">Specialty Details</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {activeTrackObj.title}
              </h3>
              
              <p className="text-slate-300 font-sans text-base leading-relaxed">
                {activeTrackObj.description}
              </p>

              <div className="space-y-3 pt-2">
                <span className="font-display font-bold text-xs text-white uppercase tracking-wider block">WHAT YOU WILL MASTER</span>
                <ul className="space-y-2">
                  {activeTrackObj.learnPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar metadata */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-white/5 border border-white/5 space-y-6">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">TRACK DURATION</span>
                <span className="font-display font-bold text-sm text-brand-green">{activeTrackObj.duration}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">EQUIPMENT USED</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrackObj.equipment.map((eq, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-brand-dark border border-white/10 text-xs font-mono text-slate-300">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">CAREER ROLES IN VIEW</span>
                <div className="space-y-1.5">
                  {activeTrackObj.careers.map((car, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-center space-x-2 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                      <span>{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id="select-this-track"
                onClick={() => {
                  localStorage.setItem('gth_preselected_track', activeTrackObj.title);
                  setActiveTab('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-brand-green/10 border border-brand-green/30 rounded-xl font-display font-semibold text-xs sm:text-sm text-brand-green hover:bg-brand-green hover:text-white transition-all cursor-pointer"
              >
                <span>Select & apply for this track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="fellowship-timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="font-display font-bold text-xs text-brand-green uppercase tracking-wider">MONTHLY MILESTONES</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Fellowship Pathway Timeline</h2>
          <div className="w-12 h-1 bg-brand-green mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-brand-gray/30 border border-white/5 text-left space-y-3 relative group hover:border-brand-green/20 transition-all duration-300">
            <span className="text-brand-green font-display font-bold text-3xl">01</span>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-white text-base">Classroom Residency</h4>
              <span className="text-[10px] text-brand-teal uppercase tracking-wider font-semibold block">Month 1</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Technical foundations, electronic circuit theory, schematics review, and software layouts in a structured auditorium.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-brand-gray/30 border border-white/5 text-left space-y-3 relative group hover:border-brand-teal/20 transition-all duration-300">
            <span className="text-brand-teal font-display font-bold text-3xl">02</span>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-white text-base">Practice Residency</h4>
              <span className="text-[10px] text-brand-teal uppercase tracking-wider font-semibold block">Month 2</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Hands-on laboratory residency, physical board assembly, high-temperature soldering, and diagnostics workouts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-brand-gray/30 border border-white/5 text-left space-y-3 relative group hover:border-brand-green/20 transition-all duration-300">
            <span className="text-brand-green font-display font-bold text-3xl">03</span>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-white text-base">Field Placement</h4>
              <span className="text-[10px] text-brand-teal uppercase tracking-wider font-semibold block">Months 3-5</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Practical industry placements, commercial solar farm deployment setups, and EV retrofitting under field supervisors.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-brand-gray/30 border border-white/5 text-left space-y-3 relative group hover:border-brand-teal/20 transition-all duration-300">
            <span className="text-brand-teal font-display font-bold text-3xl">04</span>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-white text-base">Graduation</h4>
              <span className="text-[10px] text-brand-teal uppercase tracking-wider font-semibold block">Month 6</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Active career placements matching via Power Ring, startup capital mentorship, and official credential certificate graduation.
            </p>
          </div>
        </div>
      </section>

      {/* TWO PATHWAYS - SPLIT SCREEN */}
      <section id="two-pathways" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="font-display font-bold text-xs text-brand-green uppercase tracking-wider font-semibold">DOUBLE CAREER TUNNELS</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Two Pathways to Sustainable Livelihood</h2>
          <div className="w-12 h-1 bg-brand-green mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employment */}
          <div className="p-8 rounded-2xl bg-gradient-to-tr from-[#121824] to-brand-dark border border-white/5 text-left space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Pathway A — Employment</h3>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                We directly connect our credentialed graduates to leading organizations inside the West African green economy:
              </p>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Solar Energy & Battery Operators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Electric Vehicle assembly hubs & fleets</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Automation & smart diagnostics providers</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">TARGET OUTCOME</span>
              <span className="font-display font-bold text-sm text-white">80% active career placement within 60 days of graduation.</span>
            </div>
          </div>

          {/* Entrepreneurship */}
          <div className="p-8 rounded-2xl bg-gradient-to-tr from-[#121824] to-brand-dark border border-white/5 text-left space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Pathway B — Entrepreneurship</h3>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                For graduates with high leadership motivation, we support the launch of customized local grid repair or sizing agencies:
              </p>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Launch regional inverter service shops</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Become registered installer teams</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Access private Power Ring procurement pools</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">TARGET OUTCOME</span>
              <span className="font-display font-bold text-sm text-white">Creation of next-generation local employers and founders.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & STEP BY STEP */}
      <section id="eligibility-steps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Eligibility */}
          <div className="p-8 rounded-2xl bg-brand-gray border border-white/5 text-left space-y-6">
            <h3 className="font-display font-bold text-2xl text-white">Fellowship Eligibility</h3>
            <p className="text-slate-400 text-sm font-sans leading-relaxed">
              We seek candidates with high potential, regardless of prior vocational credentials. Our standard criteria includes:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-slate-300 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                <span>Deep passion for electronics, sustainability, or practical climate solutions.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                <span>Basic digital literacy (ability to navigate standard software/browsers).</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                <span>Commitment to complete the entire 6-month hands-on curriculum residency.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                <span>Interest in hardware prototyping, EV mechanics, or advanced inverter repair.</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-brand-green/10 border border-brand-green/20 text-xs font-display font-semibold text-brand-green">
              ⚡ NO PRIOR TECHNICAL EXPERIENCE REQUIRED — WE TEACH YOU FROM SCRATCH.
            </div>
          </div>

          {/* Application Steps */}
          <div className="space-y-6 text-left">
            <h3 className="font-display font-bold text-2xl text-white">How To Join</h3>
            <p className="text-slate-400 text-sm font-sans">
              Our streamlined screening cycle ensures candidate motivation aligns with GTH:
            </p>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Submit Application', desc: 'Complete the motivation form below with your track choice.' },
                { step: '2', title: 'Screening & Assessment', desc: 'Short digital literacy and passion assessment sent via email.' },
                { step: '3', title: 'Interview', desc: '30-minute conversation with GTH administrative educators.' },
                { step: '4', title: 'Admission', desc: 'Official admission letter with lab schedules.' },
                { step: '5', title: 'Begin Fellowship', desc: 'Attend orientation and begin your technical career residency!' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-xs text-brand-green shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">{item.title}</h5>
                    <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
