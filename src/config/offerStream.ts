import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { useEnergyStore } from "../store/useEnergyStore";

const types = ["solar", "gas", "wind", "hydro", "thermal", "kinetic"];

const generateRandomOffer = (id: number) => {
  return {
    id: id.toString(),
    type:types[Math.floor(Math.random() * types.length)],
    price: Math.floor(Math.random() * 200) + 50,
    minimumQuantity: Math.floor(Math.random() * 500) + 50,
    contractTerms: "1 year",
    paymentTerms: "Wire transfer",
    capacity: Math.floor(Math.random() * 1000) + 100,
    location: "Random City",
    confirmed: false,
  };
};

export const offersStream$ = interval(2000).pipe(
  map((tick) => {
    const { offers } = useEnergyStore.getState(); 
    const availableIndexes = offers
      .map((o, i) => (!o.confirmed ? i : null))
      .filter((i): i is number => i !== null);

    if (availableIndexes.length === 0) {
      return { type: "add" as const, offer: generateRandomOffer(tick + 1000) };
    }

    const actionType = Math.random();

    if (actionType < 0.5) {
      const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      return {
        type: "update" as const,
        index: randomIndex,
        changes: {
          price: Math.floor(Math.random() * 200) + 50,
          capacity: Math.floor(Math.random() * 1000) + 100,
        },
      };
    } else if (actionType < 0.8) {
      const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      return {
        type: "update" as const,
        index: randomIndex,
        changes: { confirmed: true },
      };
    } else {
      return { type: "add" as const, offer: generateRandomOffer(tick + 1000) };
    }
  })
);

