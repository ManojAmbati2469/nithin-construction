
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Building,
      title: 'Office Address',
      content: 'Construction Plaza, Tech City, Bangalore - 560001'
    },
    {
      icon: Construction,
      title: 'Phone Number',
      content: '+91 9876543210'
    },
    {
      icon: Hammer,
      title: 'Email Address',
      content: 'info@nithinconstructions.in'
    },
    {
      icon: Wrench,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your construction project? Contact us today for a free consultation 
            and let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input placeholder="John" className="border-gray-300 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input placeholder="Doe" className="border-gray-300 focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="john@example.com" className="border-gray-300 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input placeholder="+91 9876543210" className="border-gray-300 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:border-primary focus:outline-none">
                    <option>Select Project Type</option>
                    <option>Residential Construction</option>
                    <option>Commercial Building</option>
                    <option>Renovation & Remodeling</option>
                    <option>Infrastructure Development</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea 
                    placeholder="Tell us about your project requirements..."
                    className="border-gray-300 focus:border-primary min-h-[120px]"
                  />
                </div>
                <Button className="w-full gradient-construction text-white hover:opacity-90 transition-opacity">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title} 
                  className="hover-lift border-0 shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-64 gradient-construction flex items-center justify-center">
                <div className="text-center text-white">
                  <Building className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Visit Our Office</h3>
                  <p className="opacity-90">Located in the heart of Tech City</p>
                </div>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-0 shadow-lg bg-gray-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 gradient-text">24/7 Emergency Support</h3>
                <p className="text-muted-foreground mb-4">
                  For urgent construction matters, reach out to our emergency hotline
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
