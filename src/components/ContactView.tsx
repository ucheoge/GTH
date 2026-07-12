import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  Loader2, 
  CheckCircle, 
  MessageSquare, 
  Trash2, 
  Clock, 
  ShieldQuestion 
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Form fields state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load message logs from local storage
  useEffect(() => {
    const saved = localStorage.getItem('gth_contact_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved messages');
      }
    }
  }, []);

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
    if (!formData.name.trim()) errors.name = 'Your name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message content is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSending(true);

    // Simulate sending message to support desk
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submittedAt: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem('gth_contact_messages', JSON.stringify(updated));

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });

      setIsSending(false);
      setShowSuccessToast(true);

      // Hide toast
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);

    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('gth_contact_messages', JSON.stringify(updated));
  };

  return (
    <div id="contact-view-container" className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section id="contact-hero" className="relative pt-32 pb-16 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <span className="font-display font-bold text-xs tracking-wider text-brand-green uppercase">GET IN TOUCH</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Contact Greenage<br />
            <span className="bg-gradient-to-r from-brand-green via-brand-teal to-emerald-400 bg-clip-text text-transparent">
              Talent Hub
            </span>
          </h1>
          <p className="text-slate-300 font-sans text-base sm:text-lg max-w-xl mx-auto">
            We would love to hear from you. Reach out for fellowship questions, partnership requests, or administrative details.
          </p>
        </div>
      </section>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#121C2B] border-2 border-brand-teal px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 text-left w-11/12 max-w-md"
          >
            <div className="p-2 bg-brand-teal/20 rounded-full text-brand-teal">
              <CheckCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Thank you for contacting GTH. Your ticket was queued. Our support team will respond shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER (DETAILS + FORM) */}
      <section id="contact-core" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column (Col-5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl text-white">Our Administrative Office</h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Connect with GTH officers directly or drop by our partner testing facilities in Enugu State.
              </p>
            </div>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Location Address</span>
                  <span className="font-display font-bold text-base text-white">Enugu, Nigeria</span>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Operational adjacent to Greenage Electronics 100MW production grids.</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Phone Support</span>
                  <span className="font-display font-bold text-base text-white">+234 813 736 9642</span>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Mon - Fri: 8:00 AM - 5:00 PM (WAT)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Direct Email</span>
                  <a href="mailto:info@gth.ng" className="font-display font-bold text-base text-white hover:text-brand-green transition-colors">
                    info@gth.ng
                  </a>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">We reply to general inquiries within 24 hours.</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Official Domain</span>
                  <a href="http://www.gth.ng" target="_blank" rel="noreferrer" className="font-display font-bold text-base text-white hover:text-brand-green transition-colors">
                    www.gth.ng
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="p-5 rounded-xl bg-brand-gray border border-white/5 space-y-3">
              <div className="flex items-center space-x-2 text-brand-teal">
                <ShieldQuestion className="w-5 h-5" />
                <h4 className="font-display font-bold text-sm text-white">Looking for Fellowship?</h4>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                If you are a student or professional wishing to enroll, please use the structured enrollment builder inside the Fellowship tab instead of general contact.
              </p>
            </div>
          </div>

          {/* Form Column (Col-7) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-brand-gray border border-white/10 text-left space-y-8 shadow-xl">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-white">Send Us A Message</h3>
              <p className="text-xs text-slate-400 font-sans">
                Our operations coordinators are ready to field your requests.
              </p>
            </div>

            <form id="gth-contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-slate-300 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Amina Bello"
                    className={`w-full px-4 py-3 rounded-xl bg-brand-dark border font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      formErrors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:border-brand-green focus:ring-brand-green'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-400 font-medium">{formErrors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-slate-300 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. amina@gth.ng"
                    className={`w-full px-4 py-3 rounded-xl bg-brand-dark border font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      formErrors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:border-brand-green focus:ring-brand-green'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-400 font-medium">{formErrors.email}</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-display font-bold text-slate-300 uppercase tracking-wide">
                  Subject Category
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 font-sans text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership Proposal">Partnership Proposal</option>
                  <option value="Media & Press">Media & Press</option>
                  <option value="Sponsorship & Donations">Sponsorship & Donations</option>
                  <option value="Vocation Center Support">Vocation Center Technical Support</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-display font-bold text-slate-300 uppercase tracking-wide">
                  Message Content
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can our coordinators support you?"
                  className={`w-full px-4 py-3 rounded-xl bg-brand-dark border font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none ${
                    formErrors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/10 focus:border-brand-green focus:ring-brand-green'
                  }`}
                />
                {formErrors.message && (
                  <span className="text-[10px] text-red-400 font-medium">{formErrors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="submit-contact-message"
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-brand-green to-brand-teal shadow-md hover:brightness-110 disabled:brightness-75 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SUBMITTED MESSAGES LOG (TICKET HISTORY) */}
      {messages.length > 0 && (
        <section id="messages-history-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0E131C] border border-brand-teal/30 text-left space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-teal/10 rounded-xl text-brand-teal shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">My Support Tickets (Sent Logs)</h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Directly logs communication in local browser sandbox:</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-xs font-semibold text-brand-teal">
                {messages.length} Sent {messages.length === 1 ? 'Log' : 'Logs'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  id={`msg-item-${msg.id}`}
                  className="p-5 rounded-xl bg-brand-dark border border-white/5 hover:border-white/10 flex flex-col justify-between space-y-4 transition-all relative"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-teal">{msg.id}</span>
                      <button
                        id={`delete-msg-${msg.id}`}
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider">CATEGORY: {msg.subject}</span>
                      <h4 className="font-display font-bold text-white text-sm">{msg.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block">{msg.email}</span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#141A24] p-3 rounded-lg border border-white/5">
                      "{msg.message}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-slate-400">
                    <span className="flex items-center space-x-1 font-sans">
                      <Clock className="w-3 h-3 text-brand-teal" />
                      <span>{msg.submittedAt}</span>
                    </span>
                    <span className="text-brand-green font-semibold">Response Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
