import { useState } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, TrendingUp, Users, Zap, Mail, MessageSquare, Target, BarChart3, Home, Scissors, ShoppingBag, Sparkles } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      business: formData.get('business') as string,
      listSize: formData.get('listSize') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-emerald-400">Lukra</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-emerald-400 transition">Home</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-emerald-400 transition">How It Works</button>
              <button onClick={() => scrollToSection('industries')} className="text-gray-300 hover:text-emerald-400 transition">Industries</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-emerald-400 transition">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-emerald-400 transition">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-emerald-400 transition">Contact</button>
              <a
                href="https://calendly.com/hello-lukraai/introduction-call"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition"
              >
                Book a Call
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-emerald-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-slate-800">
              <button onClick={() => scrollToSection('home')} className="block text-gray-300 hover:text-emerald-400 transition">Home</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block text-gray-300 hover:text-emerald-400 transition">How It Works</button>
              <button onClick={() => scrollToSection('industries')} className="block text-gray-300 hover:text-emerald-400 transition">Industries</button>
              <button onClick={() => scrollToSection('pricing')} className="block text-gray-300 hover:text-emerald-400 transition">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="block text-gray-300 hover:text-emerald-400 transition">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-emerald-400 transition">Contact</button>
              <a
                href="https://calendly.com/hello-lukraai/introduction-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition text-center"
              >
                Book a Call
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Turn your old customer list into new revenue using AI.
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Lukra uses AI-powered email and SMS campaigns to revive past customers, old estimates, and forgotten leads — and turn them into booked jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://calendly.com/hello-lukraai/introduction-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-8 py-4 rounded-lg font-semibold transition inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Book a 15-minute strategy call
                  <ArrowRight size={20} />
                </a>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-4 rounded-lg font-semibold transition whitespace-nowrap"
                >
                  See how it works
                </button>
              </div>
              <p className="text-sm text-gray-400">
              
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/20 p-3 rounded-lg">
                    <TrendingUp className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">1,200 dormant contacts</div>
                    <div className="text-gray-300">→ 37 booked jobs</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/20 p-3 rounded-lg">
                    <BarChart3 className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">$54,800</div>
                    <div className="text-gray-300">in recovered revenue from one campaign</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Built for service businesses with big lists and busy owners.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              If you've been in business for a few years, you probably have thousands of contacts sitting in your CRM or spreadsheets. Lukra turns that list into a repeatable revenue engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500 transition">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Home className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Home Services</h3>
              <p className="text-gray-300">
                HVAC, roofing, insulation, spray foam, plumbing, electrical, landscaping, pest control, and more.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500 transition">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Service Businesses</h3>
              <p className="text-gray-300">
                Garage doors, window cleaning, flooring, painting, pool service, and other high-trust local services.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500 transition">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Med Spas & Wellness</h3>
              <p className="text-gray-300">
                Med spas, salons, gyms, and clinics that rely on repeat visits and special promotions.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500 transition">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">E-commerce Brands</h3>
              <p className="text-gray-300">
                Past customers, abandoned carts, and old subscribers reactivated with AI-driven flows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              How Lukra works in four simple steps.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We plug into the lists you already have, build AI-personalized campaigns, and track every dollar we help you generate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Audit & Clean Your List</h3>
                  <p className="text-gray-300">
                    We import your contacts from your CRM or spreadsheet, remove duplicates and obvious junk, and segment by past customers, leads, and cold inquiries.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Craft Offers That Convert</h3>
                  <p className="text-gray-300">
                    We collaborate with you to create simple, compelling offers: "We miss you" campaigns, tune-ups, seasonal promos, maintenance plans, re-quote outreach, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Launch AI-Powered Sequences</h3>
                  <p className="text-gray-300">
                    AI personalizes email and optional SMS campaigns at scale, adjusting messaging by segment and behavior — without you lifting a finger.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Track Revenue & Only Pay on Results</h3>
                  <p className="text-gray-300">
                    We show you how many leads, bookings, and dollars came from Lukra campaigns — and you only pay when we produce results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
            <p className="text-gray-300">
              All messages are sent from your domain, approved by you, and designed to feel like 1:1 communication — not spam.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Simple, transparent, and performance-driven.
            </p>
            <p className="text-base text-gray-300 max-w-4xl mx-auto">
              At Lukra, you don't pay for ideas — you pay for outcomes. Every plan includes a complete list audit, segmentation, AI-powered campaign buildout, and performance tracking. All plans begin with a one-time Activation Fee to ensure quality, deliverability, and a clean foundation for revenue-generating campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition shadow-lg flex flex-col">
              <div className="text-sm text-emerald-400 font-semibold mb-2">Entry-Level Option</div>
              <h3 className="text-2xl font-bold mb-2">Performance Activation Plan</h3>
              <p className="text-gray-300 mb-2">Low activation fee + performance-only billing</p>
              <p className="text-sm italic text-gray-400 mb-6">Best for first-time clients or smaller lists</p>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">One-time activation fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Pay only on revenue we generate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Includes list audit, segmentation, and foundational AI campaign setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">No long-term commitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Fastest onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Great way to validate the system at low risk</span>
                </li>
              </ul>
              <div className="mb-4 pt-4 border-t border-slate-700">
                <p className="text-lg font-bold text-gray-100 mb-1">Activation Fee Starting at $297</p>
                <p className="text-base font-semibold text-emerald-400 mb-3">Performance Fee: 15–20% of revenue generated</p>
                <p className="text-sm italic text-gray-400">Ideal for owners who want to test the model before scaling — but includes fewer optimizations and no SMS or deep personalization.</p>
              </div>
              <a
                href="https://calendly.com/hello-lukraai/introduction-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition mt-auto"
              >
                Book a Revenue Discovery Call
              </a>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border-2 border-emerald-500 relative transform md:scale-105 shadow-2xl flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <div className="text-sm text-emerald-400 font-semibold mb-2">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Hybrid Plan</h3>
              <p className="text-gray-300 mb-2">Reduced performance fee + full AI setup</p>
              <p className="text-sm italic text-gray-400 mb-6">Ideal for established lists ready for predictable revenue</p>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Everything in the Performance Plan <strong>PLUS:</strong></span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Advanced AI-personalized email <strong>and</strong> SMS campaigns</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Fully customized messaging per segment</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Ongoing optimization during the campaign</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Lower performance percentage (save more as revenue scales)</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Highest ROI for lists over 2,000 contacts</span>
                </li>
              </ul>
              <div className="mb-4 pt-4 border-t border-emerald-500/30">
                <p className="text-lg font-bold text-gray-100 mb-1">Setup Fee Starting at $997</p>
                <p className="text-base font-semibold text-emerald-400 mb-3">Performance Fee: 10% of revenue generated</p>
                <p className="text-sm italic text-gray-400">Our most balanced and most selected plan — chosen by the majority of growing businesses for its strong ROI and deeper campaign optimization.</p>
              </div>
              <a
                href="https://calendly.com/hello-lukraai/introduction-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition mt-auto"
              >
                See Which Plan Fits You
              </a>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition shadow-lg flex flex-col">
              <div className="text-sm text-emerald-400 font-semibold mb-2">For Scaling Teams</div>
              <h3 className="text-2xl font-bold mb-2">Growth Retainer</h3>
              <p className="text-gray-300 mb-2">Monthly partner plan for ongoing revenue generation</p>
              <p className="text-sm italic text-gray-400 mb-6">Perfect for monthly list activation & nurturing</p>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Everything in the Hybrid Plan <strong>PLUS:</strong></span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Multi-campaign monthly strategy</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Seasonal & multi-offer workflows</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Continuous list cleaning and segmentation</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">AI optimization & A/B testing</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Dedicated support channel</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Priority calendar access</span>
                </li>
              </ul>
              <div className="mb-4 pt-4 border-t border-slate-700">
                <p className="text-lg font-bold text-gray-100 mb-3">Starting at $1,500 / month + optional performance bonuses</p>
                <p className="text-sm italic text-gray-400">Designed for teams that want a long-term partner optimizing revenue every single month — a fully managed, always-on revenue engine.</p>
              </div>
              <a
                href="https://calendly.com/hello-lukraai/introduction-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition mt-auto"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Not sure which plan is right for you? We'll help you choose the perfect model in less than 15 minutes.
            </p>
            <a
              href="https://calendly.com/hello-lukraai/introduction-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-8 py-4 rounded-lg font-semibold transition"
            >
              Book a 15-Minute Strategy Call
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              What a Lukra campaign can look like.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">37 jobs booked</div>
              <p className="text-gray-300">from 1,200 dormant contacts</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">$54,800</div>
              <p className="text-gray-300">in pipeline from a single reactivation push</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">3.4x ROI</div>
              <p className="text-gray-300">within 30 days</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
            <p className="text-xl italic text-gray-300">
              "We thought our list was dead. Lukra turned it into one of our highest ROI channels."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do you measure revenue from your campaigns?",
                answer: "We agree on a clear way to attribute leads and sales to Lukra campaigns — using unique links, tags in your CRM, and phone/email tracking. If we can't connect the dots, we don't count it."
              },
              {
                question: "Do you need access to my CRM or email?",
                answer: "We work however you're most comfortable. We can either connect directly to your CRM and email sending tool, or we can provide campaign assets for your team to send. Most clients choose to give us access under a limited user account."
              },
              {
                question: "Will this annoy my customers?",
                answer: "No. Our campaigns are conversational, value-first, and easy to opt out of. It feels like a thoughtful check-in, not a blast. We focus on re-engaging the right people with relevant offers."
              },
              {
                question: "What kind of results should I expect?",
                answer: "That depends on your list size, service prices, and history. Many clients see old leads booking jobs or requesting quotes within the first 7–14 days."
              },
              {
                question: "Is there a long-term contract?",
                answer: "No. You can start with a single campaign or stay on a month-to-month arrangement. We rely on performance, not lock-in."
              },
              {
                question: "What do you need from me to get started?",
                answer: "A short strategy call, access to your list or CRM export, and your approval on messaging and offers. We handle the rest."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/50 transition"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className="text-emerald-400 text-2xl">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to turn your old list into new revenue?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Share a few details about your business and we'll follow up with a short Loom video or a quick call to walk you through your revenue potential.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Contact Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="listSize" className="block text-sm font-semibold mb-2">Approximate List Size</label>
                  <select
                    id="listSize"
                    name="listSize"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                  >
                    <option value="">Select an option</option>
                    <option value="Under 1,000">Under 1,000</option>
                    <option value="1,000–5,000">1,000–5,000</option>
                    <option value="5,000–20,000">5,000–20,000</option>
                    <option value="20,000+">20,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your business and what you'd like to achieve."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 disabled:cursor-not-allowed text-slate-900 px-8 py-4 rounded-lg font-semibold transition"
                >
                  {isSubmitting ? 'Sending...' : 'Send details to Lukra'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-4 py-3 rounded-lg">
                    Thank you! Your message has been received successfully. We'll get back to you at the email you provided.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    Sorry, there was an error submitting your message. Please try again or email us directly at hello@lukraai.com
                  </div>
                )}
              </form>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 flex flex-col justify-center">
              <div className="text-center">
                <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Book a Call</h3>
                <p className="text-gray-300 mb-8">
                  Prefer to talk live? Book a 15-minute strategy call and we'll walk you through what a Lukra campaign could generate for your business.
                </p>
                <a
                  href="https://calendly.com/hello-lukraai/introduction-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-8 py-4 rounded-lg font-semibold transition"
                >
                  Book a 15-minute call
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400">
              © {currentYear} Lukra. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <button onClick={() => scrollToSection('home')} className="hover:text-emerald-400 transition">Home</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-emerald-400 transition">How It Works</button>
              <button onClick={() => scrollToSection('industries')} className="hover:text-emerald-400 transition">Industries</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-emerald-400 transition">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-emerald-400 transition">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400 transition">Contact</button>
            </div>
            <div className="text-gray-400 text-sm">
              Built with AI workflows and a lot of coffee.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
