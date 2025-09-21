import { useEnergyStore } from "../../store/useEnergyStore";
import TableComponent from "../../components/Table/Table";
import type { EnergyOffering } from "./interfaces/interfaces";
import TypeFilter from "../../components/TypeFilter/TypeFilter";
import { Flex } from "@radix-ui/themes";
import { useMemo, useState } from "react";

const Offers = () => {
  const { offers } = useEnergyStore();
  const [filterType, setFilterType] = useState<any>("all");

  const filteredOffers:EnergyOffering[] = useMemo(() => {
    if (filterType === "all") {
      return offers;
    }
    return offers.filter((offer) => offer.type === filterType);
  }, [filterType,offers]);

  return (
    <Flex direction="column" gap="3">
      <TypeFilter setFilterType={setFilterType} />
      <TableComponent data={filteredOffers as EnergyOffering[]} />
    </Flex>
  );
};

export default Offers;
