import { Link } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <PageMeta title="404 - Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-primary/20 animate-float">
          <Ghost className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">404</h1>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Lost in the Data?</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed font-medium">
          The object you are looking for might have been deleted, moved, or never existed in our schema.
        </p>
        
        <Link to="/">
          <Button size="lg" className="h-12 px-8 font-bold button-hover-scale shadow-xl shadow-primary/20">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Safety
          </Button>
        </Link>
      </motion.div>
      
      <p className="absolute bottom-8 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
        &copy; 2026 JSONotations
      </p>
    </div>
  );
}
