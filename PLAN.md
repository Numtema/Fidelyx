# Roadmap & Suivi du Projet : FidelyX

Ce document trace l'avancement du projet basé sur le `MASTER MAP` et le `META DESIGN SYSTEM`.

## 🟢 Phase 1 : Design System & Socle UI (Complété)
- [x] Définition des couleurs, de la typographie (Inter, Plus Jakarta Sans) et des ombres dans `globals.css`.
- [x] Configuration du layout principal (`layout.tsx`).
- [x] Création des composants de base (`Button`).
- [x] Landing page (`/`) avec navigation, hero section et présentation (conversion).

## 🟢 Phase 2 : Dashboard Commerçant (Complété)
- [x] Layout du dashboard avec Sidebar et Topbar (`/dashboard/layout.tsx`).
- [x] Page d'aperçu (KPIs, Graphiques Recharts, Activités) (`/dashboard/page.tsx`).
- [x] Builder de carte fidélité avec configuration et aperçu mobile en direct (`/dashboard/builder`).
- [x] QR Code et impressions (`/dashboard/qr`).
- [x] Clients (`/dashboard/customers`)
- [x] Transactions (`/dashboard/transactions`)
- [x] Offres (`/dashboard/offers`)
- [x] Recommandations (`/dashboard/recommendations`)
- [x] Staff (`/staff` et `/dashboard/staff` linké)
- [x] Paramètres (`/dashboard/settings`)

## 🟢 Phase 3 : Expérience Client (Mobile) (Complété)
- [x] Page de la carte client (`/c/[slug]`) avec template street/premium, jauge de progression, offres, et historique.
- [x] Flow d'inscription client (`/c/[slug]/join`).

## 🟢 Phase 4 : Persistance des données (Backend MVP - Complété)
- [x] Mise en place du store Zustand `persist` (Localstorage).

## 🟢 Phase 5 : Mode Staff / Encaissier (Complété)
- [x] Page de scan ou de sélection de client (`/staff`).
- [x] Interface d'ajout de tampons/points (`/staff/add`).
- [x] Validation des récompenses.

## 🔵 Phase 6 : Transition vers Production (PostgreSQL)
- [ ] Setup base de données PostgreSQL + Prisma ORM.
- [ ] Migration du schéma (Models: Merchant, Customer, Transaction, Reward).
- [ ] Remplacement de `lib/store.ts` par des API Routes + Prisma calls.
- [ ] Déploiement Cloud SQL.