"use client"

import { Button } from "@/components/ui/button";
import { Star, Zap, UserMinus, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function RecommendationsPage() {
  const { customers } = useStore();
  
  const dormantClients = customers.filter(c => c.status === "dormant").length;
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-shell">Recommandations Intelligentes</h2>
        <p className="text-sm text-brand-text-secondary mt-1">Des actions suggérées pour faire revenir vos clients et augmenter votre chiffre d'affaires.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        
        {/* Recommandation 1 (Prioritaire) */}
        <div className="bg-brand-surface-soft border-2 border-brand-accent/50 rounded-2xl p-6 relative overflow-hidden shadow-sm">
           <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
           <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white border border-brand-border flex items-center justify-center shrink-0 shadow-sm">
                 <UserMinus className="h-6 w-6 text-brand-warning" />
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="bg-brand-warning/10 text-brand-warning text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Priorité Haute</span>
                 </div>
                 <h3 className="font-display font-bold text-brand-shell text-lg mb-2">Relance clients dormants</h3>
                 <p className="text-sm text-brand-text-secondary mb-4">
                    <strong className="text-brand-text">{dormantClients || 23} clients</strong> de votre base ne sont pas revenus depuis plus de 45 jours. Ce segment représente une opportunité de chiffre d'affaires.
                 </p>
                 
                 <div className="bg-white border border-brand-border rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Action suggérée</p>
                    <p className="text-sm font-medium text-brand-shell mb-2">Envoyez une offre de retour -10% valable 5 jours.</p>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-brand-text-secondary">Impact estimé</span>
                       <span className="font-bold text-brand-success flex items-center gap-1"><Zap className="h-3 w-3" /> ~6 à 9 retours</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-3">
                    <Button variant="primary" className="shadow-none">Appliquer la recommandation</Button>
                    <Button variant="ghost">Ignorer</Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Recommandation 2 */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 relative overflow-hidden shadow-sm hover:shadow-card-hover transition-shadow">
           <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-brand-surface-soft border border-brand-border flex items-center justify-center shrink-0">
                 <Star className="h-6 w-6 text-brand-info" />
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="bg-brand-info/10 text-brand-info text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Boost de visites</span>
                 </div>
                 <h3 className="font-display font-bold text-brand-shell text-lg mb-2">Jours creux détectés</h3>
                 <p className="text-sm text-brand-text-secondary mb-4">
                    D'après votre historique, les mardis et jeudis connaissent une baisse de fréquentation de 20% par rapport aux autres jours.
                 </p>
                 
                 <div className="bg-brand-surface-soft border border-brand-border rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Action suggérée</p>
                    <p className="text-sm font-medium text-brand-shell mb-2">Activez "Double tampons" chaque mardi.</p>
                 </div>
                 
                 <div className="flex gap-3 text-sm">
                    <button className="font-bold text-brand-accent-dark hover:text-brand-accent-strong flex items-center gap-1">
                       Créer une offre récurrente <ArrowRight className="h-4 w-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
