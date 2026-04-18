// Reusable wave divider component
// topColor and bottomColor are hex values or CSS color strings
export default function WaveDivider({ topColor, bottomColor, variant = 'wave', flip = false, height = 80 }) {
  const paths = {
    wave: `M0,${height} C360,0 720,${height*1.5} 1440,${height*0.3} L1440,0 L0,0 Z`,
    wave2: `M0,${height*0.5} C240,${height*1.2} 480,0 720,${height*0.6} C960,${height*1.1} 1200,${height*0.2} 1440,${height*0.7} L1440,0 L0,0 Z`,
    tilt: `M0,${height} L1440,0 L1440,0 L0,0 Z`,
    curve: `M0,${height} Q720,0 1440,${height} L1440,0 L0,0 Z`,
    peaks: `M0,${height} L240,${height*0.2} L480,${height*0.8} L720,${height*0.1} L960,${height*0.9} L1200,${height*0.3} L1440,${height*0.7} L1440,0 L0,0 Z`,
  }

  const path = paths[variant] || paths.wave

  return (
    <div className="relative w-full overflow-hidden leading-none" style={{ marginTop: `-${flip ? 0 : 2}px`, marginBottom: `-${flip ? 2 : 0}px` }}>
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: `${height}px`, display: 'block', transform: flip ? 'scaleY(-1)' : 'none', background: flip ? bottomColor : topColor }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} fill={flip ? topColor : bottomColor} />
      </svg>
    </div>
  )
}
