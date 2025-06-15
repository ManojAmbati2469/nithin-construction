
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Home, Square, Navigation } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import InquiryModal from './InquiryModal';

const CurrentProject = () => {
  const { ref: projectRef, isVisible: projectVisible } = useScrollAnimation();
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-5">
        <div className="container mx-auto container-padding" ref={projectRef}>
          {/* Section Header */}
          <div className={`text-center mb-20 reveal-up ${projectVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Current <span className="gradient-text">Project</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our latest residential development - where modern design meets comfortable living
            </p>
          </div>

          {/* Current Project Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Project Image */}
              <div className={`reveal-left ${projectVisible ? 'visible' : ''}`}>
                <Card className="overflow-hidden border-0 shadow-2xl hover-lift">
                  <div className="relative h-[500px] lg:h-[600px]">
                    <img 
                      src="/lovable-uploads/image.png"
                      alt="NC Vihanga Project"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl dark:bg-gray-900/95">
                        <div className="flex items-center space-x-3 mb-2">
                          <Navigation className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Prime Location</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">Kardanoor near ORR Exit-3</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Project Details */}
              <div className={`space-y-10 reveal-right ${projectVisible ? 'visible' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">NC Vihanga</h3>
                    <div className="w-20 h-1 gradient-construction rounded-full"></div>
                  </div>
                  <p className="text-2xl lg:text-3xl gradient-text font-medium italic">
                    "Home is not a place...it's a feeling."
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Experience the perfect blend of modern architecture and comfortable living in our thoughtfully designed apartments.
                  </p>
                </div>

                <div className="space-y-8" ref={highlightsRef}>
                  <h4 className="text-2xl lg:text-3xl font-bold text-foreground">Project Highlights</h4>
                  
                  <div className="grid gap-6">
                    <div className={`group p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 reveal-scale reveal-stagger-1 ${highlightsVisible ? 'visible' : ''}`}>
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 gradient-construction rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-card-foreground text-xl mb-2">2 & 3BHK Apartments</div>
                          <div className="text-muted-foreground text-lg leading-relaxed">
                            Spacious and thoughtfully designed apartments to suit different family sizes and preferences
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`group p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 reveal-scale reveal-stagger-2 ${highlightsVisible ? 'visible' : ''}`}>
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 gradient-construction rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Square className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-card-foreground text-xl mb-2">1090 - 2032 sq.ft</div>
                          <div className="text-muted-foreground text-lg leading-relaxed">
                            Flexible floor plans ranging from compact 2BHK to spacious 3BHK apartments
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`group p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 reveal-scale reveal-stagger-3 ${highlightsVisible ? 'visible' : ''}`}>
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 gradient-construction rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-card-foreground text-xl mb-2">Strategic Location</div>
                          <div className="text-muted-foreground text-lg leading-relaxed">
                            Located at Kardanoor near ORR Exit-3 with excellent connectivity to major IT hubs and city centers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Button 
                    size="lg" 
                    onClick={() => setModalOpen(true)}
                    className="gradient-construction text-white hover:opacity-90 transition-all duration-300 hover:scale-105 text-lg px-10 py-4 animate-pulse-glow"
                  >
                    Know More About NC Vihanga
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="journey"
      />
    </>
  );
};

export default CurrentProject;
