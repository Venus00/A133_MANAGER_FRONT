import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Network from '../../components/network/index.tsx';
import Host from "../../components/host/index.tsx";
const Configuration = () => {
  const data = [
    {
      label: "Network",
      value: "Configuration",
      component:<Network/>,
    },
    {
      label: "Host",
      value: "Host",
      component:<Host/>,
    },
    {
      label: "Access Point",
      value: "Access Point",
      component: `...`,
    },
  ];
  return (
    <>
    <Tabs value="Configuration">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value}>
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>    
    </>
  );
};

export default Configuration;
