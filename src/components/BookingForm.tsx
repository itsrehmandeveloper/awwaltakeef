import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const BookingForm = () => {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [form, setForm] = useState({ name: '', phone: '', appliance: '', issue: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structure ready for EmailJS / Supabase
    console.log('Booking submitted:', { ...form, date });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', appliance: '', issue: '' });
      setDate(undefined);
    }, 4000);
  };

  const applianceOptions = Object.entries(t.booking.appliances);

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-accent/50 to-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.booking.title}</h2>
          <p className="text-muted-foreground text-lg">{t.booking.subtitle}</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-success/10 border border-success/30 rounded-2xl p-8 text-center"
          >
            <CheckCircle className="mx-auto text-success mb-4" size={48} />
            <p className="text-lg font-semibold text-foreground">{t.booking.success}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border/50 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.booking.name}</label>
              <Input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                maxLength={100}
                className="bg-secondary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.booking.phone}</label>
              <Input
                required
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+966"
                dir="ltr"
                className="bg-secondary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.booking.appliance}</label>
              <Select value={form.appliance} onValueChange={v => setForm(f => ({ ...f, appliance: v }))}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder={t.booking.selectAppliance} />
                </SelectTrigger>
                <SelectContent>
                  {applianceOptions.map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.booking.issue}</label>
              <Textarea
                required
                value={form.issue}
                onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                maxLength={1000}
                rows={3}
                className="bg-secondary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.booking.date}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-start bg-secondary/50", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="me-2 h-4 w-4" />
                    {date ? format(date, "PPP") : t.booking.pickDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={d => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
              <Send className="me-2" size={20} />
              {t.booking.submit}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
