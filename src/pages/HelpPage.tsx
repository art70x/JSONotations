import React from 'react';
import PageMeta from '@/components/common/PageMeta';
import { Sidebar } from '@/components/Sidebar';
import { motion } from "framer-motion";
import { HelpCircle, Book, Code, Zap, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  const guides = [
    {
      title: "Getting Started",
      icon: Zap,
      description: "Learn the basics of using JSONotations to manage your data.",
      steps: ["Paste your JSON", "Use Tree View to navigate", "Format or Minify with one click"]
    },
    {
      title: "Keyboard Shortcuts",
      icon: Code,
      description: "Master the editor with powerful keyboard combinations.",
      steps: ["Alt + 1-5: Switch Tabs", "Shift + Alt + F: Format", "Ctrl + S: Save/Download"]
    },
    {
      title: "Advanced Features",
      icon: Book,
      description: "Dive deeper into schema validation and diff comparison.",
      steps: ["Compare two JSON sets", "Infer and preview schema", "Export table to CSV/PDF"]
    }
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar activeTab="help" setActiveTab={() => {}} />
      <PageMeta 
        title="Documentation - JSONotations" 
        description="Learn how to use JSONotations to its full potential with our comprehensive user guide."
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-auto custom-scrollbar bg-background relative shadow-inner">
        <div className="absolute top-0 right-0 w-full h-96 bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full p-8 py-24 space-y-16 relative z-10">
          <header className="text-center space-y-6">
            <div className="w-20 h-20 primary-gradient rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">User Guide.</h1>
            <p className="text-lg text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">Master the most powerful JSON tools in your browser.</p>
          </header>

          <div className="grid gap-8">
            {guides.map((guide, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-secondary/10 border-border hover:bg-secondary/20 transition-colors cursor-default">
                  <CardContent className="p-6">
                    <div className="flex flex-col xl:flex-row gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <guide.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold">{guide.title}</h2>
                          <p className="text-muted-foreground">{guide.description}</p>
                        </div>
                        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                          {guide.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-sm text-foreground/80">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <footer className="pt-12 border-t border-border flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">Documentation</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">GitHub Repository</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">Release Notes</a>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 JSONotations Team</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
