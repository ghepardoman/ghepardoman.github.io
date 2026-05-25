import Link from 'next/link'
import { CircuitBackground } from '@/components/circuit-background'
import { CircuitSchematic } from '@/components/circuit-schematic'
import { ArrowLeft, Search, Download, Settings, FolderCog, Package, HardDrive, Monitor, RefreshCcw, Trash2 } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Distro Detection',
    description: 'Reads /etc/os-release to identify your distribution family and selects the correct installation path.',
    code: 'cat /etc/os-release'
  },
  {
    icon: Trash2,
    title: 'Remove Conflicting Packages',
    description: 'Checks for and removes any existing Wine installations that may conflict with the required version.',
    code: null
  },
  {
    icon: Download,
    title: 'Install Wine',
    description: 'Installs Wine using your distro\'s package manager. Arch uses Chaotic AUR, Debian/Ubuntu uses apt, Fedora uses dnf, openSUSE uses zypper.',
    code: null
  },
  {
    icon: FolderCog,
    title: 'Wine Prefix Setup',
    description: 'Creates a dedicated 32-bit Wine prefix at ~/.multisim32, isolated from your default Wine environment, configured with Windows XP compatibility mode.',
    code: 'WINEARCH=win32 WINEPREFIX="$HOME/.multisim32" winecfg -v winxp'
  },
  {
    icon: Package,
    title: 'Wine Dependencies',
    description: 'Installs required components via winetricks: corefonts (Microsoft core fonts), mdac27 (Data Access Components), jet40 (Jet 4.0 database engine).',
    code: 'winetricks corefonts mdac27 jet40'
  },
  {
    icon: HardDrive,
    title: 'Download & Install Multisim',
    description: 'Downloads the official NI Circuit Design Suite 14.0 installer from National Instruments\' servers, extracts it, and runs it through Wine.',
    code: null
  },
  {
    icon: Monitor,
    title: 'Desktop Launcher Fix',
    description: 'Automatically patches the .desktop file to ensure it uses the correct Wine prefix and wine32 binary when launched from your application menu.',
    code: null
  },
  {
    icon: RefreshCcw,
    title: 'Cleanup & Reboot',
    description: 'Removes the downloaded ZIP and extracted installer directory, then prompts for a system reboot.',
    code: null
  }
]

const troubleshooting = [
  {
    issue: 'Multisim not appearing in launcher',
    solution: 'Run: update-desktop-database ~/.local/share/applications'
  },
  {
    issue: 'Arch Linux package conflicts',
    solution: 'If a wine-* package gets wrongly queried, remove it manually before re-running the script'
  },
  {
    issue: 'openSUSE winedbg popup',
    solution: 'The forceClosewinedbg.sh script handles this during install. After reboot, close the winedbg window manually.'
  },
  {
    issue: 'Wine prefix location',
    solution: 'The prefix is stored at ~/.multisim32 and is completely separate from any existing Wine setup.'
  }
]

export default function DocsPage() {
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
            How It <span className="text-[#2b1c61]">Works</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            A deep dive into what the installation script does under the hood. Understanding this will help you troubleshoot any issues.
          </p>

          {/* Process Steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Settings className="w-6 h-6 text-[#2b1c61]" />
              Installation Process
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex gap-6">
                    {/* Step number */}
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-[#2b1c61]/10 border border-[#2b1c61]/30 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-[#2b1c61]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-3">{step.description}</p>
                      {step.code && (
                        <code className="block px-4 py-2 rounded-lg bg-card border border-border font-mono text-sm text-[#2b1c61]">
                          {step.code}
                        </code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why 14.0 */}
          <section className="mb-16 p-6 rounded-xl border border-[#2b1c61]/30 bg-[#2b1c61]/5">
            <h2 className="text-xl font-bold mb-4">Why Multisim 14.0?</h2>
            <p className="text-muted-foreground mb-6">
              Multisim 14.0 is the newest version that works reliably on Linux with minimal issues while still including most of the features available in Multisim 14.3. Newer versions have compatibility problems with Wine that make them unstable for daily use.
            </p>
            <CircuitSchematic className="w-full max-w-lg mx-auto opacity-60" />
            <a 
              href="https://lina.moe/MultiSIM.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#2b1c61] hover:underline"
            >
              Read more about version compatibility →
            </a>
          </section>

          {/* Troubleshooting */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Troubleshooting</h2>
            <div className="grid gap-4">
              {troubleshooting.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card/50">
                  <h3 className="font-semibold mb-2">{item.issue}</h3>
                  <p className="text-sm text-muted-foreground">{item.solution}</p>
                </div>
              ))}
            </div>
          </section>

          {/* License Notice */}
          <section className="p-6 rounded-xl border border-border bg-card/50">
            <h2 className="text-xl font-bold mb-4">License Notice</h2>
            <p className="text-muted-foreground text-sm">
              This project is released for educational and personal use. NI Multisim is proprietary software owned by National Instruments — ensure you have a valid license before use.
            </p>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/50">
            <Link
              href="/distros"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Previous</span>
              <div className="font-semibold">← Supported Distros</div>
            </Link>
            <Link
              href="/install"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Get started</span>
              <div className="font-semibold">Installation Guide →</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
