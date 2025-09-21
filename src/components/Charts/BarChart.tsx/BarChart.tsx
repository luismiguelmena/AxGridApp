import { ResponsiveBar } from "@nivo/bar";
import { useEnergyStore } from "../../../store/useEnergyStore";
import { useMemo } from "react";
import type { EnergyOffering } from "../../../modules/Offers/interfaces/interfaces";

const BarChart = () => {
  const { offers } = useEnergyStore();
  const data = useMemo(() => {
    let quantity = {
      solar: 0,
      gas: 0,
      wind: 0,
      hydro: 0,
      thermal: 0,
      kinetic: 0,
    };
    offers.forEach((offer: EnergyOffering) => {
      quantity[offer.type] = quantity[offer.type] + 1;
    });
    return Object.entries(quantity).map(([type, quantity]) => ({
      type,
      quantity,
      value: quantity,
    }));
  }, [offers]);

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <ResponsiveBar
        data={data}
        indexBy="type"
        labelSkipWidth={12}
        labelSkipHeight={12}
        colors={{ scheme: 'accent' }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 16,
          },
        ]}
        axisBottom={{ legend: "type", legendOffset: 32 }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </div>
  );
};

export default BarChart;
