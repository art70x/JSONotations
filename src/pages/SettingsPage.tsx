import React from 'react';
import PageMeta from '@/components/common/PageMeta';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Keyboard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar activeTab="settings" setActiveTab={() => {}} />
      <PageMeta 
        title="Settings - JSONotations" 
        description="Configure your JSON editing experience, themes, and shortcuts."
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-auto custom-scrollbar bg-background relative shadow-inner">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full p-8 py-24 space-y-16 relative z-10">
          <header className="text-center space-y-6">
            <div className="w-20 h-20 primary-gradient rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
              <SettingsIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">Settings.</h1>
            <p className="text-lg text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">Customize your professional data workspace.</p>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6"
          >
            <Card className="bg-secondary/10 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  <CardTitle>Appearance</CardTitle>
                </div>
                <CardDescription>Customize how the editor looks on your screen.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Always use the dark interface.</p>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact View</Label>
                    <p className="text-xs text-muted-foreground">Reduce spacing in tree and table views.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5" />
                  <CardTitle>Editor Settings</CardTitle>
                </div>
                <CardDescription>Configure editor behavior and features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-save</Label>
                    <p className="text-xs text-muted-foreground">Automatically save changes to local storage.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lint on Type</Label>
                    <p className="text-xs text-muted-foreground">Show errors as you type.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
