import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-dark border-t border-gold/10 mt-auto">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4">
            <img 
              src="/blackpiston-logo.svg" 
              alt="BlackPiston Consultancy" 
              className="h-16 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-heading font-black text-sm text-foreground">BP</span>
              </div>
              <span className="font-heading font-bold text-primary-foreground text-lg">
                Black<span className="text-gradient-gold">Piston</span>
              </span>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/50 leading-relaxed">
            Premium automotive consultancy. Buy & sell luxury vehicles with confidence.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Explore</h4>
          <ul className="space-y-2.5">
            {["Buy Cars", "Buy Motorbikes", "Sell Vehicle", "Valuation"].map((item) => (
              <li key={item}>
                <Link to="/search" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Company</h4>
          <ul className="space-y-2.5">
            {["About Us", "Seller Verification", "Reviews", "Careers"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Legal</h4>
          <ul className="space-y-2.5">
            {["Terms of Service", "Privacy Policy", "Cookie Policy", "Contact"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-primary-foreground/40">
          © 2026 BlackPiston Consultancy. All rights reserved.
        </p>
        <div className="flex gap-4">
          <span className="text-xs text-primary-foreground/40">Trusted by 10,000+ buyers</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
