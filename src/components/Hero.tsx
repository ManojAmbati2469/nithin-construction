
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building, Users, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import InquiryModal from './InquiryModal';

const Hero = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
        {/* Background with enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
        </div>
        
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 gradient-construction rounded-full opacity-8 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 gradient-construction rounded-full opacity-8 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-32 h-32 gradient-construction rounded-full opacity-8 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto container-padding relative z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-10 transition-all duration-1000 ${heroVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Your Dream
                  <span className="gradient-text block">Apartment</span>
                  Awaits
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Discover premium residential apartments crafted with excellence. From modern 2BHK to spacious 3BHK homes, we build quality living spaces for families who value comfort and style.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  onClick={() => setJourneyModalOpen(true)}
                  className="gradient-construction text-white hover:opacity-90 transition-all duration-300 hover:scale-105 animate-pulse-glow text-lg px-8 py-4"
                >
                  Start Your Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setSiteVisitModalOpen(true)}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
                >
                  Schedule Site Visit
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-200">
                <div className={`text-center transition-all duration-700 ${heroVisible ? 'animate-scale-in animate-stagger-1' : 'opacity-0 scale-90'}`}>
                  <div className="text-4xl lg:text-5xl font-bold gradient-text">26+</div>
                  <div className="text-sm lg:text-base text-muted-foreground font-medium">Projects Completed</div>
                </div>
                <div className={`text-center transition-all duration-700 ${heroVisible ? 'animate-scale-in animate-stagger-2' : 'opacity-0 scale-90'}`}>
                  <div className="text-4xl lg:text-5xl font-bold gradient-text">400+</div>
                  <div className="text-sm lg:text-base text-muted-foreground font-medium">Happy Families</div>
                </div>
                <div className={`text-center transition-all duration-700 ${heroVisible ? 'animate-scale-in animate-stagger-3' : 'opacity-0 scale-90'}`}>
                  <div className="text-4xl lg:text-5xl font-bold gradient-text">6L+</div>
                  <div className="text-sm lg:text-base text-muted-foreground font-medium">sq.ft Delivered</div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Visual Elements */}
            <div className={`relative transition-all duration-1000 ${heroVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[60px]'}`}>
              <div className="relative">
                {/* Main construction illustration */}
                <div className="w-full h-[500px] lg:h-[600px] gradient-construction rounded-3xl flex items-center justify-center relative overflow-hidden hover-lift">
                  <div className="text-white text-center space-y-6">
                    <Building className="w-20 h-20 mx-auto animate-bounce-subtle" />
                    <h3 className="text-3xl lg:text-4xl font-bold">Premium Apartments</h3>
                    <p className="text-xl lg:text-2xl opacity-90">Quality Living Spaces</p>
                  </div>
                  
                  {/* Floating icons with enhanced animations */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-4 rounded-full animate-float hover-scale" style={{ animationDelay: '0.5s' }}>
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-sm p-4 rounded-full animate-float hover-scale" style={{ animationDelay: '1.5s' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Enhanced decorative cards */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl hover-lift hover-scale">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Home className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">2 & 3 BHK</div>
                      <div className="text-muted-foreground">Modern Apartments</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl hover-lift hover-scale">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">Premium</div>
                      <div className="text-muted-foreground">Quality Homes</div>
                    </div>
                  </div>
                </div>
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
        isOpen={journeyModalOpen}
        onClose={() => setJourneyModalOpen(false)}
        type="journey"
      />
    </>
  );
};

export default Hero;
