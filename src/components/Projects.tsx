
import { Card, CardContent } from '@/components/ui/card';
import { Building, Construction, Home, Users } from 'lucide-react';

const Projects = () => {
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
      title: 'NC Vihanga',
      category: 'Current Project',
      description: '2 & 3BHK apartments located at Kardanoor near ORR Exit-3 with modern amenities.',
      icon: Construction,
      image: '/lovable-uploads/image.png',
      status: 'Selling',
      year: '2024',
      units: '2 & 3 BHK Available'
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
      image: '/lovable-uploads/58a4c73a-fe50-4e0b-b127-51d2bd9dde86.png',
      alt: 'Completed Residential Complex 1'
    },
    {
      image: '/lovable-uploads/58a4c73a-fe50-4e0b-b127-51d2bd9dde86.png',
      alt: 'Completed Residential Complex 2'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Residential Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of premium residential apartments that have provided 
            comfortable homes to hundreds of satisfied families.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="overflow-hidden hover-lift bg-card border-border shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
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
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
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
                <p className="text-muted-foreground leading-relaxed">
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
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4">Successfully <span className="gradient-text">Delivered</span></h3>
            <p className="text-lg text-muted-foreground">
              A showcase of our completed residential projects where families now call home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {completedProjects.map((project, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-lift bg-card border-border shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="gradient-construction rounded-2xl p-8 lg:p-12 text-white animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Our Achievement</h3>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to providing quality homes
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '26', label: 'Completed Projects' },
              { number: '6 Lakh+', label: 'sq.ft Delivered' },
              { number: '400+', label: 'Happy Families' },
              { number: '20+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
