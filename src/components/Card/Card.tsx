import { Box, Flex, Inset, Text } from "@radix-ui/themes";
import type { EnergyOffering } from "../../modules/Offers/interfaces/interfaces";
import { detailRenderers } from "../../modules/Offers/contants";

type Props = {
  offer: EnergyOffering;
  image: string;
};

const CardOffer = ({ offer, image }: Props) => {
  return (
    <Box minHeight="300px">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={image}
            alt={offer.type}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>

        <Text as="div" size="4" weight="bold">
          {offer.type.toUpperCase()}  {offer.capacity} MW
        </Text>
        <Text as="div" size="2" color="gray">
          {offer.location}
        </Text>

        <Flex direction="column" gap="2">
          {detailRenderers[offer.type](offer)}
        </Flex>

        {offer.certifications && offer.certifications.length > 0 && (
          <Text size="2" color="green">
            Certificaciones: {offer.certifications.join(", ")}
          </Text>
        )}
    </Box>
  );
};

export default CardOffer;
