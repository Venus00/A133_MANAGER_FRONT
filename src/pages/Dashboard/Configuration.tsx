import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Network from '../../components/network/index.tsx';
import Host from "../../components/host/index.tsx";
import Communication from "../../components/communication/index.tsx";
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
      label: "Serial/USB Com",
      value: "Communication",
      component: <Communication/>,
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
