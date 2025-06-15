
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CurrentProject from '@/components/CurrentProject';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import CustomerReviews from '@/components/CustomerReviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen no-overflow-x">
      <Header />
      <Hero />
      <About />
      <CurrentProject />
      <Services />
      <Projects />
      <CustomerReviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
