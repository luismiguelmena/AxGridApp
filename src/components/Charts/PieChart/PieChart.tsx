import { ResponsivePie } from "@nivo/pie";
import { useEnergyStore } from "../../../store/useEnergyStore";
import { useMemo } from "react";
const PieChart = () => {
  const { offers } = useEnergyStore();
  const data = useMemo(() => {
    let confirmedOFfers = 0;
    let pendingOffers = 0;
    offers.forEach((offer) => {
      if (offer.confirmed) {
        confirmedOFfers++;
      } else {
        pendingOffers++;
      }
    });
    return [
      {
        id: "confirmed",
        label: "Confirmed",
        value: confirmedOFfers,
        color: "hsl(50, 70%, 50%)"
      },
      { id: "pending", label: "Pending", value: pendingOffers, color: "red" },
    ];
  }, [offers]);
  return (
    <div style={{height: "400px", width: "400px"}}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      colors={{ scheme: 'paired' }}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          symbolShape: "circle",
        },
      ]}
    /></div>
  );
};

export default PieChart;
