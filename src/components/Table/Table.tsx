import { Badge, Button, Flex, HoverCard, Table } from "@radix-ui/themes";
import { useEnergyStore } from "../../store/useEnergyStore";
import type { EnergyOffering } from "../../modules/Offers/interfaces/interfaces";
import { images } from "../../modules/Offers/contants";
import CardOffer from "../Card/Card";
import {
  CardStackIcon,
  CheckIcon,
  CircleIcon,
  ClipboardIcon,
  FileIcon,
  HomeIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { columns } from "./colDef";

const paymentIcons: Record<string, React.ReactNode> = {
  "Wire transfer": <FileIcon />,
  "Credit card": <CardStackIcon />,
  Paypal: <ClipboardIcon />,
  "Bank transfer": <HomeIcon />,
  Cash: <CircleIcon />,
};

const TableComponent = ({ data }: { data: EnergyOffering[] }) => {
  const { confirmOffer } = useEnergyStore();

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.key}>{column.header}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item, index) => (
          <Table.Row>
            <Table.RowHeaderCell width="150px">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Table.RowHeaderCell>
            <Table.Cell width="150px">{item.price} €/MWh</Table.Cell>
            <Table.Cell width="150px">{item.minimumQuantity} MWh</Table.Cell>
            <Table.Cell width="150px">{item.contractTerms}</Table.Cell>
            <Table.Cell width="150px">
              <Flex content="row" align="center" gap="2">
                {paymentIcons[item.paymentTerms]}
                {item.paymentTerms}
              </Flex>
            </Table.Cell>
            <Table.Cell width="150px">{item.capacity} MW</Table.Cell>
            <Table.Cell width="150px">
              {item.confirmed ? (
                <Badge color="green">Confirmed</Badge>
              ) : (
                <Badge color="yellow">Pending</Badge>
              )}
            </Table.Cell>
            <Table.Cell width="100px">
              <Button
                disabled={item.confirmed}
                onClick={() => confirmOffer(index)}
              >
               {item.confirmed ? <CheckIcon width={53}/> : "Confirm"}
              </Button>
            </Table.Cell>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Table.Cell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                    data-testid="info-icon"
                  >
                    <InfoCircledIcon />
                  </div>
                </Table.Cell>
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth="300px">
                <CardOffer image={images[item.type]} offer={item as any} />
              </HoverCard.Content>
            </HoverCard.Root>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableComponent;
