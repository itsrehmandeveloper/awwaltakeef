import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import BookingForm from '@/components/BookingForm';
import GoogleMap from '@/components/GoogleMap';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <BookingForm />
        <GoogleMap />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
