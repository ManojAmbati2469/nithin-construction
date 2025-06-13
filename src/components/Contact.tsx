
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Construction, Hammer, Wrench, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Thank You!
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Your message has been successfully submitted. We'll get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="gradient-construction text-white hover:opacity-90 transition-opacity px-6 py-3 sm:px-8 sm:py-4"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to start your construction project? Contact us today for a free consultation 
            and let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <Card className="border-0 shadow-lg">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Netlify form detection */}
                  <input type="hidden" name="form-name" value="contact" />
                  
                  {/* Honeypot field for spam prevention */}
                  <div style={{ display: 'none' }}>
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        name="firstName"
                        placeholder="John" 
                        className="border-gray-300 focus:border-primary" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <Input 
                        name="lastName"
                        placeholder="Doe" 
                        className="border-gray-300 focus:border-primary" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="john@example.com" 
                      className="border-gray-300 focus:border-primary" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210" 
                      className="border-gray-300 focus:border-primary" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your project requirements..."
                      className="border-gray-300 focus:border-primary min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-construction text-white hover:opacity-90 transition-opacity py-3 sm:py-4"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 animate-slide-in-right">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title} 
                  className="hover-lift border-0 shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-construction rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{info.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 sm:h-64 gradient-construction flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <Building className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Visit Our Office</h3>
                  <p className="opacity-90 text-sm sm:text-base">Located in the heart of Tech City</p>
                </div>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-0 shadow-lg bg-gray-50">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2 gradient-text">24/7 Emergency Support</h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  For urgent construction matters, reach out to our emergency hotline
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 sm:px-6 sm:py-3">
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
