import { DollarSign, Tag, Mic } from 'lucide-react'
import WaveDivider from '../ui/WaveDivider'

const props = [
  {
    icon: DollarSign,
    title: '$10 Off Every Month',
    subtitle: 'at Uncle Ben\'s Haircuts',
    desc: 'Automatic discount applied at checkout at any Uncle Ben\'s Haircuts location. No code needed.',
  },
  {
    icon: Tag,
    title: 'Exclusive Local Discounts',
    subtitle: 'Restaurants, gyms, auto, home services & more',
    desc: 'Save 15–75% at hand-picked Treasure Valley businesses. New deals added every week.',
  },
  {
    icon: Mic,
    title: 'Meet The Owners',
    subtitle: 'Weekly live Zoom calls',
    desc: 'Get direct access to real local business owners. Ask questions, hear their stories, build real relationships.',
  },
]

export default function ValueProps() {
  return (
    <section className="relative bg-gray-50 pb-28 pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="section-label">What You Get</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mt-2">
            More Than a Discount Card
          </h2>
          <div className="w-16 h-1 bg-maroon-700 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.map(({ icon: Icon, title, subtitle, desc }, i) => (
            <div key={i} className="bg-white border border-gray-100 shadow-sm p-8 group hover:border-maroon-200 hover:shadow-md transition-all duration-200">
              <div className="w-14 h-14 bg-maroon-700 group-hover:bg-maroon-700 rounded-full flex items-center justify-center mb-6 transition-colors duration-200">
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="font-heading text-xl uppercase text-maroon-900 mb-1">{title}</h3>
              <p className="text-gray-500 text-sm font-medium mb-3">{subtitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-maroon-700 text-white p-8 text-center">
          <p className="font-heading text-xl sm:text-2xl tracking-wide uppercase">
            Bringing the Power of Word-of-Mouth Marketing Back to Life
          </p>
        </div>
      </div>
    
      <WaveDivider fill="#4a2526" variant="curve" height={80} />
    </section>
  )
}
