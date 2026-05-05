"use client"
import { useStore } from "@/lib/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";
import { useState } from "react";

export default function TransactionsPage() {
  const { transactions } = useStore();
  const [search, setSearch] = useState("");

  const filteredTx = transactions.filter(tx => 
    tx.customerName.toLowerCase().includes(search.toLowerCase()) || 
    tx.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-shell">Transactions</h2>
          <p className="text-sm text-brand-text-secondary mt-1">Historique des ajouts de tampons et des récompenses utilisées.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-brand-border flex items-center justify-between bg-brand-surface-soft gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher une transaction..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-md border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent text-sm"
            />
          </div>
          <Button variant="outline" className="shrink-0 gap-2 h-10">
            <Filter className="h-4 w-4" /> Reçus
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-brand-surface-soft">
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type d'action</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Date & Heure</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTx.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-bold text-brand-shell">{tx.customerName}</TableCell>
                <TableCell>
                   <span className="capitalize text-xs font-semibold text-brand-text-secondary">
                     {tx.type === 'purchase' ? 'Achat / Visite' : tx.type === 'reward_redemption' ? 'Cadeau Validé' : 'Inscription'}
                   </span>
                </TableCell>
                <TableCell className="text-brand-text-secondary">{tx.description}</TableCell>
                <TableCell>
                   <span className={`font-medium ${tx.stampsAdded > 0 ? 'text-brand-success' : tx.stampsAdded < 0 ? 'text-brand-warning' : 'text-brand-text-muted'}`}>
                      {tx.stampsAdded > 0 ? `+${tx.stampsAdded} Tampons` : tx.stampsAdded < 0 ? 'Gain Utilisé' : '-'}
                   </span>
                </TableCell>
                <TableCell className="text-brand-text-secondary whitespace-nowrap">
                   {new Intl.DateTimeFormat('fr-FR', { 
                     day: '2-digit', month: 'short', year: 'numeric', 
                     hour: '2-digit', minute: '2-digit' 
                   }).format(new Date(tx.createdAt))}
                </TableCell>
                <TableCell>
                   <Badge variant="secondary" className={
                     tx.status === 'Validé' ? 'bg-brand-success/10 text-brand-success' : 
                     tx.status === 'Nouveau' ? 'bg-brand-info/10 text-brand-info' : 
                     'bg-brand-surface-muted text-brand-text-secondary'
                   }>
                     {tx.status}
                   </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredTx.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-brand-text-muted">
                  Aucune transaction trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
