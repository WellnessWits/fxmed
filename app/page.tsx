import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MobileCare from '@/components/MobileCare'
import QuizSection from '@/components/QuizSection'
import Programs from '@/components/Programs'
import Pricing from '@/components/Pricing'
import CorporateWellness from '@/components/CorporateWellness'
import VideoSection from '@/components/VideoSection'
import PhotoGallery from '@/components/PhotoGallery'
import FreshPerspectives from '@/components/FreshPerspectives'
import PatientStories from '@/components/PatientStories'
import HealthCTA from '@/components/HealthCTA'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <MobileCare />
      <QuizSection />
      <Programs />
      <Pricing />
      <CorporateWellness />
      <VideoSection />
      <PhotoGallery />
      <FreshPerspectives />
      <PatientStories />
      <HealthCTA />
      <Footer />
      <AIChat />
    </main>
  )
}
