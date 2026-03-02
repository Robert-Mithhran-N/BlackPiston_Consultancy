import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <div className="mb-6 flex justify-center items-center" style={{ minHeight: '96px' }}>
          <img
            src="/blackpiston-logo.png"
            alt="BlackPiston Consultancy"
            className="h-32 w-auto object-contain mx-auto"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/blackpiston-logo.svg';
              target.onerror = () => {
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              };
            }}
          />
          <div className="hidden w-16 h-16 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto">
            <span className="font-heading font-black text-2xl text-foreground">BP</span>
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
