import { Tabs, Box } from "@radix-ui/themes";
import TabItem from "./TabItem/TabItem";

interface TabItem {
  value: string;
  label: string;
  children: React.ReactNode;
}

export const Tab = ({list}: {list: TabItem[]}) => {
  return (
    <Tabs.Root defaultValue="offers" role="tab">
      <Tabs.List>
        {list.map(item=>{
          return <Tabs.Trigger value={item.value}>{item.label}</Tabs.Trigger>
        })}
      </Tabs.List>

      <Box pt="4">
        {list.map(item=>{
          return <TabItem data-testid={item.value} value={item.value}>{item.children}</TabItem>
        })}
      </Box>
    </Tabs.Root>
  );
};
