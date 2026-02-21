import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Snowflake, Thermometer, WashingMachine, CookingPot } from 'lucide-react';

const services = [
  { icon: Snowflake, keyName: 'ac' as const, keyDesc: 'acDesc' as const },
  { icon: Thermometer, keyName: 'fridge' as const, keyDesc: 'fridgeDesc' as const },
  { icon: WashingMachine, keyName: 'washer' as const, keyDesc: 'washerDesc' as const },
  { icon: CookingPot, keyName: 'oven' as const, keyDesc: 'ovenDesc' as const },
];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.keyName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-md card-hover border border-border/50 text-center"
            >
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <s.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t.services[s.keyName]}</h3>
              <p className="text-muted-foreground text-sm">{t.services[s.keyDesc]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
