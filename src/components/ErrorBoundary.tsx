import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [state, setState] = React.useState<ErrorBoundaryState>({ hasError: false, error: null });

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setState({ hasError: true, error: event.error });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (state.hasError) {
    let message = "Something went wrong. Please try again later.";
    
    try {
      if (state.error?.message) {
        const parsed = JSON.parse(state.error.message);
        if (parsed.error && parsed.error.includes("permission")) {
          message = "You don't have permission to perform this action. Are you logged in as an admin?";
        }
      }
    } catch (e) {
      // Not a JSON error, use default
    }

    return (
      <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-red-50 rounded-3xl border border-red-100">
          <h2 className="text-2xl font-display font-bold text-red-900 mb-4">Oops!</h2>
          <p className="text-red-700 mb-6">{message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
