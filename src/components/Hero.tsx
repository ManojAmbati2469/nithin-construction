
import { Button } from '@/components/ui/button';
import { Construction, Hammer, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 gradient-construction rounded-full opacity-10 animate-bounce-subtle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 gradient-construction rounded-full opacity-10 animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 gradient-construction rounded-full opacity-10 animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Building
                <span className="gradient-text block">Tomorrow's</span>
                Infrastructure
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                With over a decade of excellence in construction, we transform visions into reality through innovative building solutions and uncompromising quality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-construction text-white hover:opacity-90 transition-all duration-300 hover:scale-105">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                View Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              {/* Main construction illustration */}
              <div className="w-full h-96 gradient-construction rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-center space-y-4">
                  <Construction className="w-16 h-16 mx-auto animate-bounce-subtle" />
                  <h3 className="text-2xl font-bold">Expert Construction</h3>
                  <p className="text-lg opacity-90">Quality & Innovation</p>
                </div>
                
                {/* Floating icons */}
                <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  <Hammer className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/20 p-3 rounded-full animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>
                  <Wrench className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Decorative cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg hover-lift">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Residential</div>
                    <div className="text-sm text-muted-foreground">Modern Homes</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg hover-lift">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Construction className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Commercial</div>
                    <div className="text-sm text-muted-foreground">Business Spaces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
