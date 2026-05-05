import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, QrCode, Smartphone, BarChart3, Store, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9faf6] font-sans selection:bg-[#DCECA9] selection:text-[#1B3D0A]">
      {/* Header Floating */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-6 h-16 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Link className="flex items-center justify-center gap-3 group" href="#">
            <div className="bg-[#1B3D0A] text-white p-2 rounded-xl group-hover:bg-[#a5ff4d] group-hover:text-[#1B3D0A] transition-colors">
              <Store className="h-5 w-5" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-[#1B3D0A]">FidelyX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-bold text-[#1B3D0A]/60 hover:text-[#1B3D0A] transition-colors" href="#features">
              Features
            </Link>
            <Link className="text-sm font-bold text-[#1B3D0A]/60 hover:text-[#1B3D0A] transition-colors" href="#how-it-works">
              How it works
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="hidden sm:inline-flex font-bold text-[#1B3D0A] hover:bg-[#f0f4ec] rounded-full px-6">Login</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button className="bg-[#1B3D0A] hover:bg-black text-white font-bold rounded-full px-6 h-10 shadow-md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-16 px-4">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto w-full mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center rounded-full border border-black/5 bg-white px-3 py-1.5 text-sm font-bold text-[#1B3D0A] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#a5ff4d] mr-2 animate-pulse"></span>
                Smart loyalty for local businesses
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-[80px] font-display font-black text-[#1B3D0A] leading-[0.95] tracking-tighter">
                Grow your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3D0A] to-[#458B1B]">store's revenue.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#1B3D0A]/70 font-medium leading-relaxed max-w-md">
                FidelyX helps small businesses bring customers back without complicated apps, expensive standard POS integrations, or coding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard" passHref>
                  <Button className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-[#a5ff4d] hover:bg-[#8ade3a] text-[#1B3D0A] rounded-full shadow-[0_0_40px_rgba(165,255,77,0.4)] transition-all transform hover:scale-105">
                    Build your Card
                  </Button>
                </Link>
              </div>
              <div className="flex items-center flex-wrap gap-6 text-sm font-bold text-[#1B3D0A]/60 pt-4">
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1B3D0A]" /> No commitment</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1B3D0A]" /> No hardware</div>
              </div>
            </div>

            {/* Hero Visuals / Bento Style */}
            <div className="relative h-[600px] hidden lg:block">
               {/* Abstract background blobs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DCECA9]/50 rounded-full blur-[80px] -z-10" />
               
               {/* Mock dashboard card 1 */}
               <div className="absolute top-10 right-0 w-[340px] bg-white rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-black/5 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#f0f4ec] flex items-center justify-center">
                           <span className="font-black text-[#1B3D0A]">LBT</span>
                        </div>
                        <div>
                           <p className="font-bold text-[#1B3D0A] leading-tight">Le Bon Tacos</p>
                           <p className="text-xs text-[#1B3D0A]/50 font-bold">Loyalty Card</p>
                        </div>
                     </div>
                     <QrCode className="h-8 w-8 text-[#1B3D0A]" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                     {[...Array(8)].map((_, i) => (
                        <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border-2 ${i < 3 ? 'border-[#a5ff4d] bg-[#a5ff4d]/20 text-[#1B3D0A]' : 'border-[#f0f4ec] bg-[#f9faf6]'}`}>
                           {i < 3 && <Star className="h-5 w-5 fill-[#1B3D0A] text-[#1B3D0A]" />}
                        </div>
                     ))}
                  </div>
                  <div className="bg-[#1B3D0A] text-white rounded-2xl p-4 text-center cursor-pointer">
                     <p className="font-bold text-sm">Add to Apple Wallet</p>
                  </div>
               </div>

               {/* Mock dashboard card 2 */}
               <div className="absolute bottom-20 left-10 w-[280px] bg-[#1B3D0A] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform -rotate-6 hover:-rotate-0 transition-transform duration-500 z-30">
                  <div className="flex justify-between items-start mb-8">
                     <div className="bg-[#a5ff4d] p-3 rounded-2xl">
                        <BarChart3 className="h-6 w-6 text-[#1B3D0A]" />
                     </div>
                     <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">+18%</span>
                  </div>
                  <p className="text-white/70 font-bold text-sm mb-1">Return Rate</p>
                  <h3 className="text-5xl font-black text-white">42%</h3>
               </div>
               
               {/* Decorative Element */}
               <div className="absolute top-1/2 left-0 w-24 h-24 bg-[#DCECA9] rounded-[24px] shadow-lg transform -rotate-12 -translate-x-12 flex items-center justify-center z-10 border border-white">
                  <Zap className="h-10 w-10 text-[#1B3D0A]" />
               </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section id="features" className="max-w-[1200px] mx-auto w-full mb-32">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#1B3D0A] mb-6">Everything you need to grow</h2>
            <p className="text-[#1B3D0A]/70 font-medium text-xl">
              A mini growth-engine tailored for local businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Bento Box 1 - Span 2 */}
            <div className="md:col-span-2 bg-[#DCECA9] p-8 md:p-12 rounded-[40px] flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10 max-w-md">
                 <h3 className="text-3xl font-black mb-4 text-[#1B3D0A]">Smart CRM & Analytics</h3>
                 <p className="text-[#1B3D0A]/80 font-medium text-lg mb-8">
                   Identify your best customers, track visit frequency, and see the exact revenue generated by your loyalty program in real-time.
                 </p>
                 <Link href="/dashboard" passHref>
                    <Button variant="ghost" className="rounded-full bg-white text-[#1B3D0A] hover:bg-white/90 font-bold px-6 h-12 shadow-sm">
                       Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </div>
              <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] bg-white rounded-tl-[40px] shadow-2xl border border-black/5 p-6 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500">
                 {/* Fake UI */}
                 <div className="h-8 w-2/3 bg-[#f0f4ec] rounded-lg mb-4" />
                 <div className="flex gap-4 mb-4">
                    <div className="h-24 w-24 bg-[#a5ff4d] rounded-2xl" />
                    <div className="flex-1 space-y-2">
                       <div className="h-6 w-full bg-[#f0f4ec] rounded-md" />
                       <div className="h-6 w-4/5 bg-[#f0f4ec] rounded-md" />
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Bento Box 2 */}
            <div className="bg-white border border-black/5 shadow-sm p-8 md:p-10 rounded-[40px] flex flex-col items-start hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-3xl bg-[#f0f4ec] flex items-center justify-center mb-8">
                <Smartphone className="h-8 w-8 text-[#1B3D0A]" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-[#1B3D0A]">No App Required</h3>
              <p className="text-[#1B3D0A]/70 font-medium">
                Customers simply scan a QR code holding their phone camera. The card lives instantly in their browser.
              </p>
            </div>

            {/* Bento Box 3 */}
            <div className="bg-[#1B3D0A] p-8 md:p-10 rounded-[40px] flex flex-col items-start shadow-xl text-white">
              <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center mb-8">
                <Zap className="h-8 w-8 text-[#a5ff4d]" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white">Automated Winbacks</h3>
              <p className="text-white/70 font-medium">
                FidelyX automatically detects customers who haven't visited in a while and sends them targeted offers.
              </p>
            </div>
            
            {/* Bento Box 4 - Span 2 */}
            <div className="md:col-span-2 bg-white border border-black/5 shadow-sm p-8 md:p-12 rounded-[40px] flex md:flex-row flex-col items-center gap-8 hover:shadow-lg transition-shadow">
               <div className="flex-1">
                 <h3 className="text-3xl font-black mb-4 text-[#1B3D0A]">Easy Setup</h3>
                 <p className="text-[#1B3D0A]/70 font-medium text-lg mb-6 max-w-md">
                   Customize your rules, brand colors, and logo in seconds. Print your unique QR code display and you're ready to reward.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3 font-bold text-[#1B3D0A]/80">
                       <CheckCircle className="h-5 w-5 text-[#a5ff4d]" /> 100% cloud based
                    </li>
                    <li className="flex items-center gap-3 font-bold text-[#1B3D0A]/80">
                       <CheckCircle className="h-5 w-5 text-[#a5ff4d]" /> Works alongside any POS
                    </li>
                 </ul>
               </div>
               <div className="flex-shrink-0 w-full max-w-[240px] aspect-[9/16] bg-[#f9faf6] border-8 border-white shadow-xl rounded-[32px] overflow-hidden flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-[#DCECA9]/30">
                     <QrCode className="h-32 w-32 text-[#1B3D0A]" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1200px] mx-auto w-full mb-16">
          <div className="bg-[#a5ff4d] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-[#1B3D0A] leading-tight">Ready to boost your retention?</h2>
              <p className="text-[#1B3D0A]/80 text-xl font-medium mb-10">Join smart merchants who grew their repeat business without headaches.</p>
              <Link href="/dashboard" passHref>
                <Button className="bg-[#1B3D0A] hover:bg-black text-white h-16 px-10 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  Create your first card
                </Button>
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-white/30 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-black/5 py-12 pb-24 md:pb-12 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#1B3D0A] text-white p-1.5 rounded-lg">
              <Store className="h-4 w-4" />
            </div>
            <span className="font-display font-black text-[#1B3D0A] text-lg">FidelyX</span>
          </div>
          <p className="text-sm font-bold text-[#1B3D0A]/50">
            &copy; 2026 FidelyX. Built for local champs.
          </p>
          <div className="flex gap-6">
            <Link className="text-sm font-bold text-[#1B3D0A]/60 hover:text-[#1B3D0A] transition-colors" href="#">Terms</Link>
            <Link className="text-sm font-bold text-[#1B3D0A]/60 hover:text-[#1B3D0A] transition-colors" href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
