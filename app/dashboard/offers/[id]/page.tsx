"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Zap, Sparkles, Calendar, Target, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";

const offersData: Record<string, any> = {
  "off_1": {
    id: "off_1",
    title: "Offre de Bienvenue",
    description: "Une boisson offerte pour la première visite.",
    type: "Automatique (Nouveau client)",
    status: "Actif",
    usageCount: 12,
    template: "welcome",
    rewardType: "product",
    rewardDetail: "1 Boisson 33cl",
    validity: "Illimité"
  },
  "off_2": {
    id: "off_2",
    title: "Relance clients dormants",
    description: "-10% valable 5 jours",
    type: "Campagne (Clients inactifs 45j)",
    status: "Brouillon",
    usageCount: 0,
    template: "winback",
    rewardType: "discount",
    rewardDetail: "-10% sur toute la commande",
    validity: "Valable 7 jours"
  },
  "off_3": {
    id: "off_3",
    title: "Double points Mardi",
    description: "Les points sont doublés chaque mardi.",
    type: "Récurrent (Mardi)",
    status: "Actif",
    usageCount: 45,
    template: "boost",
    rewardType: "double",
    rewardDetail: "Tampons x2",
    validity: "Illimité"
  }
};

export default function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const offer = offersData[resolvedParams.id] || offersData["off_1"];
  const [rewardType, setRewardType] = useState(offer.rewardType);
  const [validityType, setValidityType] = useState<string>("1m");

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/offers">
          <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white border border-brand-border/40 shadow-sm hover:bg-[#f0f4ec]">
            <ArrowLeft className="h-5 w-5 text-[#1B3D0A]" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-display font-black text-[#1B3D0A]">Éditer l&apos;offre</h2>
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${offer.status === "Actif" ? "bg-[#a5ff4d]/20 text-[#1B3D0A]" : "bg-[#f0f4ec] text-[#1B3D0A]/50"}`}>
              {offer.status}
            </span>
          </div>
          <p className="text-sm text-[#1B3D0A]/60 font-medium mt-1">Mettez à jour les paramètres de votre offre.</p>
        </div>
      </div>

      <div className="bg-white border border-brand-border/40 rounded-3xl p-8 shadow-sm">
        <h3 className="font-bold text-[#1B3D0A] text-xl mb-6">Configuration de l&apos;offre</h3>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Nom de l&apos;offre en interne</label>
            <input 
              type="text" 
              defaultValue={offer.title}
              className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Récompense accordée</label>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => setRewardType("product")}
                className={`rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${rewardType === "product" ? "border-2 border-[#1B3D0A] bg-[#f0f4ec]" : "border border-brand-border/40 bg-white hover:border-[#1B3D0A]/30"}`}
              >
                <span className={`font-bold text-lg ${rewardType === "product" ? "text-[#1B3D0A]" : "text-[#1B3D0A]/70"}`}>Produit offert</span>
              </div>
              <div 
                onClick={() => setRewardType("discount")}
                className={`rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${rewardType === "discount" ? "border-2 border-[#1B3D0A] bg-[#f0f4ec]" : "border border-brand-border/40 bg-white hover:border-[#1B3D0A]/30"}`}
              >
                <span className={`font-bold text-lg ${rewardType === "discount" ? "text-[#1B3D0A]" : "text-[#1B3D0A]/70"}`}>% Réduction</span>
              </div>
              <div 
                onClick={() => setRewardType("double")}
                className={`rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${rewardType === "double" ? "border-2 border-[#1B3D0A] bg-[#f0f4ec]" : "border border-brand-border/40 bg-white hover:border-[#1B3D0A]/30"}`}
              >
                <span className={`font-bold text-lg ${rewardType === "double" ? "text-[#1B3D0A]" : "text-[#1B3D0A]/70"}`}>x2 Tampons</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Détail (ex: 1 Boisson 33cl)</label>
            <input 
              type="text" 
              defaultValue={offer.rewardDetail}
              className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm"
            />
          </div>

          {offer.template === 'winback' && (
            <div>
              <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Audience (Clients inactifs depuis)</label>
              <select defaultValue="45 jours" className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm font-medium">
                <option>30 jours (Recommandé)</option>
                <option>45 jours</option>
                <option>60 jours et plus</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Validité de l&apos;offre</label>
            <div className="space-y-3">
              <select 
                value={validityType}
                onChange={(e) => setValidityType(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm font-medium"
              >
                <option value="7d">Valable 7 jours</option>
                <option value="14d">Valable 14 jours</option>
                <option value="1m">Valable 1 mois</option>
                <option value="unlimited">Illimité</option>
                <option value="custom">Personnalisé (ex: Jusqu&apos;au 31 Décembre)</option>
              </select>

              {validityType === 'custom' && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="block text-xs font-bold text-[#1B3D0A]/70 mb-1">Date d&apos;expiration (JJ/MM/AAAA) ou texte libre</label>
                  <input 
                    type="text" 
                    placeholder="ex: 31/12/2026 ou 'Jusqu'à épuisement des stocks'"
                    className="w-full h-12 px-4 rounded-xl border border-[#1B3D0A]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm"
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Link href="/dashboard/offers">
          <Button variant="ghost" className="rounded-full font-bold text-[#1B3D0A]">Annuler</Button>
        </Link>
        <Link href="/dashboard/offers">
          <Button className="bg-[#1B3D0A] hover:bg-black text-white rounded-full px-8 h-12 font-bold shadow-md transition-all">
            Enregistrer les modifications
          </Button>
        </Link>
      </div>

    </div>
  );
}
