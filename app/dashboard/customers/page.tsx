"use client"
import { useStore } from "@/lib/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const { customers } = useStore();
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(c => 
    c.firstName.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-shell">Clients</h2>
          <p className="text-sm text-brand-text-secondary mt-1">Gérez votre base de clients et consultez leurs habitudes.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button variant="primary" className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Nouveau Client
          </Button>
        </div>
      </div>

      <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-brand-border flex items-center justify-between bg-brand-surface-soft">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher par nom ou email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-md border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent text-sm"
            />
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-brand-surface-soft">
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tampons cumulés</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernier passage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium text-brand-shell">{c.firstName}</TableCell>
                <TableCell className="text-brand-text-secondary">{c.email}</TableCell>
                <TableCell className="font-bold">{c.stamps}</TableCell>
                <TableCell>
                   <span className="capitalize text-xs font-semibold px-2 py-1 bg-brand-surface-muted rounded-md">{c.tier}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={c.status === 'active' ? 'default' : 'secondary'} className={c.status === 'active' ? "bg-brand-success text-white" : ""}>
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-brand-text-secondary">
                  {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(c.lastVisitAt))}
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-brand-text-muted">
                  Aucun client trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
