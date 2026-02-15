import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Braces, 
  Zap, 
  Shield, 
  Layout, 
  Code, 
  ArrowRight,
  GitCompare,
  Table,
  Search,
  FileJson,
  MousePointer2,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/common/PageMeta';

const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const features = [
    {
      title: 'Interactive Tree View',
      description: 'Navigate complex JSON structures with a collapsible, searchable tree view.',
      icon: Layout,
      color: 'text-blue-400',
    },
    {
      title: 'Spreadsheet View',
      description: 'Convert arrays of objects into a clean, sortable table view for better analysis.',
      icon: Table,
      color: 'text-emerald-400',
    },
    {
      title: 'JSON Diff',
      description: 'Compare two JSON sets side by side with highlighted changes.',
      icon: GitCompare,
      color: 'text-purple-400',
    },
    {
      title: 'Schema Inference',
      description: 'Automatically generate and preview schema types from your data.',
      icon: Code,
      color: 'text-orange-400',
    },
    {
      title: 'Advanced Search',
      description: 'Powerful search with operators and exact phrase matching.',
      icon: Search,
      color: 'text-cyan-400',
    },
    {
      title: 'Secure & Private',
      description: '100% client-side processing. Your data never leaves your browser.',
      icon: Shield,
      color: 'text-indigo-400',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <PageMeta 
        title="JSONotations - Advanced Frontend JSON Editor" 
        description="The ultimate developer tool for visualizing, editing, and analyzing JSON data entirely in your browser. Fast, secure, and professional."
      />
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-glow" 
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 primary-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
              <span className="text-[9px] font-black text-white leading-none tracking-tighter">{`{...}`}</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              JSONotations
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors relative group py-2">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
            <Link to="/faq" className="hover:text-foreground transition-colors relative group py-2">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link to="/help" className="hover:text-foreground transition-colors relative group py-2">
              Help
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/editor">
              <Button size="sm" className="font-semibold shadow-md shadow-primary/10 button-hover-scale px-5">
                Go to Editor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-8 tracking-widest uppercase border border-primary/20 shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen JSON Workspace
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60">
              Data Editing <br />
              <span className="text-primary italic">Reimagined.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              A professional-grade, secure, and intuitive environment built for developers who demand better JSON visualization and manipulation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/editor">
                <Button size="lg" className="h-14 px-12 text-lg font-bold shadow-xl shadow-primary/20 button-hover-scale">
                  Start Building
                  <ArrowRight className="ml-2.5 w-5.5 h-5.5" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="h-14 px-12 text-lg font-bold button-hover-scale bg-background/50 backdrop-blur-md">
                  Explore Features
                </Button>
              </a>
            </div>
          </motion.div>
          
          {/* Enhanced Editor Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative w-full max-w-5xl group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="glass-card rounded-[2rem] p-3 relative overflow-hidden">
              <div className="bg-background/80 rounded-2xl overflow-hidden aspect-[16/10] relative">
                <div className="h-10 bg-secondary/80 border-b border-border/50 flex items-center px-5 gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="mx-auto text-[11px] font-medium text-muted-foreground tracking-wide opacity-50 uppercase">
                    jsonotations-editor.v1
                  </div>
                </div>
                <div className="relative h-full w-full">
                  <img 
                    src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_beb1effb-04b1-4251-b6de-c0b3ea5f1087.jpg" 
                    alt="JSONotations Interface Preview" 
                    className="w-full h-full object-cover grayscale-[0.2] opacity-90 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Floating Badge Widgets */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[20%] right-[10%] p-4 glass-card rounded-2xl border-white/5 shadow-2xl flex items-center gap-4 z-20 backdrop-blur-2xl"
                  >
                    <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold">Deep Nesting</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-tight">Optimized Tree view</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-[25%] left-[8%] p-4 glass-card rounded-2xl border-white/5 shadow-2xl flex items-center gap-4 z-20 backdrop-blur-2xl"
                  >
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/20">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold">Real-time Diff</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-tight">Zero-latency compare</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-border/40 bg-gradient-to-r from-transparent via-secondary/5 to-transparent">
            {[
              { label: 'Latency', value: '0ms' },
              { label: 'Security', value: '100%' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Developer Luv', value: '∞' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-24"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Built for modern workflows.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg font-medium leading-relaxed">
                Experience the tools that turn data manipulation from a chore into a seamless professional experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group p-8 glass-card rounded-[1.5rem] relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className={`w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mb-8 border border-border/50 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
                  
                  <div className="mt-8 flex items-center text-xs font-bold text-primary/0 group-hover:text-primary transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Learn more <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto glass-card rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden text-center"
        >
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse-glow" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Ready to elevate your <br /> JSON experience?
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Join thousands of developers using JSONotations to visualize, edit and validate data with confidence.
            </p>
            <Link to="/editor">
              <Button size="lg" className="h-16 px-14 text-xl font-black shadow-2xl shadow-primary/30 button-hover-scale primary-gradient border-none">
                Try it now — for free
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border/40 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
                <span className="text-[8px] font-black text-white leading-none">{`{...}`}</span>
              </div>
              <span className="font-black text-xl tracking-tight">JSONotations</span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-medium leading-relaxed">
              A premium, client-side toolkit for the modern developer. Your data, your privacy, our visualization.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">Product</h4>
            <ul className="space-y-4 font-bold text-sm text-muted-foreground">
              <li><Link to="/editor" className="hover:text-primary transition-colors">Editor</Link></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">Support</h4>
            <ul className="space-y-4 font-bold text-sm text-muted-foreground">
              <li><Link to="/help" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/settings" className="hover:text-primary transition-colors">Settings</Link></li>
              <li><a href="mailto:support@jsonotations.com" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          <p>© 2026 JSONotations. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
