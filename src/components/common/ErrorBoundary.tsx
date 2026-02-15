import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl border border-destructive/20">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">Something went wrong.</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed font-medium">
            An unexpected error occurred in the application. Please try refreshing the page.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            size="lg"
            className="h-12 px-8 font-bold button-hover-scale"
          >
            <RefreshCcw className="mr-2 w-4 h-4" />
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
