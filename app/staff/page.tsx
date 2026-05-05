"use client"

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Store, UserPlus, Search, CheckCircle, Gift, Plus, QrCode, Sparkles, X, Target } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StaffMode() {
  const { customers, business, addStampsToCustomer, redeemReward } = useStore();
  const [search, setSearch] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCustomer, setScannedCustomer] = useState<any | null>(null);

  const simulateScan = () => {
    setIsScanning(true);
    // Simulate finding the first customer after 1.5s
    setTimeout(() => {
      setIsScanning(false);
      if (customers.length > 0) {
        setScannedCustomer(customers[0]);
      }
    }, 1500);
  };

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
            <Button 
              onClick={simulateScan}
              disabled={isScanning}
              className={`w-full rounded-2xl h-12 gap-2 font-bold z-10 relative transition-all ${isScanning ? 'bg-white/20 text-white' : 'bg-[#a5ff4d] hover:bg-[#8ae03a] text-[#1B3D0A]'}`}
            >
              <QrCode className={`h-5 w-5 ${isScanning ? 'animate-pulse' : ''}`} /> 
              {isScanning ? 'Scan en cours...' : 'Activer la caméra'}
            </Button>
            <div className={`absolute -bottom-6 -right-6 h-32 w-32 border-4 border-white/10 rounded-3xl flex items-center justify-center ${isScanning ? 'animate-pulse border-[#a5ff4d]/30' : ''}`}>
              <QrCode className="h-20 w-20 text-white/5" />
            </div>
            {isScanning && (
              <div className="absolute inset-0 bg-[#a5ff4d]/10 animate-pulse z-0 pointer-events-none"></div>
            )}
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

      {/* Scanned Customer Popup */}
      {scannedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#1B3D0A]/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-500">
            {/* Header */}
            <div className="p-6 pb-4 flex items-start justify-between relative">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-[#f0f4ec] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#1B3D0A]">
                  {scannedCustomer.firstName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-[#1B3D0A] leading-tight">{scannedCustomer.firstName}</h3>
                  <p className="text-sm font-bold text-[#1B3D0A]/50">{scannedCustomer.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setScannedCustomer(null)}
                className="h-8 w-8 rounded-full bg-[#f9faf6] hover:bg-[#f0f4ec] text-[#1B3D0A]/60 shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* AI Insight Box */}
            <div className="mx-6 mb-6 mt-2 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a5ff4d] to-emerald-400 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white border border-[#a5ff4d]/40 rounded-2xl p-4 shadow-sm flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-[#f0f4ec] flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-[#458B1B]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#458B1B] mb-1">IA Conseil</h4>
                  <p className="text-sm font-medium text-[#1B3D0A]/80 leading-relaxed">
                    Ce client n&apos;est pas venu depuis 45 jours. Proposez-lui votre offre <strong>&quot;Relance clients dormants (-10%)&quot;</strong> pour le fidéliser à nouveau !
                  </p>
                  <Button className="mt-3 h-8 text-xs font-bold bg-[#f0f4ec] hover:bg-[#a5ff4d]/20 text-[#1B3D0A] rounded-lg gap-1.5 px-3">
                    <Target className="h-3 w-3" /> Appliquer l&apos;offre
                  </Button>
                </div>
              </div>
            </div>

            {/* Loyalty Status */}
            <div className="px-6 pb-6">
              <div className="bg-[#f9faf6] rounded-2xl p-4 border border-[#1B3D0A]/5">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs font-bold text-[#1B3D0A]/50 uppercase tracking-wider mb-1">Statut fidélité</p>
                    <p className="font-black text-[#1B3D0A] text-xl">{scannedCustomer.stamps} <span className="text-sm font-medium text-[#1B3D0A]/50">/ {business.stampsRequired} tampons</span></p>
                  </div>
                  {scannedCustomer.stamps >= business.stampsRequired && (
                    <div className="h-8 w-8 bg-[#DCECA9] rounded-full flex items-center justify-center animate-bounce">
                      <Gift className="h-4 w-4 text-[#1B3D0A]" />
                    </div>
                  )}
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-[#1B3D0A]/5">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${scannedCustomer.stamps >= business.stampsRequired ? 'bg-[#a5ff4d]' : 'bg-[#1B3D0A]'}`} 
                    style={{ width: `${Math.min(100, (scannedCustomer.stamps / business.stampsRequired) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#f9faf6] border-t border-[#1B3D0A]/5 flex gap-2">
              <Button 
                onClick={() => {
                  addStampsToCustomer(scannedCustomer.id, 1);
                  setScannedCustomer({...scannedCustomer, stamps: scannedCustomer.stamps + 1});
                }}
                className="flex-1 bg-white border-2 border-[#f0f4ec] hover:border-[#1B3D0A] text-[#1B3D0A] hover:bg-white h-14 rounded-xl font-bold shadow-none transition-colors gap-2"
              >
                <Plus className="h-5 w-5" /> 1 Tampon
              </Button>
              <Button 
                onClick={() => {
                  redeemReward(scannedCustomer.id);
                  setScannedCustomer({...scannedCustomer, stamps: Math.max(0, scannedCustomer.stamps - business.stampsRequired)});
                }}
                disabled={scannedCustomer.stamps < business.stampsRequired}
                className="flex-1 bg-[#1B3D0A] hover:bg-black disabled:bg-[#1B3D0A]/20 disabled:text-white/50 text-[#a5ff4d] h-14 rounded-xl font-bold shadow-md transition-colors gap-2"
              >
                <Gift className="h-5 w-5" /> Cadeau
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
