import Link from 'next/link'
import { CircuitBackground } from '@/components/circuit-background'
import { ArrowLeft, CheckCircle2, AlertCircle, Info } from 'lucide-react'

const distros = [
  {
    name: 'Arch Linux',
    family: 'Arch',
    color: '#1793d1',
    icon: '🔵',
    method: 'Chaotic AUR (wine-stable, recommended) or AUR via yay',
    notes: [
      'Prompted to choose between Chaotic AUR (fast, pre-built) or AUR (compile from source)',
      'Chaotic AUR is strongly recommended for faster installation',
      'May encounter package query issues with wine-* packages'
    ],
    status: 'tested'
  },
  {
    name: 'Ubuntu / Debian',
    family: 'Debian',
    color: '#dd4814',
    icon: '🟠',
    method: 'apt — installs wine, wine32, wine64, libwine',
    notes: [
      'Desktop launcher automatically patched for correct Wine prefix',
      'Tested on Ubuntu, should work on Debian and Mint'
    ],
    status: 'tested'
  },
  {
    name: 'Fedora / RHEL',
    family: 'Red Hat',
    color: '#cc0000',
    icon: '🔴',
    method: 'dnf — installs wine, wine-core.i686',
    notes: [
      'Desktop launcher fix applied automatically',
      'Works on Fedora, may work on RHEL-based distros'
    ],
    status: 'tested'
  },
  {
    name: 'openSUSE',
    family: 'SUSE',
    color: '#73ba25',
    icon: '🟢',
    method: 'zypper — installs wine',
    notes: [
      'May experience winedbg popup issues during installation',
      'Included forceClosewinedbg.sh script handles this automatically',
      'After reboot, close winedbg window manually when launching Multisim'
    ],
    status: 'tested'
  }
]

export default function DistrosPage() {
  return (
    <main className="min-h-screen pt-20">
      <CircuitBackground />
      
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Supported <span className="text-[#2b1c61]">Distributions</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            The installer automatically detects your distribution and uses the appropriate package manager and configuration.
          </p>

          {/* Distro Cards */}
          <div className="grid gap-6 mb-12">
            {distros.map((distro) => (
              <div 
                key={distro.name}
                className="group rounded-xl border border-border bg-card/50 hover:bg-card transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${distro.color}15`, border: `1px solid ${distro.color}30` }}
                      >
                        {distro.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{distro.name}</h3>
                        <p className="text-sm text-muted-foreground">{distro.family} Family</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Tested
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Installation Method:</span>
                    <p className="font-mono text-sm mt-1 p-2 rounded bg-secondary/50 border border-border">
                      {distro.method}
                    </p>
                  </div>

                  {distro.notes.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground mb-2 block">Notes:</span>
                      <ul className="space-y-2">
                        {distro.notes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Info className="w-4 h-4 text-[#2b1c61] shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Other Distros Notice */}
          <div className="p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-500 mb-2">Other Distributions</h3>
                <p className="text-muted-foreground mb-4">
                  The installer only supports the distributions listed above. If you&apos;re running a different distro, you may need to:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Manually install Wine and winetricks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Create the Wine prefix manually
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Adapt the script for your package manager
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/50">
            <Link
              href="/install"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Previous</span>
              <div className="font-semibold">← Installation Guide</div>
            </Link>
            <Link
              href="/docs"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Next</span>
              <div className="font-semibold">Documentation →</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
