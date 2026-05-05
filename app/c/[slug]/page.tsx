"use client"

import { Store, QrCode, Gift, Clock, History, Share2, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function CustomerCard() {
  const { business, customers, transactions } = useStore();
  
  // Dans un vrai environnement, nous aurions récupéré l'utilisateur via une session.
  const [showQR, setShowQR] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: business.name,
        text: `Rejoignez mon programme de fidélité chez ${business.name} !`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  // Dans un vrai environnement, nous aurions récupéré l'utilisateur via une session.
  // Pour le MVP WebStorage, on triche un peu en sélectionnant le premier client (Sarah).
  const myCustomer = customers[0] || { stamps: 0, firstName: "Inconnu", id: "unknown" };
  const myTransactions = transactions.filter(t => t.customerId === myCustomer.id).slice(0, 5);
  
  const stampsNeeded = business.stampsRequired;
  const currentStamps = myCustomer.stamps % stampsNeeded;
  const rewardsAvailable = Math.floor(myCustomer.stamps / stampsNeeded);
  const remainingPurchases = stampsNeeded - currentStamps;

  const bColor = business.primaryColor;

  return (
    <div className="min-h-screen bg-brand-surface-muted sm:bg-brand-bg flex items-center justify-center p-0 sm:p-6" style={{ '--preview-color': bColor } as React.CSSProperties}>
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-auto sm:min-h-[800px] bg-brand-surface sm:rounded-[2rem] sm:border border-brand-border sm:shadow-mobile-card relative overflow-hidden flex flex-col">
        {/* Cover / Header */}
        <div className="h-40 relative shrink-0" style={{ backgroundColor: bColor }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '10px 10px' }} />
          <div className="absolute -bottom-10 left-6">
            <div className="h-20 w-20 bg-brand-surface rounded-2xl p-1 shadow-sm border border-brand-border flex items-center justify-center">
               <div className="h-full w-full bg-brand-surface-soft rounded-xl flex items-center justify-center">
                  <span className="font-display font-bold text-2xl" style={{ color: bColor }}>{business.name.substring(0,3).toUpperCase()}</span>
               </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={handleShare} className="h-8 w-8 rounded-full bg-brand-shell/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-shell/30 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 rounded-full bg-brand-shell/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-shell/30 transition-colors">
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="pt-14 px-6 shrink-0">
          <h1 className="font-display font-bold text-2xl text-brand-shell">{business.name}</h1>
          <p className="text-sm text-brand-text-secondary">Bonjour, {myCustomer.firstName} !</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-6 custom-scrollbar">
          {/* Card Visual / Stamp Grid */}
          <div className="bg-brand-surface-soft border border-brand-border rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-surface-muted text-brand-text-secondary text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Carte de fidélité
            </div>
            <div className="text-center mb-6 mt-2">
               <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-1">Votre cagnotte</p>
               <h2 className="text-4xl font-display font-black text-brand-shell">{currentStamps} <span className="text-xl text-brand-text-muted font-medium">/ {stampsNeeded}</span></h2>
               <p className="text-sm text-brand-text-secondary mt-1">{stampsNeeded} achats = {business.rewardDescription}</p>
            </div>
            
            <div className="grid grid-cols-5 gap-3 w-full">
              {[...Array(stampsNeeded > 15 ? 15 : stampsNeeded)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all ${i < currentStamps ? 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] bg-slate-50' : i === currentStamps ? 'border-dashed bg-transparent' : 'border-brand-border bg-brand-surface'}`}
                  style={i < currentStamps ? { borderColor: bColor, color: bColor } : i === currentStamps ? { borderColor: bColor, opacity: 0.5, color: bColor } : {}}
                >
                  {i < currentStamps ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : i === stampsNeeded - 1 ? <Gift className="w-4 h-4 text-brand-text-muted opacity-50" /> : null}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center text-sm">
               <span className="text-brand-text-secondary font-medium">Plus que {remainingPurchases} achat(s) !</span>
               {rewardsAvailable > 0 && <span className="font-bold text-brand-success block">{rewardsAvailable} récompense(s)</span>}
            </div>
          </div>

          {/* Main CTA */}
          <Button variant="default" onClick={() => setShowQR(true)} className="w-full bg-brand-shell text-white h-14 rounded-xl shadow-card text-base gap-3">
             <QrCode className="h-5 w-5" /> Montrer mon QR Code
          </Button>

          {/* QR Overlay */}
          {showQR && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-shell/80 backdrop-blur-sm" onClick={() => setShowQR(false)}>
              <div className="bg-brand-surface p-6 rounded-3xl shadow-xl w-full max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-display font-bold text-lg mb-4 text-brand-shell">Présentez ce QR Code en caisse</h3>
                <div className="bg-white p-4 rounded-xl border border-brand-border inline-block">
                  <QRCodeSVG value={myCustomer.id} size={200} />
                </div>
                <p className="text-sm text-brand-text-secondary mt-4 font-mono">ID: {myCustomer.id}</p>
                <Button className="mt-6 w-full" onClick={() => setShowQR(false)}>Fermer</Button>
              </div>
            </div>
          )}

          {/* Offers */}
          <div>
            <h3 className="font-display font-bold text-lg text-brand-shell mb-3">Offres disponibles</h3>
            <div className="space-y-3">
              {rewardsAvailable > 0 ? (
                 <div className="border border-brand-border bg-brand-surface rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="font-bold text-brand-shell mb-0.5">{business.rewardDescription}</h4>
                      <p className="text-xs text-brand-text-secondary max-w-[200px]">Vous avez complété votre carte !</p>
                    </div>
                    <Button size="sm" className="bg-brand-success hover:bg-brand-success/90 text-white shadow-none shrink-0 h-9 rounded-lg">Utiliser</Button>
                 </div>
              ) : (
                <div className="bg-brand-surface-muted rounded-xl p-4 flex items-center justify-center text-sm text-brand-text-muted text-center border border-brand-border/50 border-dashed">
                  Complétez votre carte pour débloquer votre récompense.
                </div>
              )}
            </div>
          </div>

          {/* Visit History */}
          <div>
            <h3 className="font-display font-bold text-lg text-brand-shell mb-3">Activité récente</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-border before:to-transparent">
              {myTransactions.map(tx => (
                <div key={tx.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-brand-surface shadow shrink-0 z-10 ${tx.stampsAdded > 0 ? 'bg-brand-success/20 text-brand-success' : tx.stampsAdded < 0 ? 'bg-brand-warning/20 text-brand-warning' : 'bg-brand-info/20 text-brand-info'}`}>
                    {tx.stampsAdded > 0 ? <CheckCircle className="h-4 w-4" /> : tx.stampsAdded < 0 ? <Gift className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-brand-border bg-brand-surface/50 ml-4 md:ml-0 md:mr-4">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-brand-shell text-sm">{tx.description}</span>
                      <span className="text-[10px] text-brand-text-muted font-bold tracking-wider">
                        {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(tx.createdAt))}
                      </span>
                    </div>
                    <div className="text-xs text-brand-text-secondary font-medium">{tx.type === 'purchase' ? `+${tx.stampsAdded} Tampons` : tx.type === 'reward_redemption' ? `Récompense` : `Nouveau`}</div>
                  </div>
                </div>
              ))}
              {myTransactions.length === 0 && (
                 <p className="text-xs text-brand-text-muted text-center italic py-2">Aucune activité récente.</p>
              )}
            </div>
            
            <button className="w-full text-center text-xs font-bold text-brand-text-muted hover:text-brand-shell mt-6 transition-colors">
              Voir tout l'historique
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-brand-surface via-brand-surface to-transparent border-t border-brand-border/50 text-center pb-6 pointer-events-none">
           <p className="text-[10px] font-bold text-brand-text-muted tracking-widest uppercase mt-4">Powered by FidelyX</p>
        </div>
      </div>
    </div>
  );
}
