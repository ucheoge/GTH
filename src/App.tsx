/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import FellowshipView from './components/FellowshipView';
import ContactView from './components/ContactView';
import ApplicationPortal from './components/ApplicationPortal';
import { ActiveTab, FellowshipApplication } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, GraduationCap, X, Calendar, ClipboardCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [latestRegistration, setLatestRegistration] = useState<FellowshipApplication | null>(null);

  // Synchronized callback when apply is clicked
  const handleApplyNow = () => {
    setActiveTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronized callback when explore is clicked
  const handleExplorePrograms = () => {
    setActiveTab('fellowship');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('fellowship-tracks')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleApplicationSuccess = (app: FellowshipApplication) => {
    setLatestRegistration(app);
    setShowWelcomeModal(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-brand-green selection:text-white">
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onApplyClick={handleApplyNow} 
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <HomeView 
                setActiveTab={setActiveTab} 
                onExplorePrograms={handleExplorePrograms} 
              />
            )}
            {activeTab === 'about' && (
              <AboutView 
                setActiveTab={setActiveTab} 
              />
            )}
            {activeTab === 'fellowship' && (
              <FellowshipView 
                onSuccess={handleApplicationSuccess} 
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'portal' && (
              <ApplicationPortal />
            )}
            {activeTab === 'contact' && (
              <ContactView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* SUCCESS ADMISSION WELCOME MODAL */}
      <AnimatePresence>
        {showWelcomeModal && latestRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWelcomeModal(false)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#111622] border border-brand-green/30 rounded-2xl p-6 sm:p-8 text-left shadow-2xl overflow-hidden z-10"
            >
              {/* Decorative top strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green to-brand-teal" />
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-green/10 blur-2xl rounded-full" />

              <button
                onClick={() => setShowWelcomeModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-brand-green/20 rounded-xl text-brand-green shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-green font-semibold uppercase tracking-wider block">GTH FELLOWSHIP PORTAL</span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">Admission Ticket Issued</h3>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-dark border border-white/5 space-y-3 font-sans text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2 text-xs text-slate-400 font-mono">
                    <span>REGISTRY ID: {latestRegistration.id}</span>
                    <span className="text-brand-green font-bold">STATUS: RECEIVED</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Candidate Name</span>
                    <span className="font-display font-bold text-base text-white">{latestRegistration.fullName}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Assigned Career Specialization</span>
                    <span className="font-display font-bold text-sm text-brand-teal">{latestRegistration.preferredTrack}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Submit Date</span>
                    <span className="text-xs text-slate-300 block">{latestRegistration.submittedAt}</span>
                  </div>
                </div>

                <div className="space-y-3 text-slate-300 font-sans text-sm leading-relaxed">
                  <p>
                    Congratulations! Your fellowship application has been recorded in our database. Our administrative counselors are reviewing your motivation statement:
                  </p>
                  <p className="italic text-xs text-slate-400 pl-3 border-l-2 border-brand-teal bg-white/5 py-2.5 rounded-r-lg pr-2">
                    "{latestRegistration.motivation}"
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    An email containing the short GTH Passion Assessment & schedule dates has been dispatched to <strong>{latestRegistration.email}</strong>. Please ensure to check your spam/junk folder if not received in 5 minutes.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowWelcomeModal(false)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-teal text-white font-display font-semibold text-center hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Go to My Applications List
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
