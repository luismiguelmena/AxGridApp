import { create } from "zustand";
import type { EnergyOffering } from "../modules/Offers/interfaces/interfaces";
import { fetchMockJSON } from "./mock";



interface EnergyState {
  offers: EnergyOffering[];
  addOffer: (offer: EnergyOffering) => void;
  confirmOffer: (index: number) => void;
  updateOffer: (index: number, changes: any) => void;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  offers: [...fetchMockJSON() as EnergyOffering[]],
  addOffer: (offer:EnergyOffering) =>
    set((state) => ({
      offers: [...state.offers, offer],
    })),
  confirmOffer: (index) =>
    set((state) => {
      const updated = [...state.offers];
      updated[index] = { ...updated[index], confirmed: true };
      return { offers: updated };
    }),
  updateOffer: (index, changes) =>
    set((state) => {
      const updated = [...state.offers];
      if (updated[index]) {
        updated[index] = { ...updated[index], ...changes };
      }
      return { offers: updated };
    }),
}));
