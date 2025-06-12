
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';

const Services = () => {
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
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From residential homes to commercial complexes, we provide comprehensive construction services 
            that exceed expectations and deliver lasting value.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover-lift bg-white border-0 shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-construction rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-primary font-medium">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="gradient-construction rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your construction needs and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
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
