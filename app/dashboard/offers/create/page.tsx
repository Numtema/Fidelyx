"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Zap, Sparkles, Calendar, Users, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const offerTemplates = [
  {
    id: "welcome",
    icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
    title: "Offre de Bienvenue",
    description: "Récompense automatique à la première visite pour encourager l&apos;inscription.",
    tag: "Automatique",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    id: "winback",
    icon: <Target className="h-6 w-6 text-red-500" />,
    title: "Relance clients dormants",
    description: "Ciblez les clients qui ne sont pas venus depuis 30, 45 ou 60 jours.",
    tag: "Campagne",
    tagColor: "bg-[#DCECA9] text-[#1B3D0A]"
  },
  {
    id: "birthday",
    icon: <Gift className="h-6 w-6 text-purple-500" />,
    title: "Cadeau d&apos;Anniversaire",
    description: "Envoyez automatiquement une offre le jour de l&apos;anniversaire.",
    tag: "Automatique",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    id: "boost",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    title: "Boost Jours Creux",
    description: "Tampons doublés sur les jours où la fréquentation est basse.",
    tag: "Récurrent",
    tagColor: "bg-orange-100 text-orange-700"
  },
  {
    id: "custom",
    icon: <Calendar className="h-6 w-6 text-gray-500" />,
    title: "Campagne Libre",
    description: "Créez une offre ponctuelle pour un événement spécifique.",
    tag: "Personnalisé",
    tagColor: "bg-gray-100 text-gray-700"
  }
];

export default function CreateOfferPage() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [validityType, setValidityType] = useState<string>("7d");

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/offers">
          <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white border border-brand-border/40 shadow-sm hover:bg-[#f0f4ec]">
            <ArrowLeft className="h-5 w-5 text-[#1B3D0A]" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-display font-black text-[#1B3D0A]">Créer une offre</h2>
          <p className="text-sm text-[#1B3D0A]/60 font-medium mt-1">Configurez une nouvelle mécanique pour booster vos ventes.</p>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="font-bold text-[#1B3D0A] text-lg">1. Choisissez un modèle</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {offerTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`bg-white border rounded-3xl p-6 cursor-pointer transition-all duration-300 ${selectedTemplate === template.id ? 'border-[#a5ff4d] ring-4 ring-[#a5ff4d]/20 shadow-md' : 'border-brand-border/40 hover:border-[#1B3D0A]/20 hover:shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#f9faf6] flex items-center justify-center">
                    {template.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${template.tagColor}`}>
                    {template.tag}
                  </span>
                </div>
                <h4 className="font-bold text-[#1B3D0A] text-lg mb-2">{template.title}</h4>
                <p className="text-sm text-[#1B3D0A]/60 font-medium leading-relaxed">{template.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6">
            <Button 
              disabled={!selectedTemplate}
              onClick={() => setStep(2)}
              className="bg-[#1B3D0A] hover:bg-black text-white rounded-full px-8 h-12 font-bold shadow-md transition-all"
            >
              Continuer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="bg-white border border-brand-border/40 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-[#1B3D0A] text-xl mb-6">2. Configuration de l&apos;offre</h3>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Nom de l&apos;offre en interne</label>
                <input 
                  type="text" 
                  defaultValue={offerTemplates.find(t => t.id === selectedTemplate)?.title}
                  className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Récompense accordée</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border-2 border-[#1B3D0A] bg-[#f0f4ec] rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <span className="font-bold text-[#1B3D0A] text-lg">Produit offert</span>
                  </div>
                  <div className="border border-brand-border/40 bg-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1B3D0A]/30">
                    <span className="font-bold text-[#1B3D0A]/70 text-lg">% Réduction</span>
                  </div>
                  <div className="border border-brand-border/40 bg-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1B3D0A]/30">
                    <span className="font-bold text-[#1B3D0A]/70 text-lg">x2 Tampons</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Détail (ex: 1 Boisson 33cl)</label>
                <input 
                  type="text" 
                  placeholder="Qu'offrez-vous exactement ?"
                  className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm"
                />
              </div>

              {selectedTemplate === 'winback' && (
                <div>
                  <label className="block text-sm font-bold text-[#1B3D0A] mb-2">Audience (Clients inactifs depuis)</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-brand-border/60 bg-[#f9faf6] focus:outline-none focus:ring-2 focus:ring-[#a5ff4d] focus:border-[#a5ff4d] text-sm font-medium">
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

          {/* Launch Action */}
          <div className="bg-[#DCECA9] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#1B3D0A]/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#1B3D0A] flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-[#a5ff4d]" />
              </div>
              <div>
                <p className="font-bold text-[#1B3D0A]">Impact estimé</p>
                <p className="text-sm font-medium text-[#1B3D0A]/70">Cette campagne ciblera ~23 clients.</p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button onClick={() => setStep(1)} variant="ghost" className="rounded-full font-bold text-[#1B3D0A]">Retour</Button>
              <Link href="/dashboard/offers" className="w-full sm:w-auto">
                <Button className="w-full bg-[#1B3D0A] hover:bg-black text-white rounded-full px-8 h-12 font-bold shadow-md transition-all">
                  Lancer la campagne
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
