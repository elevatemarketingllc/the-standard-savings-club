// Place this INSIDE a section with `relative overflow-hidden` 
// at position="bottom" or "top"
// fill = the color that appears IN the wave shape (i.e. next section's bg color)
export default function WaveDivider({ fill, variant = 'wave', position = 'bottom', height = 80 }) {
  const w = 1440
  const h = height

  const paths = {
    wave:   `M0,${h*0.4} C320,${h*1.1} 720,0 1080,${h*0.6} C1260,${h*0.9} 1380,${h*0.3} ${w},${h*0.5} L${w},${h} L0,${h} Z`,
    wave2:  `M0,${h*0.7} C200,${h*0.1} 500,${h} 800,${h*0.4} C1000,${h*0.05} 1250,${h*0.85} ${w},${h*0.5} L${w},${h} L0,${h} Z`,
    curve:  `M0,${h*0.6} Q${w/2},0 ${w},${h*0.6} L${w},${h} L0,${h} Z`,
    tilt:   `M0,${h} L${w},0 L${w},${h} Z`,
    peaks:  `M0,${h} L180,${h*0.25} L360,${h*0.7} L${w/2},${h*0.1} L780,${h*0.65} L1000,${h*0.2} L1200,${h*0.55} L${w},${h*0.3} L${w},${h} Z`,
  }

  const isBottom = position === 'bottom'
  const path = paths[variant] || paths.wave

  return (
    <div
      className="absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none"
      style={{
        bottom: isBottom ? 0 : 'auto',
        top: isBottom ? 'auto' : 0,
        height: `${h}px`,
        transform: isBottom ? 'none' : 'scaleY(-1)',
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  )
}
