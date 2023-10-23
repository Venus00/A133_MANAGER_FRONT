import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import Wifi from './Wifi';
import Ethernet from './Ethernet';

export default function NetNavTab() {
    const data = [
        {
            label: "Ethernet",
            value: "Configuration",
            component: <Ethernet />,
        },
        {
            label: "Wifi",
            value: "Wifi",
            component: <Wifi />,
        },
    ];
    return (
        <div className="h-full">
        <Tabs value="Configuration"   >
            <TabsHeader className='w-full h-full'>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className='h-full'>
                {data.map(({ value, component }) => (
                    <TabPanel key={value} value={value} className='h-full'>
                        {component}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
        </div>
    )
};