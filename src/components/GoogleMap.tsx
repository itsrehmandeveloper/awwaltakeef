import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const GoogleMap = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.map.title}</h2>
          <p className="text-muted-foreground text-lg">{t.map.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border border-border/50"
        >
          <iframe
            title="AwwalTakeef Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d226.5320566172967!2d46.66626666165779!3d24.709265729222725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1771674771533!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleMap;
