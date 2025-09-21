import { Flex } from "@radix-ui/themes";
import PieChart from "../../components/Charts/PieChart/PieChart";
import BarChart from "../../components/Charts/BarChart.tsx/BarChart";

const Stats = () => {
  return (
    <div style={{ height: 800 }}>
      <Flex direction="row" gap="3" height="100%" justify="center">
        <PieChart />
        <BarChart />
      </Flex>
    </div>
  );
};

export default Stats;
