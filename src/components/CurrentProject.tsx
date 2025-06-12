
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, Square, Navigation } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CurrentProject = () => {
  const { ref: projectRef, isVisible: projectVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding" ref={projectRef}>
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-800 ${projectVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[30px]'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Current <span className="gradient-text">Project</span>
          </h2>
        </div>

        {/* Current Project Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Project Image */}
          <div className={`transition-all duration-1000 ${projectVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <Card className="overflow-hidden border-0 shadow-2xl hover-lift">
              <img 
                src="/lovable-uploads/image.png"
                alt="NC Vihanga Project"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </Card>
          </div>

          {/* Project Details */}
          <div className={`space-y-10 transition-all duration-1000 ${projectVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[60px]'}`}>
            <div className="space-y-6">
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">NC Vihanga</h3>
              <p className="text-xl lg:text-2xl gradient-text font-medium">
                Home is not a place...it's a feeling.
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">Here's what you should know:</h4>
              
              <div className="grid gap-6">
                <div className={`flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg hover-lift transition-all duration-700 ${projectVisible ? 'animate-scale-in animate-stagger-1' : 'opacity-0 scale-90'}`}>
                  <div className="w-16 h-16 gradient-construction rounded-full flex items-center justify-center">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg lg:text-xl">2 & 3BHK</div>
                    <div className="text-muted-foreground text-base lg:text-lg">Spacious apartments</div>
                  </div>
                </div>

                <div className={`flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg hover-lift transition-all duration-700 ${projectVisible ? 'animate-scale-in animate-stagger-2' : 'opacity-0 scale-90'}`}>
                  <div className="w-16 h-16 gradient-construction rounded-full flex items-center justify-center">
                    <Square className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg lg:text-xl">1090 sft to 2032 sft</div>
                    <div className="text-muted-foreground text-base lg:text-lg">Flexible floor plans</div>
                  </div>
                </div>

                <div className={`flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg hover-lift transition-all duration-700 ${projectVisible ? 'animate-scale-in animate-stagger-3' : 'opacity-0 scale-90'}`}>
                  <div className="w-16 h-16 gradient-construction rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg lg:text-xl">Located at Kardanoor near ORR Exit-3</div>
                    <div className="text-muted-foreground text-base lg:text-lg">Prime location with excellent connectivity</div>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className={`gradient-construction text-white hover:opacity-90 transition-all duration-300 hover:scale-105 text-lg px-8 py-4 ${projectVisible ? 'animate-pulse-glow' : ''}`}>
              Know more...
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentProject;
