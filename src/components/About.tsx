
import { Card, CardContent } from '@/components/ui/card';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Building,
      number: '100+',
      label: 'Projects Completed',
      description: 'Successfully delivered across residential and commercial sectors'
    },
    {
      icon: Construction,
      number: '15+',
      label: 'Years Experience',
      description: 'Decades of expertise in construction and project management'
    },
    {
      icon: Hammer,
      number: '50+',
      label: 'Skilled Workers',
      description: 'Professional team committed to excellence in every project'
    },
    {
      icon: Wrench,
      number: '24/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance for all your construction needs'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                About <span className="gradient-text">Nithin Constructions</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                With over 15 years of excellence in the construction industry, Nithin Constructions 
                has established itself as a trusted name in building quality structures that stand the test of time.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to innovation, quality craftsmanship, and customer satisfaction has made us 
                the preferred choice for residential, commercial, and infrastructure projects across the region. 
                We believe in transforming visions into reality through meticulous planning, expert execution, 
                and unwavering dedication to excellence.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  'Expert team with 15+ years of experience',
                  'Quality materials and modern construction techniques',
                  'Timely project completion with transparent pricing',
                  'Comprehensive warranty and after-sales support',
                  'Eco-friendly and sustainable building practices'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 gradient-construction rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Achievements */}
          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.label} 
                className="hover-lift bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center mx-auto">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold gradient-text">
                      {achievement.number}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {achievement.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 animate-fade-in">
          <div className="text-center p-8 gradient-construction rounded-2xl text-white hover-lift">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg opacity-90">
              To deliver exceptional construction services that exceed client expectations 
              while maintaining the highest standards of quality, safety, and sustainability.
            </p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover-lift">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h3>
            <p className="text-lg text-muted-foreground">
              To be the leading construction company recognized for innovation, reliability, 
              and creating structures that contribute positively to communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
