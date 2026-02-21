import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.jpg';

const Navbar = () => {
  const { t, lang, toggleLanguage, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.services, id: 'services' },
    { label: t.nav.book, id: 'booking' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
          <img src={logo} alt="AwwalTakeef" className="h-10 md:h-12 w-auto rounded-lg" />
          <span className="font-bold text-lg text-primary-dark hidden sm:block">
            {isRTL ? 'أول تكييف' : 'AwwalTakeef'}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-foreground/80 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="px-4 py-1.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-2">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-foreground/80 hover:text-primary py-2 font-medium text-start"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-full border-2 border-primary text-primary font-semibold w-fit"
              >
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
