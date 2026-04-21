import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { ProductPreview } from '@/components/ProductPreview';
import { HowItWorks } from '@/components/how-it-works';

import { UseCases } from '@/components/UseCases';
import { TrustedBy } from '@/components/TrustedBy';
import { WhySwitch } from '@/components/WhySwitch';

import { ProblemSolution } from '@/components/ProblemSolution';

import { Testimonials } from '@/components/testimonials';
import { Pricing } from '@/components/pricing';
import { CTASection } from '@/components/cta-section';

import { Contact } from '@/components/contactUs';
import { Footer } from '@/components/footer';
import { About } from '@/components/aboutUs';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <About/>
      <ProblemSolution/>
      <UseCases />
      <ProductPreview />
      <Features />
      
      
     
      <WhySwitch />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Contact/>
      <Footer />
    </main>
  );
}
