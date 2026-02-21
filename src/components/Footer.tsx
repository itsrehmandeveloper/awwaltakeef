import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">
              {isRTL ? 'أول تكييف' : 'AwwalTakeef'}
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t.nav.contact}</h4>
            <div className="space-y-2 text-sm text-background/70">
              <a href="tel:+966502855830" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} /> +966 50 285 5830
              </a>
              <a href="mailto:awwaltakeef@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> awwaltakeef@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t.nav.services}</h4>
            <div className="space-y-1 text-sm text-background/70">
              <p>{t.services.ac}</p>
              <p>{t.services.fridge}</p>
              <p>{t.services.washer}</p>
              <p>{t.services.oven}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} AwwalTakeef. {t.footer.rights}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
