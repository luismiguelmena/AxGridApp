import { Box, Flex, SegmentedControl } from "@radix-ui/themes";
import type { EnergyType } from "../../modules/Offers/interfaces/interfaces";

const types = ["all", "solar", "wind", "gas", "hydro", "thermal", "kinetic"];
const TypeFilter = ({ setFilterType }: { setFilterType: (type: EnergyType) => void }) => {
  return (
    <Flex justify="start" align="start">
      <Box width="100%">
        <SegmentedControl.Root defaultValue="all" onValueChange={(value) => setFilterType(value as EnergyType)}>
          {types.map((type) => (
            <SegmentedControl.Item value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
      </Box>
    </Flex>
  );
};

export default TypeFilter;
