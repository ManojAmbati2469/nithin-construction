
import { Card, CardContent } from '@/components/ui/card';
import { Building, Construction, Hammer, Wrench } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation();
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();

  // Counter animations for achievements
  const sqftCount = useCountUp(6, 2000, achievementsVisible);
  const projectsCount = useCountUp(26, 2500, achievementsVisible);
  const customersCount = useCountUp(400, 3000, achievementsVisible);
  const experienceCount = useCountUp(20, 1500, achievementsVisible);

  const achievements = [
    {
      icon: Building,
      number: `${sqftCount} Lakh+`,
      label: 'sq.ft Constructed',
      description: 'Successfully delivered across residential and commercial sectors'
    },
    {
      icon: Construction,
      number: projectsCount.toString(),
      label: 'Completed Projects',
      description: 'A milestone achieved by Nithin Construction'
    },
    {
      icon: Hammer,
      number: `${customersCount}+`,
      label: 'Happy Customers',
      description: 'Rejoicing in the pleasures of a splendid life'
    },
    {
      icon: Wrench,
      number: `${experienceCount}+`,
      label: 'Years Experience',
      description: 'Decades of expertise in construction and project management'
    }
  ];

  return (
    <section id="about" className="py-5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={aboutRef}>
          {/* Left Content */}
          <div className={`space-y-8 reveal-left ${aboutVisible ? 'visible' : ''}`}>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                About <span className="gradient-text">Nithin Constructions</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Established in 2002, with a banner as Ramana Planners had successfully completed 
                several projects after two years with further acceleration as course changed its 
                name to Ramana construction which has and became a mark in construction and real estate field.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Top-Notch in Construction and design is the mark of every Ramana constructions creation. 
                From planning to materials, construction skills to customer relations we speak perfection 
                everything we do. Our vision is to build a feature where in Ramana constructions is a 
                house hold name across the country, known worldwide for development and marketing of a 
                fine living environment with highest quality and unmatched value-for-money.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  'Expert team with 20+ years of experience',
                  'Quality materials and modern construction techniques',
                  'Timely project completion with transparent pricing',
                  'Comprehensive warranty and after-sales support',
                  'Eco-friendly and sustainable building practices'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 gradient-construction rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Achievements */}
          <div className={`grid grid-cols-2 gap-6 reveal-right ${aboutVisible ? 'visible' : ''}`} ref={achievementsRef}>
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.label} 
                className={`hover-lift border-0 shadow-lg bg-card reveal-scale reveal-stagger-${index + 1} ${achievementsVisible ? 'visible' : ''}`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 gradient-construction rounded-full flex items-center justify-center mx-auto">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold gradient-text">
                      {achievement.number}
                    </div>
                    <div className="font-semibold text-card-foreground">
                      {achievement.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Our Experience Section */}
        <div className={`mt-20 reveal-up ${experienceVisible ? 'visible' : ''}`} ref={experienceRef}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">About Our <span className="gradient-text">Experience</span></h3>
          </div>
          <div className="bg-card rounded-2xl p-8 lg:p-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-card-foreground">SRI. BOGIREDDY VENKATA RAMANA REDDY</strong> graduate in Civil engineering in 1998, 
              after graduation worked as Civil Contractor at RTPC, Karnataka up to 2002, after that returned to Hyderabad, 
              taken License as Civil Engineer in LB Nagar Municipality and started Consultancy named on RAMANA PLANNERS up to 2005, 
              then started Construction named as RAMANA CONSTRUCTIONS constructed 30 independent houses and 9 apartments, 
              approximately construction area 150000 sft and started new company in 2016 name as NITHIN CONSTRUCTIONS 
              constructed 6 apartments approximately 250000 sft and started new company in 2019 named as MEPRA PROJECTS 
              with another partner Smt.Vallela Praveena constructing 3 apartments and started new company in 2020 named as 
              JNR PROJECTS with two more partners named Smt.Vallela Praveena and Sri.G.V.Nalinikanth kumar Reddy constructing 2 apartments.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className={`mt-20 grid lg:grid-cols-2 gap-12 reveal-up ${missionVisible ? 'visible' : ''}`} ref={missionRef}>
          <div className="text-center p-8 gradient-construction rounded-2xl text-white hover-lift">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg opacity-90">
              We are passionate about designing buildings that embody our identity and create memorable experiences. 
              At Nithin Constructions, our culture is about more than constructing homes; we are in the business of building dreams. 
              Our mission is to be the most customer-focused builders.
            </p>
          </div>
          <div className="text-center p-8 bg-card rounded-2xl hover-lift">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h3>
            <p className="text-lg text-muted-foreground">
              Our vision, 'Building Moments,' reflects our dedication to society. Our top priority is ensuring customer 
              satisfaction through our unique designs, offerings, and construction quality. We aim to continue developing 
              projects that enhance our reputation as creators of homes and happiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
