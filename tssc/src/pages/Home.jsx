import Hero from '../components/sections/Hero'
import ValueProps from '../components/sections/ValueProps'
import HowItWorks from '../components/sections/HowItWorks'
import Partners from '../components/sections/Partners'
import Pricing from '../components/sections/Pricing'
import ForBusinesses from '../components/sections/ForBusinesses'
import CallToAction from '../components/sections/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <Partners />
      <Pricing />
      <ForBusinesses />
      <CallToAction />
    </>
  )
}
