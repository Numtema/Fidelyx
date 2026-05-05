import Link from "next/link";
import { Store, LayoutDashboard, CreditCard, Users, History, Megaphone, Target, Settings, HelpCircle, Bell, QrCode } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-bg-soft/50 font-sans md:p-3 gap-3">
      {/* Left Sidebar - Floating Bento Style */}
      <aside className="w-[260px] bg-white rounded-3xl border border-brand-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hidden md:flex flex-col flex-shrink-0 sticky top-3 h-[calc(100vh-24px)] overflow-hidden">
        <div className="p-6 pb-4 shrink-0">
          <Link className="flex items-center gap-3" href="/">
            <div className="bg-brand-shell text-white p-2 rounded-xl">
              <Store className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-brand-shell">FidelyX</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <div className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl bg-brand-shell text-white shadow-sm transition-all">
              <LayoutDashboard className="h-[18px] w-[18px]" />
              Home
            </Link>
            <Link href="/dashboard/builder" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
              <CreditCard className="h-[18px] w-[18px]" />
              Ma carte
            </Link>
            <Link href="/dashboard/qr" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
              <QrCode className="h-[18px] w-[18px]" />
              QR Code
            </Link>
            <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
              <Users className="h-[18px] w-[18px]" />
              Clients
            </Link>
            <Link href="/dashboard/transactions" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
              <History className="h-[18px] w-[18px]" />
              Historique
            </Link>
            <Link href="/dashboard/offers" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
              <Megaphone className="h-[18px] w-[18px]" />
              Offres
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="px-4 text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3">Settings</h3>
            <div className="space-y-1">
              <Link href="/staff" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
                <Users className="h-[18px] w-[18px]" />
                Team
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-brand-text-secondary hover:bg-brand-surface-muted transition-all">
                <Settings className="h-[18px] w-[18px]" />
                Paramètres
              </Link>
            </div>
          </div>
        </div>

        <div className="p-5 mt-auto shrink-0">
          <div className="bg-[#f0f4ec] rounded-2xl p-4 flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-brand-shell text-white flex items-center justify-center font-bold text-sm shrink-0">
               T
             </div>
             <div className="min-w-0">
               <p className="font-bold text-sm text-brand-shell truncate">Le Bon Tacos</p>
               <p className="text-xs text-brand-text-secondary truncate">Plan Starter</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent rounded-3xl overflow-hidden relative">
        {/* Top bar floating */}
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 bg-brand-bg-soft/50 backdrop-blur-md">
          <div className="flex flex-col">
             <h1 className="font-display font-bold text-2xl text-brand-shell">Overview</h1>
             <p className="text-sm text-brand-text-secondary font-medium">Manage your loyalty program</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-full border border-brand-border/50 shadow-sm">
            <div className="flex items-center px-4 border-r border-brand-border/40">
               <span className="text-sm font-semibold text-brand-shell">09:41 AM</span>
            </div>
            <button className="h-10 w-10 text-brand-shell hover:bg-brand-surface-soft rounded-full transition-colors flex items-center justify-center relative">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-brand-danger ring-2 ring-white" />
            </button>
            <div className="h-10 w-10 rounded-full bg-brand-accent text-brand-shell flex items-center justify-center font-bold shadow-inner border border-brand-accent-strong/20">
              LBT
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
