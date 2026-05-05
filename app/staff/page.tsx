"use client"

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Store, UserPlus, Search, CheckCircle, Gift, Plus, QrCode } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StaffMode() {
  const { customers, business, addStampsToCustomer, redeemReward } = useStore();
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(c => 
    c.firstName.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9faf6] pb-24 font-sans text-[#1B3D0A]">
      <header className="px-6 h-20 flex items-center justify-between border-b border-[#1B3D0A]/10 bg-white sticky top-0 z-50">
        <Link className="flex items-center gap-3" href="/">
          <div className="h-10 w-10 bg-[#1B3D0A] rounded-xl flex items-center justify-center">
            <Store className="h-5 w-5 text-[#a5ff4d]" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight leading-none block">FidelyX</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B3D0A]/50">Espace Staff</span>
          </div>
        </Link>
        <span className="bg-[#f0f4ec] text-[#1B3D0A] text-xs font-bold px-3 py-1.5 rounded-full">{business.name}</span>
      </header>

      <main className="p-6 max-w-3xl mx-auto space-y-8">
        
        {/* Scan Actions Bento */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1 bg-[#1B3D0A] text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
            <h2 className="text-xl font-display font-black mb-1 z-10 relative">Scanner un Code</h2>
            <p className="text-sm text-white/70 font-medium mb-6 z-10 relative max-w-[200px]">Utilisez l&apos;appareil photo pour identifier un client.</p>
            <Button className="bg-[#a5ff4d] hover:bg-[#8ae03a] text-[#1B3D0A] w-full rounded-2xl h-12 gap-2 font-bold z-10 relative">
              <QrCode className="h-5 w-5" /> Activer la caméra
            </Button>
            <QrCode className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5" />
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white border border-[#1B3D0A]/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-display font-black text-[#1B3D0A] mb-1">Recherche manuelle</h2>
              <p className="text-sm font-medium text-[#1B3D0A]/60 mb-4">Trouvez un client sans son téléphone.</p>
            </div>
            <div className="relative mt-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1B3D0A]/40" />
              <input 
                type="text" 
                placeholder="Nom, email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-[#f0f4ec] bg-[#f9faf6] focus:outline-none focus:border-[#a5ff4d] text-sm font-medium transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg px-2">Résultats de la recherche</h3>
          
          <div className="grid gap-4">
            {filteredCustomers.map(customer => {
              const isEligibleForReward = customer.stamps >= business.stampsRequired;
              const progress = Math.min(100, (customer.stamps / business.stampsRequired) * 100);
              
              return (
                <div key={customer.id} className="bg-white border border-[#1B3D0A]/10 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#f0f4ec] flex items-center justify-center font-bold text-[#1B3D0A] text-lg">
                        {customer.firstName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{customer.firstName}</h3>
                        <p className="text-xs font-bold text-[#1B3D0A]/60">{customer.email}</p>
                      </div>
                    </div>
                    {isEligibleForReward ? (
                      <span className="bg-[#DCECA9] text-[#1B3D0A] text-[10px] font-bold px-2 py-1 rounded-md uppercase flex items-center gap-1">
                        <Gift className="h-3 w-3" /> Cadeau dispo
                      </span>
                    ) : (
                      <span className="bg-[#f0f4ec] text-[#1B3D0A]/60 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                        {business.stampsRequired - customer.stamps} restants
                      </span>
                    )}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs font-bold mb-1.5 px-1">
                      <span>{customer.stamps} tampons</span>
                      <span className="text-[#1B3D0A]/40">{business.stampsRequired} requis</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#f0f4ec] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isEligibleForReward ? 'bg-[#a5ff4d]' : 'bg-[#1B3D0A]'}`} 
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => addStampsToCustomer(customer.id, 1)}
                      className="flex-1 bg-white border-2 border-[#f0f4ec] hover:border-[#1B3D0A] text-[#1B3D0A] hover:bg-[#f9faf6] h-12 rounded-xl font-bold shadow-none transition-colors gap-2"
                    >
                      <Plus className="h-5 w-5" /> Ajouter un tampon
                    </Button>
                    
                    {isEligibleForReward && (
                      <Button 
                        onClick={() => redeemReward(customer.id)}
                        className="flex-1 bg-[#1B3D0A] hover:bg-black text-[#a5ff4d] h-12 rounded-xl font-bold shadow-md transition-colors gap-2"
                      >
                        <CheckCircle className="h-5 w-5" /> Valider cadeau
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredCustomers.length === 0 && search.length > 0 && (
            <div className="text-center py-12 px-6 bg-white border border-[#1B3D0A]/5 rounded-3xl">
              <UserPlus className="mx-auto h-12 w-12 text-[#1B3D0A]/20 mb-3" />
              <h3 className="text-lg font-bold">Aucun client trouvé</h3>
              <p className="text-sm font-medium text-[#1B3D0A]/60 mt-1 max-w-[250px] mx-auto">Vérifiez l&apos;orthographe ou demandez au client de scanner votre QR code pour s&apos;inscrire.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
