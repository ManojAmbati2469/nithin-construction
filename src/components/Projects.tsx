
import { Card, CardContent } from '@/components/ui/card';
import { Building, Construction, Home, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from "react-router-dom";

const Projects = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { ref: completedRef, isVisible: completedVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const projects = [
    {
      title: 'Luxury Residential Complex',
      category: 'Completed Project',
      description: 'Modern 50-unit residential complex with premium amenities and contemporary design.',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      status: 'Sold Out',
      year: '2023',
      units: '50 Apartments'
    },
    {
      title: 'Garden View Residency',
      category: 'Completed Project',
      description: 'Family-friendly apartment complex with landscaped gardens and children\'s play areas.',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop',
      status: 'Sold Out',
      year: '2023',
      units: '75 Apartments'
    },
    {
      title: 'Elite Heights',
      category: 'Upcoming Project',
      description: 'Premium residential towers with state-of-the-art amenities and panoramic city views.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop',
      status: 'Pre-Launch',
      year: '2025',
      units: '120 Apartments'
    }
  ];

  const completedProjects = [
    {
      image: '/nithinConstruction1.png',
      alt: 'Completed Residential Complex 1',
      title: 'RC GreenFeilds'
    },
    {
      image: '/nithinConstruction2.png',
      alt: 'Completed Residential Complex 2',
      title: 'RC Diamond'
    },
    {
      image: '/nithinConstruction3.png',
      alt: 'Completed Residential Complex 2',
      title: 'NC Sunrise'
    },
    {
      image: '/nithinConstruction4.png',
      alt: 'Completed Residential Complex 2',
      title: 'Mepra'
    },
    {
      image: '/nithinConstruction5.png',
      alt: 'Completed Residential Complex 2',
      title: 'NC Lily'
    },
    {
      image: '/nithinConstruction6.png',
      alt: 'Completed Residential Complex 2',
      title: 'RC Green Leaves'
    }
  ];

  return (
    <section id="projects" className="section-padding no-overflow-x">
      <div className="container-safe mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 reveal-up ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Residential Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Explore our portfolio of premium residential apartments that have provided 
            comfortable homes to hundreds of satisfied families.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-16 px-4" ref={gridRef}>
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className={`h-full flex flex-col overflow-hidden hover-lift bg-card border-border shadow-lg reveal-scale reveal-stagger-${index + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Sold Out' ? 'bg-green-100 text-green-800' :
                    project.status === 'Selling' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4 gradient-construction p-2 rounded-full">
                  <project.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardContent className="p-4 sm:p-6 space-y-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                      {project.title}
                    </h3>
                    <span className="text-sm font-medium text-primary">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.units}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completed Projects Section */}
        <div className="mb-16">
          <div className={`text-center mb-12 reveal-up ${completedVisible ? 'visible' : ''}`} ref={completedRef}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Successfully <span className="gradient-text">Delivered</span></h3>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              A showcase of our completed residential projects where families now call home
            </p>
          </div>
          
          <div className={`w-full max-w-[95vw] mx-auto py-8 reveal-scale ${carouselVisible ? 'visible' : ''}`} ref={carouselRef}>
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {completedProjects.map((project, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-[280px] sm:basis-[320px] md:basis-1/2 lg:basis-1/3"
                    >
                      <Link
                        to={`/flats-available?variant=completed&project=${encodeURIComponent(project.title)}`}
                        tabIndex={0}
                        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                        aria-label={`View details for ${project.title}`}
                      >
                        <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="p-4 text-center">
                            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`gradient-construction rounded-2xl p-6 sm:p-8 lg:p-12 text-white reveal-up mx-4 ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Achievement</h3>
            <p className="text-lg sm:text-xl opacity-90">
              Numbers that reflect our commitment to providing quality homes
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '26', label: 'Completed Projects' },
              { number: '6 Lakh+', label: 'sq.ft Delivered' },
              { number: '400+', label: 'Happy Families' },
              { number: '20+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base lg:text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
