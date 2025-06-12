
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

const CustomerReviews = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear what our valued customers have to say about their experience with Nithin Constructions
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-6xl mx-auto animate-fade-in">
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
                  <Card className="hover-lift bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-8 h-8 text-primary opacity-30" />
                      </div>

                      {/* Review Text */}
                      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        "{review.review}"
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="text-sm text-primary">{review.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="gradient-construction text-white border-0 hover:opacity-80" />
            <CarouselNext className="gradient-construction text-white border-0 hover:opacity-80" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="gradient-construction rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Happy Customers</h3>
            <p className="text-xl mb-8 opacity-90">
              Experience the Nithin Constructions difference and become part of our success story.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
