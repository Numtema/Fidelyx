"use client"

import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const offers = [
  {
    id: "off_1",
    title: "Offre de Bienvenue",
    description: "Une boisson offerte pour la première visite.",
    type: "Automatique (Nouveau client)",
    status: "Actif",
    usageCount: 12
  },
  {
    id: "off_2",
    title: "Relance clients dormants",
    description: "-10% valable 5 jours",
    type: "Campagne (Clients inactifs 45j)",
    status: "Brouillon",
    usageCount: 0
  },
  {
    id: "off_3",
    title: "Double points Mardi",
    description: "Les points sont doublés chaque mardi.",
    type: "Récurrent (Mardi)",
    status: "Actif",
    usageCount: 45
  }
];

export default function OffersPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-border/40 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-[#1B3D0A]">Offres & Campagnes</h2>
          <p className="text-sm text-[#1B3D0A]/60 font-medium mt-1">Gérez vos offres automatiques et vos actions marketing.</p>
        </div>
        <Link href="/dashboard/offers/create">
          <Button className="bg-[#1B3D0A] hover:bg-black text-white font-bold rounded-full px-6 h-11 gap-2 shadow-md">
            <Plus className="h-5 w-5" />
            Créer une offre
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map(offer => (
          <div key={offer.id} className="bg-white border border-brand-border/40 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all relative overflow-hidden flex flex-col group hover:-translate-y-1">
             <div className="flex justify-between items-start mb-6">
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${offer.status === "Actif" ? "bg-[#a5ff4d]/20 text-[#1B3D0A]" : "bg-[#f0f4ec] text-[#1B3D0A]/50"}`}>
                   {offer.status}
                </span>
                <span className="text-xs font-bold text-[#1B3D0A]/60 flex items-center gap-1.5 bg-[#f9faf6] px-2.5 py-1 rounded-lg">
                   {offer.status === "Actif" ? <CheckCircle className="h-3.5 w-3.5 text-[#1B3D0A]" /> : <Clock className="h-3.5 w-3.5" />}
                   {offer.usageCount} utilisées
                </span>
             </div>
             <div>
                <h3 className="font-display font-bold text-[#1B3D0A] text-xl mb-2">{offer.title}</h3>
                <p className="text-sm text-[#1B3D0A]/70 font-medium mb-6 min-h-[40px] leading-relaxed">{offer.description}</p>
             </div>
             
             <div className="mt-auto pt-5 border-t border-brand-border/40 border-dashed flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B3D0A]/50">{offer.type}</span>
                <Link href={`/dashboard/offers/${offer.id}`} className="text-xs font-bold text-[#1B3D0A] group-hover:text-[#458B1B] transition-colors">
                  Éditer
                </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
