import { Tabs } from "@radix-ui/themes";

const TabItem = ({children, value}: {children: React.ReactNode, value: string}) => {
  return <Tabs.Content value={value}>{children}</Tabs.Content>
}

export default TabItem;