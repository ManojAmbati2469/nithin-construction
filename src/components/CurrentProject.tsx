
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, Square, Navigation } from 'lucide-react';

const CurrentProject = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Current <span className="gradient-text">Project</span>
          </h2>
        </div>

        {/* Current Project Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Image */}
          <div className="animate-slide-in-left">
            <Card className="overflow-hidden border-0 shadow-xl hover-lift">
              <img 
                src="/lovable-uploads/image.png"
                alt="NC Vihanga Project"
                className="w-full h-96 object-cover"
              />
            </Card>
          </div>

          {/* Project Details */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-gray-900">NC Vihanga</h3>
              <p className="text-xl gradient-text font-medium">
                Home is not a place...it's a feeling.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900">Here's what you should know:</h4>
              
              <div className="grid gap-4">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2 & 3BHK</div>
                    <div className="text-sm text-muted-foreground">Spacious apartments</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center">
                    <Square className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1090 sft to 2032 sft</div>
                    <div className="text-sm text-muted-foreground">Flexible floor plans</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Located at Kardanoor near ORR Exit-3</div>
                    <div className="text-sm text-muted-foreground">Prime location with excellent connectivity</div>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="gradient-construction text-white hover:opacity-90 transition-all duration-300">
              Know more...
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentProject;
