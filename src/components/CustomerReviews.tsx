
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote, Heart, Users, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import InquiryModal from './InquiryModal';

const CustomerReviews = () => {
  const { ref: reviewsRef, isVisible: reviewsVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);

  const stats = [
    { icon: Users, value: "500+", label: "Happy Families" },
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: Heart, value: "99%", label: "Satisfaction Rate" }
  ];

  const reviews = [
    {
      name: "Umesh U",
      company: "Nithin Mepra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      review: "In Mepra, this is the best project in terms of build quality and materials used. From a landscape standpoint, it's very spacious. They seem very promising in their commitment to handover by May. Special thanks to Aditya Kumar for their advisory support.",
      rating: 5,
      verified: true
    },
    {
      name: "Aditya Kumar",
      company: "NC Jasmine",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      review: "As an owner, I can attest to the very good quality of construction. The location is conveniently near the new ORR exit, which is very useful, and we expect a metro station in Narsingi in the future. Everything you need is nearby. The CRM team, Nagarjuna and Nitish, have been very helpful, as well as Rahul and Priya from the sales team.",
      rating: 5,
      verified: true
    },
    {
      name: "Neha Siya",
      company: "NC Lilly",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      review: "I am sharing my experience with Nithin Constructions, one of the premium builders. During my site visit, they thoroughly explained the property, resolving all my doubts. They addressed all my queries regarding construction and development. Nithin Constructions offers good construction quality, timely delivery, excellent customer service, and very nice amenities.",
      rating: 5,
      verified: true
    },
    {
      name: "Rahul",
      company: "Nithin Constructions",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      review: "My experience booking a flat with Nithin has been great. After meticulously exploring all the options in the area, Nithin Mumbai unquestionably sets a new standard. The sales team's expertise and genuine support have made this process smooth. Unlike the common practice of creating false urgency, Nithin stands out with their transparent approach.",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-construction rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 gradient-construction rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 gradient-construction rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto container-padding relative z-10" ref={reviewsRef}>
        {/* Section Header */}
        <div className={`text-center mb-16 reveal-up ${reviewsVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center p-3 gradient-construction rounded-full mb-6 hover-scale">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Real experiences from real families who trusted us with their dream homes
          </p>
        </div>

        {/* Statistics Section */}
        <div className={`grid md:grid-cols-3 gap-8 mb-20 reveal-up ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group hover-lift">
              <div className="relative">
                <div className="w-20 h-20 gradient-construction rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className={`max-w-7xl mx-auto reveal-up ${carouselVisible ? 'visible' : ''}`} ref={carouselRef}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="hover-lift bg-card/80 backdrop-blur-sm border-2 border-border/50 shadow-2xl h-full group hover:border-primary/30 transition-all duration-500">
                    <CardContent className="p-8 lg:p-10 flex flex-col h-full relative overflow-hidden">
                      {/* Verified Badge */}
                      {review.verified && (
                        <div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          Verified
                        </div>
                      )}

                      {/* Quote Icon with Animation */}
                      <div className="mb-6 relative">
                        <Quote className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Review Text */}
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-grow text-base lg:text-lg relative z-10">
                        "{review.review}"
                      </p>

                      {/* Rating with Enhanced Design */}
                      <div className="flex items-center mb-8 relative z-10">
                        <div className="flex items-center mr-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-6 h-6 fill-yellow-400 text-yellow-400 mr-1 group-hover:scale-110 transition-transform duration-200" 
                              style={{ transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">5.0 Rating</span>
                      </div>

                      {/* Customer Info with Enhanced Design */}
                      <div className="flex items-center space-x-4 relative z-10">
                        <div className="relative">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-card-foreground text-lg group-hover:text-primary transition-colors duration-300">{review.name}</div>
                          <div className="text-primary/80 font-medium">{review.company}</div>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute bottom-0 left-0 w-full h-1 gradient-construction opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="gradient-construction text-white border-0 hover:opacity-80 w-14 h-14 shadow-lg hover-scale -left-7" />
            <CarouselNext className="gradient-construction text-white border-0 hover:opacity-80 w-14 h-14 shadow-lg hover-scale -right-7" />
          </Carousel>
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center mt-20 reveal-up ${ctaVisible ? 'visible' : ''}`} ref={ctaRef}>
          <div className="relative gradient-construction rounded-3xl p-10 lg:p-16 text-white hover-lift overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-6 left-8 w-6 h-6 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-5xl font-bold mb-6">Join Our Happy Customers</h3>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Experience the Nithin Constructions difference and become part of our success story.
              </p>
              <button 
                onClick={() => setJourneyModalOpen(true)} 
                className="bg-white text-primary px-12 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-lg shadow-xl hover:shadow-2xl group"
              >
                <span className="flex items-center gap-3">
                  Start Your Journey
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <InquiryModal
        isOpen={journeyModalOpen}
        onClose={() => setJourneyModalOpen(false)}
        type="journey"
      />
    </section>
  );
};

export default CustomerReviews;
