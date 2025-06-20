
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();

  const contactInfo = [
    {
      icon: Building,
      title: 'Sales Office',
      content: 'Construction Plaza, Tech City, Bangalore - 560001'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: '+91 9876543210'
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'sales@nithinconstructions.in'
    },
    {
      icon: MapPin,
      title: 'Site Visit Hours',
      content: 'Mon - Sun: 9:00 AM - 6:00 PM'
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
      <section id="contact" className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Thank You!
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Your inquiry has been successfully submitted. Our sales team will contact you within 24 hours to discuss your apartment requirements.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="gradient-construction text-white hover:opacity-90 transition-opacity px-6 py-3 sm:px-8 sm:py-4"
              >
                Send Another Inquiry
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-background" ref={contactRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 reveal-up ${contactVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Inquire About <span className="gradient-text">Our Apartments</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to find your perfect home? Contact us today to learn about our available
            apartments and schedule a site visit to experience quality living.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-stretch">
          {/* Contact Form */}
          <div className={`reveal-left ${contactVisible ? 'visible' : ''}`}>
            <Card className="border border-border shadow-lg bg-card h-full">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <form 
                  name="contact" 
                  method="POST" 
                  action="/thank-you"
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
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
                      <label className="text-sm font-medium text-foreground">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        name="firstName"
                        placeholder="John" 
                        className="border-border focus:border-primary bg-background text-foreground" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <Input 
                        name="lastName"
                        placeholder="Doe" 
                        className="border-border focus:border-primary bg-background text-foreground" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="john@example.com" 
                      className="border-border focus:border-primary bg-background text-foreground" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      minLength={10}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Phone number must be 10 digits only" 
                      className="border-border focus:border-primary bg-background text-foreground" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea 
                      name="message"
                      placeholder="I'm interested in 2BHK/3BHK apartments. Please share details about availability and pricing..."
                      className="border-border focus:border-primary min-h-[100px] sm:min-h-[120px] bg-background text-foreground"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-construction text-white hover:opacity-90 transition-opacity py-3 sm:py-4"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className={`flex flex-col space-y-6 sm:space-y-8 reveal-right ${contactVisible ? 'visible' : ''}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="h-full hover-lift border border-border shadow-lg bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-construction rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{info.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="border border-border shadow-lg overflow-hidden bg-card flex-grow">
              <div className="h-full gradient-construction flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <Building className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Visit Our Sales Office</h3>
                  <p className="opacity-90 text-sm sm:text-base">Located in the heart of Tech City</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
