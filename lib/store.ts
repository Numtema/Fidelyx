import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types ---

export type CardType = "stamps" | "points" | "vip";

export interface BusinessConfig {
  id: string;
  slug: string;
  name: string;
  category: string;
  primaryColor: string;
  cardStyle: CardType;
  themeStyle: string; // "street", "premium", "soft", etc.
  stampsRequired: number; // Ex: 10
  rewardDescription: string; // Ex: "1 menu offert"
}

export interface Customer {
  id: string;
  firstName: string;
  email: string;
  stamps: number;
  points: number;
  tier: "bronze" | "silver" | "gold" | "vip";
  lastVisitAt: string;
  status: "active" | "dormant";
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: "purchase" | "reward_redemption" | "welcome_bonus";
  description: string;
  stampsAdded: number;
  pointsAdded: number;
  createdAt: string;
  status: "Complété" | "Validé" | "Nouveau";
}

export interface AppState {
  business: BusinessConfig;
  customers: Customer[];
  transactions: Transaction[];
  
  // Actions
  updateBusiness: (updates: Partial<BusinessConfig>) => void;
  addCustomer: (customer: Omit<Customer, "id" | "stamps" | "points" | "tier" | "lastVisitAt" | "status">) => string;
  addStampsToCustomer: (customerId: string, stamps: number) => void;
  redeemReward: (customerId: string) => void;
  resetStore: () => void;
}

// --- Store (Local Storage Backend) ---

const defaultBusiness: BusinessConfig = {
  id: "biz_123",
  slug: "le-bon-tacos",
  name: "Le Bon Tacos",
  category: "tacos",
  primaryColor: "#FB923C", // orange-400
  cardStyle: "stamps",
  themeStyle: "street",
  stampsRequired: 10,
  rewardDescription: "1 menu offert",
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      business: defaultBusiness,
      
      // Données de base pour avoir des graphiques / tableaux remplis au premier lancement
      customers: [
        { id: "cust_1", firstName: "Sarah", email: "sarah@example.com", stamps: 7, points: 150, tier: "bronze", lastVisitAt: new Date().toISOString(), status: "active" },
        { id: "cust_2", firstName: "Karim", email: "karim@example.com", stamps: 2, points: 200, tier: "silver", lastVisitAt: new Date(Date.now() - 86400000).toISOString(), status: "active" },
        { id: "cust_3", firstName: "Léa", email: "lea@example.com", stamps: 0, points: 0, tier: "bronze", lastVisitAt: new Date().toISOString(), status: "active" },
      ],
      
      transactions: [
        { id: "tx_1", customerId: "cust_1", customerName: "Sarah", type: "purchase", description: "+1 tampon", stampsAdded: 1, pointsAdded: 0, createdAt: new Date().toISOString(), status: "Complété" },
        { id: "tx_2", customerId: "cust_2", customerName: "Karim", type: "reward_redemption", description: "Tacos offert", stampsAdded: -10, pointsAdded: 0, createdAt: new Date(Date.now() - 86400000).toISOString(), status: "Validé" },
        { id: "tx_3", customerId: "cust_3", customerName: "Léa", type: "welcome_bonus", description: "Bienvenue", stampsAdded: 0, pointsAdded: 0, createdAt: new Date(Date.now() - 172800000).toISOString(), status: "Nouveau" },
      ],

      updateBusiness: (updates) => set((state) => ({
        business: { ...state.business, ...updates }
      })),

      addCustomer: (custData) => {
        const newId = `cust_${Date.now()}`;
        const newCustomer: Customer = {
          id: newId,
          ...custData,
          stamps: 0,
          points: 0,
          tier: "bronze",
          lastVisitAt: new Date().toISOString(),
          status: "active"
        };
        
        set((state) => ({
          customers: [...state.customers, newCustomer],
          transactions: [
            {
              id: `tx_${Date.now()}`,
              customerId: newId,
              customerName: newCustomer.firstName,
              type: "welcome_bonus",
              description: "Inscription",
              stampsAdded: 0,
              pointsAdded: 0,
              createdAt: new Date().toISOString(),
              status: "Nouveau"
            },
            ...state.transactions
          ]
        }));
        
        return newId;
      },

      addStampsToCustomer: (customerId, stamps) => {
        set((state) => {
          const customer = state.customers.find(c => c.id === customerId);
          if (!customer) return state;

          const updatedCustomers = state.customers.map(c => 
            c.id === customerId 
              ? { ...c, stamps: c.stamps + stamps, lastVisitAt: new Date().toISOString(), status: "active" as const } 
              : c
          );

          const newTransaction: Transaction = {
            id: `tx_${Date.now()}`,
            customerId,
            customerName: customer.firstName,
            type: "purchase",
            description: `+${stamps} tampon(s)`,
            stampsAdded: stamps,
            pointsAdded: 0,
            createdAt: new Date().toISOString(),
            status: "Complété"
          };

          return {
            customers: updatedCustomers,
            transactions: [newTransaction, ...state.transactions]
          };
        });
      },

      redeemReward: (customerId) => {
        set((state) => {
          const customer = state.customers.find(c => c.id === customerId);
          const reqStamps = state.business.stampsRequired;
          
          if (!customer || customer.stamps < reqStamps) return state;

          const updatedCustomers = state.customers.map(c => 
            c.id === customerId 
              ? { ...c, stamps: c.stamps - reqStamps, lastVisitAt: new Date().toISOString() } 
              : c
          );

          const newTransaction: Transaction = {
            id: `tx_${Date.now()}`,
            customerId,
            customerName: customer.firstName,
            type: "reward_redemption",
            description: state.business.rewardDescription,
            stampsAdded: -reqStamps,
            pointsAdded: 0,
            createdAt: new Date().toISOString(),
            status: "Validé"
          };

          return {
            customers: updatedCustomers,
            transactions: [newTransaction, ...state.transactions]
          };
        });
      },

      resetStore: () => set({ customers: [], transactions: [], business: defaultBusiness })
    }),
    {
      name: 'fidelyx-storage', // name of the item in the storage (must be unique)
    }
  )
);
