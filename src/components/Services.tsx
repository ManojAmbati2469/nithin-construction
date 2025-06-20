import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, Hammer, Users } from 'lucide-react';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import InquiryModal from './InquiryModal';

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  
  // Individual staggered animations for each card
  const { ref: card1Ref, isVisible: card1Visible } = useStaggeredScrollAnimation(0);
  const { ref: card2Ref, isVisible: card2Visible } = useStaggeredScrollAnimation(200);
  const { ref: card3Ref, isVisible: card3Visible } = useStaggeredScrollAnimation(400);
  const { ref: card4Ref, isVisible: card4Visible } = useStaggeredScrollAnimation(600);
  
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [availableUnitsModalOpen, setAvailableUnitsModalOpen] = useState(false);

  const services = [
    {
      icon: Building,
      title: '2 BHK Apartments',
      description: 'Thoughtfully designed 2-bedroom apartments perfect for small families and young professionals.',
      features: ['1090-1200 sq.ft', 'Modern Interiors', 'Premium Fittings'],
      ref: card1Ref,
      isVisible: card1Visible
    },
    {
      icon: Home,
      title: '3 BHK Apartments',
      description: 'Spacious 3-bedroom homes ideal for growing families with ample living and storage space.',
      features: ['1500-2032 sq.ft', 'Family-Friendly', 'Balcony Views'],
      ref: card2Ref,
      isVisible: card2Visible
    },
    {
      icon: Hammer,
      title: 'Custom Interiors',
      description: 'Personalized interior solutions to make your apartment truly feel like home.',
      features: ['Modular Kitchen', 'Wardrobe Design', 'Premium Finishes'],
      ref: card3Ref,
      isVisible: card3Visible
    },
    {
      icon: Users,
      title: 'Family Amenities',
      description: 'Community facilities designed to enhance your family\'s lifestyle and well-being.',
      features: ['Children\'s Play Area', 'Community Hall', 'Security System'],
      ref: card4Ref,
      isVisible: card4Visible
    }
  ];

  return (
    <>
      <section id="services" className="section-padding">
        <div className="container mx-auto container-padding" ref={servicesRef}>
          {/* Section Header */}
          <div className={`text-center mb-20 reveal-up ${servicesVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From cozy 2BHK apartments to spacious 3BHK homes, we create modern living spaces 
              that combine comfort, style, and affordability for today's families.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div key={service.title} ref={service.ref} className="h-full">
                <Card 
                  className={`h-full flex flex-col hover-lift bg-card border-border shadow-xl reveal-up ${service.isVisible ? 'visible' : ''}`}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 gradient-construction rounded-full flex items-center justify-center mx-auto mb-6 hover-scale">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl font-bold text-card-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center space-y-6">
                    <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm lg:text-base text-primary font-medium flex items-center justify-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className={`text-center mt-20 reveal-up ${ctaVisible ? 'visible' : ''}`} ref={ctaRef}>
            <div className="gradient-construction rounded-3xl p-10 lg:p-16 text-white hover-lift">
              <h3 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Own Your Dream Apartment?</h3>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Explore our current residential projects and find the perfect apartment for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setSiteVisitModalOpen(true)}
                  className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-lg"
                >
                  Schedule Site Visit
                </button>
                <button 
                  onClick={() => setAvailableUnitsModalOpen(true)}
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 text-lg"
                >
                  View Available Units
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <InquiryModal
        isOpen={siteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
        type="site-visit"
      />
      <InquiryModal
        isOpen={availableUnitsModalOpen}
        onClose={() => setAvailableUnitsModalOpen(false)}
        type="journey"
      />
    </>
  );
};

export default Services;
