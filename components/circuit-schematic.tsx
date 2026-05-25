'use client'

export function CircuitSchematic({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 400 200" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(43,28,97,0.1)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#grid)" />

      {/* Circuit traces */}
      <g stroke="#2b1c61" strokeWidth="2" strokeLinecap="round">
        {/* Main horizontal line */}
        <path d="M 20 100 H 80" className="animate-trace" style={{ strokeDasharray: 1000 }} />
        
        {/* Resistor */}
        <path d="M 80 100 L 90 90 L 100 110 L 110 90 L 120 110 L 130 90 L 140 110 L 150 100" />
        
        {/* Connection to capacitor */}
        <path d="M 150 100 H 180" />
        
        {/* Capacitor */}
        <line x1="180" y1="80" x2="180" y2="120" strokeWidth="3" />
        <line x1="190" y1="80" x2="190" y2="120" strokeWidth="3" />
        
        {/* Continue line */}
        <path d="M 190 100 H 220" />
        
        {/* Inductor/Coil */}
        <path d="M 220 100 Q 230 80 240 100 Q 250 120 260 100 Q 270 80 280 100 Q 290 120 300 100" />
        
        {/* Output */}
        <path d="M 300 100 H 380" />
        
        {/* Ground symbols */}
        <g transform="translate(50, 100)">
          <line x1="0" y1="0" x2="0" y2="30" />
          <line x1="-10" y1="30" x2="10" y2="30" />
          <line x1="-6" y1="36" x2="6" y2="36" />
          <line x1="-2" y1="42" x2="2" y2="42" />
        </g>
        
        {/* Op-amp triangle */}
        <g transform="translate(240, 140)">
          <path d="M 0 0 L 40 20 L 0 40 Z" fill="none" />
          <text x="15" y="24" fontSize="10" fill="#2b1c61">+</text>
          <text x="15" y="16" fontSize="10" fill="#2b1c61">−</text>
        </g>
      </g>

      {/* Nodes/connection points */}
      <g fill="#22c55e">
        <circle cx="80" cy="100" r="4" className="animate-pulse" />
        <circle cx="150" cy="100" r="4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="220" cy="100" r="4" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        <circle cx="300" cy="100" r="4" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
      </g>

      {/* Labels */}
      <g fill="rgba(43,28,97,0.7)" fontSize="10" fontFamily="monospace">
        <text x="100" y="75">R1</text>
        <text x="175" y="70">C1</text>
        <text x="250" y="75">L1</text>
        <text x="20" y="95">Vin</text>
        <text x="350" y="95">Vout</text>
      </g>
    </svg>
  )
}
