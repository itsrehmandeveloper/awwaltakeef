import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

const SEOHead = () => {
  const { lang, isRTL } = useLanguage();

  useEffect(() => {
    const title = isRTL
      ? 'أول تكييف | صيانة وإصلاح التكييف والأجهزة المنزلية في الرياض'
      : 'AwwalTakeef | HVAC & Appliance Repair in Riyadh';
    const description = isRTL
      ? 'خدمات صيانة وإصلاح المكيفات، الثلاجات، الغسالات والأفران في الرياض. فنيون معتمدون وخدمة سريعة.'
      : 'Expert AC, refrigerator, washing machine & oven repair in Riyadh. Certified technicians & fast service.';

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', isRTL
      ? 'صيانة مكيفات الرياض, إصلاح أجهزة منزلية, تكييف, ثلاجات, غسالات'
      : 'AC Repair Riyadh, HVAC Maintenance Riyadh, Appliance Repair Riyadh');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US', true);

    // JSON-LD
    let script = document.getElementById('jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "AwwalTakeef - أول تكييف",
      "description": description,
      "telephone": "+966502855830",
      "email": "awwaltakeef@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
      },
      "areaServed": "Riyadh",
      "serviceType": ["HVAC Repair", "Appliance Repair", "AC Maintenance"]
    });
  }, [lang, isRTL]);

  return null;
};

export default SEOHead;
