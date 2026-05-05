"use client"

import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Gift, CreditCard, ArrowRight, UserCheck, UserMinus, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useStore } from "@/lib/store";
import Link from "next/link";

const data = [
  { name: 'Juin', visits: 400, inscriptions: 240, rewards: 20 },
  { name: 'Juil', visits: 300, inscriptions: 139, rewards: 15 },
  { name: 'Août', visits: 200, inscriptions: 980, rewards: 8 },
  { name: 'Sept', visits: 278, inscriptions: 390, rewards: 25 },
  { name: 'Oct', visits: 189, inscriptions: 480, rewards: 18 },
  { name: 'Nov', visits: 239, inscriptions: 380, rewards: 30 },
  { name: 'Déc', visits: 349, inscriptions: 430, rewards: 45 },
];

export default function Dashboard() {
  const { customers, transactions, business } = useStore();

  const totalClients = customers.length;
  const purchases = transactions.filter(t => t.type === 'purchase');
  const totalVisits = purchases.length;
  const rewardsRedeemed = transactions.filter(t => t.type === 'reward_redemption').length;
  const estimatedRevenue = totalVisits * 14.5; // Exemple: 14.5€ par visite estimé
  
  const formattedRevenue = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(estimatedRevenue);

  const activeClients = customers.filter(c => c.status === 'active').length;
  const dormantClients = customers.filter(c => c.status === 'dormant').length;
  const vipClients = customers.filter(c => c.tier === 'vip').length;

  return (
    <div className="max-w-[1400px] mx-auto space-y-4">
      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* KPI 1 - Large Accent Block */}
        <div className="bg-brand-accent lg:col-span-4 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="bg-brand-shell text-white p-3 rounded-2xl shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <span className="flex items-center text-brand-shell text-sm font-bold bg-white/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              <TrendingUp className="h-4 w-4 mr-1" />
              +18 this week
            </span>
          </div>
          <div className="z-10 mt-6">
             <p className="text-brand-shell/80 font-bold mb-1">Total Members</p>
             <h3 className="text-6xl font-display font-black text-brand-shell tracking-tighter">{totalClients}</h3>
          </div>
        </div>

        {/* KPI 2 & 3 vertical stack */}
        <div className="lg:col-span-3 flex flex-col gap-4">
           {/* Interactions */}
           <div className="bg-brand-shell p-6 rounded-3xl flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent via-transparent to-transparent pointer-events-none" />
              <div className="flex justify-between items-center mb-3">
                 <p className="text-white/70 font-semibold text-sm">Activities</p>
                 <ArrowRight className="h-4 w-4 text-brand-accent" />
              </div>
              <h3 className="text-4xl font-display font-black text-white">{totalVisits}</h3>
              <div className="mt-2 text-brand-accent text-sm font-medium">+12% vs last month</div>
           </div>
           
           {/* Revenue */}
           <div className="bg-white p-6 rounded-3xl flex-1 border border-brand-border/40 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-brand-text-secondary font-semibold text-sm mb-1">Est. Revenue</p>
                 <h3 className="text-2xl font-display font-black text-brand-shell">{formattedRevenue}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#f0f4ec] flex items-center justify-center">
                 <CreditCard className="h-5 w-5 text-brand-shell" />
              </div>
           </div>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-5 bg-white border border-brand-border/40 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-brand-shell">Productivity & Visits</h3>
            <select className="text-xs font-bold border-brand-border rounded-full px-3 py-1.5 text-brand-shell bg-[#f0f4ec] focus:outline-none focus:ring-2 focus:ring-brand-accent">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 0, bottom: -10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4ec" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8B9787', fontSize: 10, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8B9787', fontSize: 10, fontWeight: 600}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #DDE5D8', boxShadow: '0 12px 32px rgba(23, 35, 20, 0.08)', fontWeight: 600 }}
                />
                <Line type="step" dataKey="visits" name="Visites" stroke="#101412" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="step" dataKey="inscriptions" name="Inscriptions" stroke="#A6FF4D" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Activity Mini-List */}
        <div className="lg:col-span-8 bg-white border border-brand-border/40 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand-shell text-lg">Schedule & Activity</h3>
            <Button variant="ghost" className="h-8 rounded-full bg-[#f0f4ec] text-brand-shell text-xs font-bold px-4">View All</Button>
          </div>
          <div className="space-y-4">
             {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group p-3 hover:bg-[#f9faf6] rounded-2xl transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border
                        ${tx.type === 'purchase' ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 
                          tx.type === 'reward_redemption' ? 'bg-brand-warning/10 text-brand-warning border-brand-warning/20' : 
                          'bg-brand-accent/20 text-brand-accent-dark border-brand-accent/40'}`}>
                         {tx.customerName.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-brand-shell text-sm">{tx.customerName}</p>
                         <p className="text-xs text-brand-text-secondary font-medium">{tx.description}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-sm text-brand-shell">
                        {tx.stampsAdded > 0 ? `+${tx.stampsAdded}` : tx.stampsAdded < 0 ? `${tx.stampsAdded}` : '0'} pts
                      </p>
                      <p className="text-xs text-brand-text-muted font-medium">
                         {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(tx.createdAt))}
                      </p>
                   </div>
                </div>
             ))}
             {transactions.length === 0 && (
                <div className="py-8 text-center text-brand-text-muted font-medium text-sm">No recent activity</div>
             )}
          </div>
        </div>

        {/* History Calendar Block - Accent variation */}
         <div className="lg:col-span-4 bg-[#DCECA9] rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-[#1B3D0A] text-lg mb-6 flex items-center gap-2">
               <Star className="h-5 w-5 fill-[#1B3D0A]" />
               AI Insights
            </h3>
            
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white flex-1 flex flex-col justify-center">
               <p className="text-sm text-[#1B3D0A] font-semibold mb-4 leading-relaxed">
                 <span className="font-black">23 clients</span> have not returned in 45 days.
                 Send a win-back offer to reactivate them.
               </p>
               <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 bg-white/50 rounded-full overflow-hidden">
                     <div className="h-full bg-[#1B3D0A] w-[35%] rounded-full" />
                  </div>
                  <span className="text-xs font-black text-[#1B3D0A]">35% dormant</span>
               </div>
               <div className="w-full mt-6">
                 <Link href="/dashboard/offers">
                   <Button className="w-full bg-[#1B3D0A] hover:bg-[#112706] text-white rounded-xl shadow-lg border-0 h-12 font-bold">
                     Generate Campaign
                   </Button>
                 </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
