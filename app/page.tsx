import Link from 'next/link'
import { CircuitBackground } from '@/components/circuit-background'
import { Oscilloscope } from '@/components/oscilloscope'
import { Terminal } from '@/components/terminal'
import { ArrowRight, Cpu, Terminal as TerminalIcon, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-20 bg-transparent">
      <CircuitBackground />
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-[#2b1c61]/30 bg-[#2b1c61]/10 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-mono text-muted-foreground">v14.0 Stable Release</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="text-foreground">NI Multisim</span>
                <br />
                <span className="text-[#2b1c61]">on Linux.</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Built for engineers and students who rely on circuit simulation daily but refuse to abandon their Linux setup. One script. Zero compromises.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#2b1c61] text-white font-medium hover:bg-[#3d2a7a] transition-colors glow-accent"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://github.com/ghepardoman/NI-Multisim-14-for-Linux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border bg-card hover:bg-secondary transition-colors font-medium"
                >
                  View Source
                </a>
              </div>

              {/* Quick stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-foreground">4+</div>
                  <div className="text-sm text-muted-foreground">Distros Supported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1</div>
                  <div className="text-sm text-muted-foreground">Script to Run</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Automated</div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur overflow-hidden">
                {/* Oscilloscope display */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">SIGNAL MONITOR</span>
                  </div>
                  <Oscilloscope className="w-full rounded border border-border/50" />
                </div>
                
                {/* Terminal preview */}
                <Terminal 
                  commands={[
                    'git clone https://github.com/ghepardoman/NI-Multisim-14-for-Linux.git',
                    'cd NI-Multisim-14-for-Linux',
                    './install.sh'
                  ]}
                  className="border-0 rounded-none"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#2b1c61]/30 rounded-lg rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-[#2b1c61]/20 rounded-lg -rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-24 border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Circuit simulation,{' '}
              <span className="text-[#2b1c61]">your way</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run Multisim on Linux, handled automatically by a single bash script.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TerminalIcon,
                title: 'One Command',
                description: 'Clone, chmod, run. That\'s it. The script handles everything else.'
              },
              {
                icon: Cpu,
                title: 'Multi-Distro',
                description: 'Works on Arch, Ubuntu, Fedora, and openSUSE out of the box.'
              },
              {
                icon: Shield,
                title: 'Isolated Prefix',
                description: 'Dedicated Wine prefix at ~/.multisim32 keeps your system clean.'
              },
              {
                icon: Zap,
                title: 'Auto Dependencies',
                description: 'Wine, winetricks, fonts, MDAC, Jet 4.0 — all handled.'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2b1c61]/10 border border-[#2b1c61]/20 flex items-center justify-center mb-4 group-hover:bg-[#2b1c61]/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-[#2b1c61]" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 border-t border-border/50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full border border-[#2b1c61]/30 bg-[#2b1c61]/5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#2b1c61]">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Ready to simulate?</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Start designing circuits on Linux today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join engineers and students who&apos;ve already made the switch. Full Multisim functionality without dual-booting or VMs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/install"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-[#2b1c61] text-white font-medium hover:bg-[#3d2a7a] transition-colors glow-accent"
            >
              Installation Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border border-border bg-card hover:bg-secondary transition-colors font-medium"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border/50">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono">MULTISIM/LINUX</span>
            <span>•</span>
            <span>By Giovanni De Rosa & Lorenzo Pappalardo</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/ghepardoman/NI-Multisim-14-for-Linux" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
