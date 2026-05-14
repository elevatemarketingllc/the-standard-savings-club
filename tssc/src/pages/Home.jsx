import Hero from '../components/sections/Hero'
import ValueProps from '../components/sections/ValueProps'
import HowItWorks from '../components/sections/HowItWorks'
import MissionSection from '../components/sections/MissionSection'
import Partners from '../components/sections/Partners'
import Pricing from '../components/sections/Pricing'
import ForBusinesses from '../components/sections/ForBusinesses'
import SEO from '../components/SEO'
import CallToAction from '../components/sections/CallToAction'

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <MissionSection />
      <Partners />
      <Pricing />
      <ForBusinesses />
      <CallToAction />
    </>
  )
}
