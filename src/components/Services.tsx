
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();

  const services = [
    {
      icon: Building,
      title: 'Residential Construction',
      description: 'Custom homes designed and built to your exact specifications with premium materials and craftsmanship.',
      features: ['Custom Design', 'Premium Materials', 'Quality Assurance']
    },
    {
      icon: Construction,
      title: 'Commercial Building',
      description: 'State-of-the-art commercial spaces that enhance productivity and create lasting impressions.',
      features: ['Modern Design', 'Efficient Layouts', 'Sustainable Solutions']
    },
    {
      icon: Hammer,
      title: 'Renovation & Remodeling',
      description: 'Transform existing spaces with innovative renovation solutions that maximize functionality.',
      features: ['Space Optimization', 'Modern Updates', 'Value Addition']
    },
    {
      icon: Wrench,
      title: 'Infrastructure Development',
      description: 'Large-scale infrastructure projects built with precision and adherence to industry standards.',
      features: ['Heavy Construction', 'Site Development', 'Utility Installation']
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding" ref={servicesRef}>
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-800 ${servicesVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[30px]'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From residential homes to commercial complexes, we provide comprehensive construction services 
            that exceed expectations and deliver lasting value.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className={`hover-lift bg-white border-0 shadow-xl transition-all duration-700 ${
                servicesVisible 
                  ? `animate-scale-on-scroll in-view animate-stagger-${index + 1}` 
                  : 'animate-scale-on-scroll'
              }`}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 gradient-construction rounded-full flex items-center justify-center mx-auto mb-6 hover-scale">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
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
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center mt-20 transition-all duration-800 ${servicesVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[30px]'}`} style={{ animationDelay: '0.5s' }}>
          <div className="gradient-construction rounded-3xl p-10 lg:p-16 text-white hover-lift">
            <h3 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Start Your Project?</h3>
            <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              Let's discuss your construction needs and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-lg">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 text-lg">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
