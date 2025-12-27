import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedSchools from '@/components/home/FeaturedSchools'
import InteractiveMap from '@/components/map/InteractiveMap'
import HowItWorks from '@/components/home/HowItWorks'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedSchools />
        <InteractiveMap />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}