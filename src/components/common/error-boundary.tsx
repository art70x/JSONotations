import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from 'components/ui/button'

interface Properties {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Properties, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
          <div className="mb-8 flex size-20 items-center justify-center rounded-[2rem] border border-destructive/20 bg-destructive/10 shadow-2xl">
            <IHugeiconsAlert02 className="size-10 text-destructive" />
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tighter">Something went wrong.</h1>
          <p className="mx-auto mb-10 max-w-md leading-relaxed font-medium text-muted-foreground">
            An unexpected error occurred in the application. Please try refreshing the page.
          </p>
          <Button
            onClick={() => globalThis.location.reload()}
            size="lg"
            className="h-12 button-hover-scale px-8 font-bold"
          >
            <IHugeiconsReload className="mr-2 size-4" />
            Refresh Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
