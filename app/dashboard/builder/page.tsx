"use client"

import { Button } from "@/components/ui/button";
import { Settings2, Palette, Image as ImageIcon, CheckCircle, Save } from "lucide-react";
import { useStore, CardType } from "@/lib/store";
import { useState } from "react";

export default function CardBuilder() {
  const { business, updateBusiness } = useStore();
  const [localName, setLocalName] = useState(business.name);
  const [localStamps, setLocalStamps] = useState(business.stampsRequired);
  const [localReward, setLocalReward] = useState(business.rewardDescription);
  const [localColor, setLocalColor] = useState(business.primaryColor);

  const handleSave = () => {
    updateBusiness({
      name: localName,
      stampsRequired: localStamps,
      rewardDescription: localReward,
      primaryColor: localColor,
    });
  };

  // Safe color application for preview
  const previewStyle = { '--preview-color': localColor } as React.CSSProperties;

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col" style={previewStyle}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-shell">Personnalisation de la carte</h2>
          <p className="text-sm text-brand-text-secondary mt-1">Gérez l'apparence de la carte que verront vos clients.</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" /> 
          Enregistrer les modifications
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Settings Panel */}
        <div className="w-full lg:w-1/2 xl:w-2/3 bg-brand-surface border border-brand-border rounded-2xl overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          <section>
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-brand-text-muted mb-4 border-b border-brand-border pb-2">Identité</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-shell mb-1">Nom de l'enseigne</label>
                <input 
                  type="text" 
                  value={localName} 
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full h-11 px-3 border border-brand-border rounded-md bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-shadow text-sm" 
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-brand-text-muted mb-4 border-b border-brand-border pb-2 flex items-center gap-2"><Palette className="h-4 w-4"/> Couleurs</h3>
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-bold text-brand-shell mb-1">Couleur Principale (HEX)</label>
                   <div className="flex items-center gap-2 w-full h-11 px-3 border border-brand-border rounded-md bg-brand-surface">
                     <div className="w-6 h-6 rounded-md shadow-sm border border-brand-border shrink-0" style={{ backgroundColor: localColor }}></div>
                     <input 
                       type="text"
                       value={localColor}
                       onChange={(e) => setLocalColor(e.target.value)}
                       className="w-full h-full bg-transparent focus:outline-none text-sm text-brand-text-secondary"
                     />
                   </div>
                 </div>
               </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-brand-text-muted mb-4 border-b border-brand-border pb-2 flex items-center gap-2"><Settings2 className="h-4 w-4"/> Règles de fidélité</h3>
            <div className="space-y-4">
              <div className="bg-brand-surface-soft p-4 rounded-xl border border-brand-border">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-brand-shell mb-1">Nombre d'achats requis</label>
                    <input 
                      type="number" 
                      value={localStamps} 
                      onChange={(e) => setLocalStamps(parseInt(e.target.value) || 1)}
                      className="w-full h-10 px-3 border border-brand-border rounded-md bg-brand-surface text-sm" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-brand-shell mb-1">Récompense attribuée</label>
                    <input 
                      type="text" 
                      value={localReward} 
                      onChange={(e) => setLocalReward(e.target.value)}
                      className="w-full h-10 px-3 border border-brand-border rounded-md bg-brand-surface text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Live Preview Panel */}
        <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center justify-center bg-brand-surface-muted rounded-2xl border border-brand-border p-8 shrink-0 lg:overflow-y-auto">
          <div className="mb-6 text-center">
             <h4 className="font-display font-bold text-brand-shell">Aperçu en direct</h4>
             <p className="text-xs text-brand-text-secondary">Ce que vos clients verront sur leur mobile</p>
          </div>
          
          {/* Phone Mockup Frame */}
          <div className="w-[300px] h-[600px] bg-brand-surface-muted rounded-[2.5rem] border-[10px] border-brand-shell relative flex flex-col items-center overflow-hidden shadow-app-shell shrink-0">
             <div className="absolute top-0 w-32 h-6 bg-brand-shell rounded-b-xl z-20" />
             
             {/* Preview Content */}
             <div className="w-full h-full bg-brand-surface flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
                <div className="h-28 relative shrink-0" style={{ backgroundColor: localColor }}>
                   <div className="absolute -bottom-6 left-4">
                     <div className="h-14 w-14 bg-brand-surface rounded-xl p-1 shadow-sm border border-brand-border flex items-center justify-center">
                        <div className="h-full w-full bg-brand-surface-muted rounded-lg flex items-center justify-center">
                           <span className="font-display font-bold text-lg" style={{ color: localColor }}>{localName.substring(0,3).toUpperCase()}</span>
                        </div>
                     </div>
                   </div>
                </div>
                
                <div className="pt-10 px-4 shrink-0 mb-4">
                  <h1 className="font-display font-bold text-lg text-brand-shell truncate">{localName}</h1>
                  <p className="text-[10px] text-brand-text-secondary">Street food & Tacos French</p>
                </div>
                
                <div className="px-4 pb-6">
                   <div className="bg-brand-surface-soft border border-brand-border rounded-xl p-4 shadow-sm relative overflow-hidden">
                     <div className="text-center mb-4 mt-1">
                        <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest mb-1">Votre cagnotte</p>
                        <h2 className="text-2xl font-display font-black text-brand-shell">4 <span className="text-sm text-brand-text-muted font-medium">/ {localStamps}</span></h2>
                        <p className="text-[10px] text-brand-text-secondary mt-1">{localStamps} achats = {localReward}</p>
                     </div>
                     <div className="grid grid-cols-5 gap-2 w-full">
                       {[...Array(localStamps > 15 ? 15 : localStamps)].map((_, i) => (
                         <div key={i} className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all ${i < 4 ? 'bg-orange-50' : 'border-brand-border bg-brand-surface'}`} style={i < 4 ? { borderColor: localColor, color: localColor } : {}}>
                           {i < 4 ? <CheckCircle className="w-3 h-3" /> : null}
                         </div>
                       ))}
                     </div>
                   </div>
                   
                   <div className="mt-4">
                      <Button className="w-full bg-brand-shell text-white h-10 rounded-lg shadow-sm text-xs">Montrer mon QR Code</Button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
