"use client"

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Copy, Store, Receipt, Bell, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { business, updateBusiness } = useStore();
  const [name, setName] = useState(business.name);
  const [slug, setSlug] = useState(business.slug);

  const handleSave = () => {
    updateBusiness({ name, slug });
    alert("Paramètres enregistrés !");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-shell">Paramètres Généraux</h2>
        <p className="text-sm text-brand-text-secondary mt-1">Gérez les informations de votre établissement et vos préférences.</p>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-sm">
         <div className="flex w-full">
            <div className="w-1/4 bg-brand-surface-soft border-r border-brand-border p-4 hidden md:block">
               <nav className="space-y-1">
                  <a href="#general" className="flex items-center gap-2 px-3 py-2 text-sm font-bold bg-white text-brand-shell rounded-md shadow-sm border border-brand-border">
                     <Store className="h-4 w-4" /> Informations
                  </a>
                  <a href="#billing" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-white hover:text-brand-shell rounded-md transition-colors">
                     <Receipt className="h-4 w-4" /> Facturation
                  </a>
                  <a href="#notifications" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-white hover:text-brand-shell rounded-md transition-colors">
                     <Bell className="h-4 w-4" /> Notifications
                  </a>
                  <a href="#security" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-white hover:text-brand-shell rounded-md transition-colors">
                     <Shield className="h-4 w-4" /> Sécurité
                  </a>
               </nav>
            </div>

            <div className="w-full md:w-3/4 p-6 lg:p-8 space-y-8">
               <section id="general">
                  <h3 className="text-lg font-display font-bold text-brand-shell mb-4">Informations du commerce</h3>
                  
                  <div className="space-y-5">
                     <div>
                        <label className="block text-sm font-bold text-brand-shell mb-1">Nom du commerce</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-11 px-3 border border-brand-border rounded-md bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-shadow text-sm" 
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-brand-shell mb-1">Lien public de la carte (URL Slug)</label>
                        <div className="flex">
                           <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-brand-border bg-brand-surface-soft text-brand-text-muted text-sm sm:text-xs">
                             fidelyx.app/c/
                           </span>
                           <input 
                             type="text" 
                             value={slug}
                             onChange={(e) => setSlug(e.target.value)}
                             className="flex-1 min-w-0 h-11 px-3 border border-brand-border rounded-none rounded-r-md bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-shadow text-sm" 
                           />
                           <Button variant="outline" className="ml-2 rounded-md border-brand-border px-3" onClick={() => navigator.clipboard.writeText(`https://fidelyx.app/c/${slug}`)}>
                              <Copy className="h-4 w-4 text-brand-text-secondary" />
                           </Button>
                        </div>
                        <p className="text-xs text-brand-text-muted mt-2">C'est le lien que vos clients verront en scannant le QR Code.</p>
                     </div>
                     
                     <div className="pt-4">
                        <Button variant="primary" onClick={handleSave}>Enregistrer les modifications</Button>
                     </div>
                  </div>
               </section>

               <hr className="border-brand-border" />

               <section id="billing">
                  <h3 className="text-lg font-display font-bold text-brand-shell mb-4">Abonnement & Facturation</h3>
                  <div className="bg-brand-surface-soft border border-brand-border rounded-xl p-5 flex flex-col gap-6">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-brand-shell">Plan Starter</h4>
                              <span className="bg-brand-success/10 text-brand-success text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Actif</span>
                           </div>
                           <p className="text-sm text-brand-text-secondary">9€ / mois. Prochain prélèvement le 12 Juin 2026.</p>
                        </div>
                        <Button variant="outline" className="shrink-0 bg-white">Gérer l'abonnement</Button>
                     </div>
                     <div>
                        <h4 className="font-bold text-brand-shell mb-3 text-sm">Moyen de paiement</h4>
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-16 bg-white border border-brand-border rounded-md flex items-center justify-center">
                              <span className="font-bold text-brand-shell text-xs">VISA</span>
                           </div>
                           <div className="text-sm text-brand-text-secondary">
                              <p className="font-medium text-brand-shell">Visa se terminant par 4242</p>
                              <p className="text-xs">Expire en 12/2028</p>
                           </div>
                           <Button variant="ghost" className="ml-auto text-brand-text-muted hover:text-brand-shell text-sm">
                              Mettre à jour
                           </Button>
                        </div>
                     </div>
                  </div>
               </section>

               <hr className="border-brand-border" />

               <section id="notifications">
                  <h3 className="text-lg font-display font-bold text-brand-shell mb-4">Notifications</h3>
                  <p className="text-sm text-brand-text-secondary mb-6">Restez informé de l'activité de votre programme de fidélité.</p>
                  
                  <div className="space-y-4">
                     <div className="flex items-start justify-between gap-4 p-4 border border-brand-border rounded-xl bg-brand-surface-soft">
                        <div>
                           <h4 className="font-bold text-brand-shell text-sm">Rapport Hebdomadaire</h4>
                           <p className="text-xs text-brand-text-secondary mt-1">Recevez un résumé de votre activité (nouveaux clients, tampons distribués) chaque lundi.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-brand-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-success"></div>
                        </label>
                     </div>

                     <div className="flex items-start justify-between gap-4 p-4 border border-brand-border rounded-xl bg-brand-surface-soft">
                        <div>
                           <h4 className="font-bold text-brand-shell text-sm">Nouveau Client</h4>
                           <p className="text-xs text-brand-text-secondary mt-1">Être alerté par email à chaque fois qu'un nouveau client s'inscrit.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-brand-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-success"></div>
                        </label>
                     </div>
                  </div>
               </section>

               <hr className="border-brand-border" />

               <section id="security">
                  <h3 className="text-lg font-display font-bold text-brand-shell mb-4">Sécurité</h3>
                  <div className="space-y-6">
                     <div>
                        <h4 className="font-bold text-brand-shell text-sm mb-3">Mot de passe</h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                           <input type="password" placeholder="Mot de passe actuel" className="h-10 px-3 border border-brand-border rounded-md bg-brand-surface text-sm flex-1" />
                           <input type="password" placeholder="Nouveau mot de passe" className="h-10 px-3 border border-brand-border rounded-md bg-brand-surface text-sm flex-1" />
                           <Button variant="outline" className="shrink-0 bg-white shadow-sm h-10">Mettre à jour</Button>
                        </div>
                     </div>
                     
                     <div className="pt-4 border-t border-brand-border border-dashed">
                        <div className="flex items-start justify-between gap-4">
                           <div>
                              <h4 className="font-bold text-brand-shell text-sm text-brand-danger">Déconnexion Globale</h4>
                              <p className="text-xs text-brand-text-secondary mt-1">Déconnectez votre compte de tous les appareils sur lesquels vous êtes actuellement connecté.</p>
                           </div>
                           <Button variant="outline" className="border-brand-danger text-brand-danger hover:bg-brand-danger/10 shrink-0">
                              Déconnecter
                           </Button>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </div>
    </div>
  );
}
