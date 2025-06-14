
import { Building, Construction, Hammer, Wrench } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        'Residential Construction',
        'Commercial Building',
        'Renovation & Remodeling',
        'Infrastructure Development'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Projects',
        'Career Opportunities',
        'Testimonials'
      ]
    },
    {
      title: 'Support',
      links: [
        'Contact Us',
        'Emergency Services',
        'Warranty Claims',
        'Maintenance Support'
      ]
    }
  ];

  return (
    <footer className="bg-steel-gray text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="gradient-construction p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nithin Constructions</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Building tomorrow's infrastructure with excellence, innovation, and unwavering commitment to quality. 
              Your trusted partner in construction for over 15 years.
            </p>
            <div className="flex space-x-4">
              {[Construction, Hammer, Wrench].map((Icon, index) => (
                <div key={index} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-bold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        {/* <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest news about our projects and construction industry insights.</p>
            </div>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <button className="gradient-construction px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-600 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <p className="text-gray-300">
            © 2024 Nithin Constructions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
