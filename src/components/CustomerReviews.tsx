
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import InquiryModal from './InquiryModal';

const CustomerReviews = () => {
  const { ref: reviewsRef, isVisible: reviewsVisible } = useScrollAnimation();
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);


  const reviews = [
    {
      name: "Umesh U",
      company: "Nithin Mepra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      review: "In Mepra, this is the best project in terms of build quality and materials used. From a landscape standpoint, it's very spacious. They seem very promising in their commitment to handover by May. Special thanks to Aditya Kumar for their advisory support.",
      rating: 5
    },
    {
      name: "Aditya Kumar",
      company: "NC Jasmine",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      review: "As an owner, I can attest to the very good quality of construction. The location is conveniently near the new ORR exit, which is very useful, and we expect a metro station in Narsingi in the future. Everything you need is nearby. The CRM team, Nagarjuna and Nitish, have been very helpful, as well as Rahul and Priya from the sales team. I am pleased with the floor tiles and the bathroom fittings.",
      rating: 5
    },
    {
      name: "Neha Siya",
      company: "NC Lilly",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      review: "I am sharing my experience with Nithin Constructions, one of the premium builders. During my site visit, they thoroughly explained the property, resolving all my doubts. They addressed all my queries regarding construction and development. Nithin Constructions offers good construction quality, timely delivery, excellent customer service, and very nice amenities. Overall, one can be very satisfied when comparing them to other builders.",
      rating: 5
    },
    {
      name: "Rahul",
      company: "Nithin Constructions",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      review: "My experience booking a flat with Nithin has been great. After meticulously exploring all the options in the area, Nithin Mumbai unquestionably sets a new standard. The sales team's expertise and genuine support have made this process smooth. Unlike the common practice of creating false urgency, Nithin stands out with their transparent approach to unit availability which is truly commendable.",
      rating: 5
    }
  ];

  return (
    <section className="py-5 bg-background">
      <div className="container mx-auto container-padding" ref={reviewsRef}>
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-800 ${reviewsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[30px]'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hear what our valued customers have to say about their experience with Nithin Constructions
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${reviewsVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}>
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
                  <Card className="hover-lift bg-card border-border shadow-xl h-full hover-scale dark:bg-gray-900">
                    <CardContent className="p-8 lg:p-10 flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-8">
                        <Quote className="w-12 h-12 text-primary opacity-30" />
                      </div>

                      {/* Review Text */}
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-grow text-base lg:text-lg">
                        "{review.review}"
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 mr-1" />
                        ))}
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover hover-scale"
                        />
                        <div>
                          <div className="font-bold text-foreground text-lg">{review.name}</div>
                          <div className="text-primary font-medium">{review.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="gradient-construction text-white border-0 hover:opacity-80 w-12 h-12 hover-scale" />
            <CarouselNext className="gradient-construction text-white border-0 hover:opacity-80 w-12 h-12 hover-scale" />
          </Carousel>
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center mt-20 transition-all duration-800 ${reviewsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[30px]'}`} style={{ animationDelay: '0.5s' }}>
          <div className="gradient-construction rounded-3xl p-10 lg:p-16 text-white hover-lift">
            <h3 className="text-3xl lg:text-5xl font-bold mb-6">Join Our Happy Customers</h3>
            <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              Experience the Nithin Constructions difference and become part of our success story.
            </p>
            <button onClick={() => setJourneyModalOpen(true)} className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-lg">
              Start Your Journey
            </button>
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
