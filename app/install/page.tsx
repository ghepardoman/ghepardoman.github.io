import Link from 'next/link'
import { CircuitBackground } from '@/components/circuit-background'
import { Terminal } from '@/components/terminal'
import { ArrowLeft, AlertTriangle, CheckCircle2, Copy } from 'lucide-react'

export default function InstallPage() {
  return (
    <main className="min-h-screen pt-20">
      <CircuitBackground />
      
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Installation <span className="text-[#2b1c61]">Guide</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Get Multisim running on your Linux machine in under 10 minutes. The installer handles everything automatically.
          </p>

          {/* Prerequisites */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2b1c61]/20 border border-[#2b1c61]/30 flex items-center justify-center text-sm font-mono">0</span>
              Prerequisites
            </h2>
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <p className="text-muted-foreground mb-4">Make sure you have these installed on your system:</p>
              <div className="flex flex-wrap gap-3">
                {['wget', 'unzip', 'git'].map((tool) => (
                  <code key={tool} className="px-3 py-1.5 rounded-md bg-secondary border border-border font-mono text-sm">
                    {tool}
                  </code>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Most distributions have these pre-installed. If not, install them via your package manager.
              </p>
            </div>
          </section>

          {/* Step 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2b1c61]/20 border border-[#2b1c61]/30 flex items-center justify-center text-sm font-mono">1</span>
              Clone the Repository
            </h2>
            <Terminal 
              commands={[
                'git clone https://github.com/ghepardoman/NI-Multisim-14-for-Linux.git',
                'cd NI-Multisim-14-for-Linux'
              ]}
              className="mb-4"
            />
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2b1c61]/20 border border-[#2b1c61]/30 flex items-center justify-center text-sm font-mono">2</span>
              Make it Executable
            </h2>
            <Terminal 
              commands={['chmod +x install.sh']}
              className="mb-4"
            />
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2b1c61]/20 border border-[#2b1c61]/30 flex items-center justify-center text-sm font-mono">3</span>
              Run the Installer
            </h2>
            <Terminal 
              commands={['./install.sh']}
              className="mb-4"
            />
            
            {/* Warning */}
            <div className="flex gap-4 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 mt-6">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-500 mb-1">Do not run as root</p>
                <p className="text-sm text-muted-foreground">
                  The script uses <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground">sudo</code> internally where needed. Running the entire script as root may cause permission issues with your Wine prefix.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2b1c61]/20 border border-[#2b1c61]/30 flex items-center justify-center text-sm font-mono">4</span>
              Reboot Your System
            </h2>
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <p className="text-muted-foreground mb-4">
                After the installation completes, reboot your system to ensure all changes take effect properly.
              </p>
              <div className="flex items-center gap-3 text-green-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Multisim should now appear in your application launcher</span>
              </div>
            </div>
          </section>

          {/* Quick Copy Section */}
          <section className="p-6 rounded-xl border border-[#2b1c61]/30 bg-[#2b1c61]/5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Quick Install (Copy & Paste)
            </h3>
            <div className="font-mono text-sm bg-card rounded-lg p-4 border border-border overflow-x-auto">
              <code className="text-muted-foreground">
                git clone https://github.com/ghepardoman/NI-Multisim-14-for-Linux.git && cd NI-Multisim-14-for-Linux && chmod +x install.sh && ./install.sh
              </code>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/50">
            <Link
              href="/distros"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Next</span>
              <div className="font-semibold">Supported Distros →</div>
            </Link>
            <Link
              href="/docs"
              className="flex-1 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-[#2b1c61]/30 transition-all"
            >
              <span className="text-sm text-muted-foreground">Learn more</span>
              <div className="font-semibold">How It Works →</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
