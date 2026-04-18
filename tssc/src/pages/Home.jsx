import Hero from '../components/sections/Hero'
import ValueProps from '../components/sections/ValueProps'
import HowItWorks from '../components/sections/HowItWorks'
import Partners from '../components/sections/Partners'
import Pricing from '../components/sections/Pricing'
import ForBusinesses from '../components/sections/ForBusinesses'
import CallToAction from '../components/sections/CallToAction'
import WaveDivider from '../components/ui/WaveDivider'

const MAROON = '#4a2526'
const WHITE  = '#ffffff'
const GRAY   = '#f9fafb'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Hero (maroon) → ValueProps (gray) */}
      <WaveDivider topColor={MAROON} bottomColor={GRAY} variant="wave" height={70} />

      <ValueProps />

      {/* ValueProps (gray) → HowItWorks (maroon) */}
      <WaveDivider topColor={GRAY} bottomColor={MAROON} variant="curve" height={70} />

      <HowItWorks />

      {/* HowItWorks (maroon) → Partners (white) */}
      <WaveDivider topColor={MAROON} bottomColor={WHITE} variant="wave2" height={80} />

      <Partners />

      {/* Partners (white) → Pricing (maroon) */}
      <WaveDivider topColor={WHITE} bottomColor={MAROON} variant="tilt" height={60} />

      <Pricing />

      {/* Pricing (maroon) → ForBusinesses (gray) */}
      <WaveDivider topColor={MAROON} bottomColor={GRAY} variant="wave" height={70} />

      <ForBusinesses />

      {/* ForBusinesses (gray) → CTA (maroon) */}
      <WaveDivider topColor={GRAY} bottomColor={MAROON} variant="peaks" height={60} />

      <CallToAction />
    </>
  )
}
