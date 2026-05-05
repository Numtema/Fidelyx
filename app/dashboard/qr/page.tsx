"use client"
import { useStore } from "@/lib/store";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Printer } from "lucide-react";

export default function QRManagement() {
  const { business } = useStore();
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/c/${business.slug}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    alert("Lien copié !");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-shell">QR Code Boutique</h2>
        <p className="text-sm text-brand-text-secondary mt-1">Affichez ce QR code en boutique pour que vos clients rejoignent votre programme.</p>
      </div>

      {publicUrl && (
        <div className="flex flex-col items-center bg-brand-surface p-8 rounded-2xl border border-brand-border shadow-sm">
          <div className="bg-white p-4 rounded-xl border border-brand-border">
            <QRCodeSVG value={publicUrl} size={256} className="w-64 h-64" />
          </div>
          <p className="text-sm text-brand-text-secondary mt-4 font-mono">{publicUrl}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Button variant="outline" className="gap-2" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" /> Copier le lien
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Imprimer l'affiche
        </Button>
      </div>
    </div>
  );
}
