import { useEffect } from "react";
import "./App.css";
import { Tab } from "./components/Tabs/Tab";
import { offersStream$ } from "./services/offerStream";
import type { EnergyOffering } from "./modules/Offers/interfaces/interfaces";
import Offers from "./modules/Offers/Offers";
import Stats from "./modules/Stats/stats";
import Trades from "./modules/Trades/Trades";
import { useEnergyStore } from "./store/useEnergyStore";

function App() {
  const { updateOffer, addOffer } = useEnergyStore();
  const list = [
    {value: "trades", label: "Create trade", children: <Trades />},
    {value: "offers", label: "Offers", children: <Offers />},
    {value: "stats", label: "Stats", children: <Stats />},
  ]

  useEffect(() => {
    const sub = offersStream$.subscribe((event) => {
      if (event.type === "update") {
        updateOffer(event.index, event.changes);
      } else if (event.type === "add") {
        addOffer(event.offer as EnergyOffering);
      }
    });
    return () => sub.unsubscribe();
  }, [updateOffer, addOffer]);
  
  return (
    <>
      <Tab list={list} />
    </>
  );
}

export default App;
