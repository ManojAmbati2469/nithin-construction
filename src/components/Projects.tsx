
import { Card, CardContent } from '@/components/ui/card';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Luxury Residential Complex',
      category: 'Residential',
      description: 'Modern 50-unit residential complex with premium amenities and sustainable design features.',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      status: 'Completed',
      year: '2023'
    },
    {
      title: 'Corporate Office Building',
      category: 'Commercial',
      description: '20-story corporate headquarters featuring state-of-the-art facilities and energy-efficient systems.',
      icon: Construction,
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop',
      status: 'In Progress',
      year: '2024'
    },
    {
      title: 'Shopping Mall Development',
      category: 'Commercial',
      description: 'Large-scale retail complex with modern architecture and comprehensive shopping experience.',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop',
      status: 'Completed',
      year: '2023'
    },
    {
      title: 'Infrastructure Bridge Project',
      category: 'Infrastructure',
      description: 'Major bridge construction project enhancing regional connectivity and transportation.',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop',
      status: 'Planning',
      year: '2024'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful construction projects that showcase our expertise 
            in delivering quality structures across various sectors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="overflow-hidden hover-lift bg-white border-0 shadow-lg animate-fade-in"
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
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                  View Details →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="gradient-construction rounded-2xl p-8 lg:p-12 text-white animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Project Statistics</h3>
            <p className="text-xl opacity-90">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '100+', label: 'Total Projects' },
              { number: '₹500Cr+', label: 'Project Value' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Years Experience' }
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
