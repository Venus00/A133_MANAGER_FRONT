import { useState } from 'react';
import { Switch, Button, Input, Select, Option } from "@material-tailwind/react";
import { useQuery } from 'react-query';
import ApiClient from '../../features/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError, AxiosResponse } from 'axios';
interface WIFI {
    isDhcp?: boolean;
    ssid?: string;
    password?: string;
    ip?: string;
    gw?: string;
    mask?: string;
    dnsP?: string;
    dnsS?: string
}

export default function Wifi() {
    const notify = () => toast.success("Wifi Submitted Succefully",{
        position: "bottom-right",
    });
    const notifyError = () => toast.error("Not Connected",{
        position: "bottom-right",
    });
    const [conf, setConf] = useState<WIFI>({
        isDhcp: true
    })
    //const [ssid, setSsid] = useState<any[]>([])

    // useEffect(() => {
    //     socket.connect();
    //     // const scanInterval = setInterval(()=>{
    //     //     socket.emit('scan',"start")
    //     // },2000)
    //     function onConnect() {
    //         console.log('it is connected');
    //         //socket.emit('scan',"start")
    //     }

    //     function onDisconnect() {
    //         console.log('disconnected')
    //     }

    //     function onScanEvent(data: string) {
    //         console.log('scan result', data);
    //         setSsid(JSON.parse(data));
    //     }

    //     socket.on('connect', onConnect);
    //     socket.on('disconnect', onDisconnect);
    //     socket.on('wifi_List', onScanEvent);

    //     return () => {
    //         //clearInterval(scanInterval)
    //         socket.off('connect', onConnect);
    //         socket.off('disconnect', onDisconnect);
    //         socket.off('wifi_List', onScanEvent);
    //     };
    // }, []);
    const { data: ssid } = useQuery({
        initialData: [],
        queryFn: scanWifi,
        queryKey: 'scanResult',
        refetchInterval:2000
    })
    async function scanWifi() {
        try {
             const result =  await ApiClient.get('/network/scan')  ;
             return result.data     
        } catch (error) {
            console.log(error)
        }
    }
    async function connectWifi() {
        console.log('wifi connection ... ');
        console.log(conf)
        notify();
            return await ApiClient.post('network/wifi',conf)
            .then((response:AxiosResponse)=>{
                return response.data 
            })
            .catch((error:AxiosError)=>{
                console.log("error",error.response?.status)
                if (error.response?.status === 400)
                {
                    notifyError();
                }
        }) 
     
    }
    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 xl:col-span-3">
                <div className='flex gap-6 mb-8'>
                    <div className='w-64'>
                        <Select label="SSID SCAN"
                           onChange={(e:any) => setConf({
                                ...conf,
                                ssid:e
                            })}                        
                        >
                            {
                                ssid ? ssid.map(( item:any,key:number) => {
                                    return (
                                        <Option key={key} value={item.ssid}>{item.ssid}</Option>
                                    )
                                })
                                :
                                <Option value={''}> </Option>
                            }
                        </Select>
                    </div>
                    <div className='w-64'>
                        <Input label="Password"
                            onChange={(e) => setConf({
                                ...conf,
                                password: e.target.value
                            })}

                        />
                    </div>
                </div>
                <div className='flex gap-6'>
                    <p>Dhcp</p>
                    <Switch
                        onChange={() => setConf({
                            ...conf,
                            isDhcp: !conf.isDhcp,
                        })}
                        className="h-full w-full checked:bg-[#2ec946]"
                        containerProps={{
                            className: "w-11 h-6",
                        }}
                        circleProps={{
                            className: "before:hidden left-0.5 border-none",
                        }}
                    />
                    <p>Static</p>
                </div>
                {
                    !conf.isDhcp ?
                        <div className="flex flex-wrap">
                            <div className="w-96 m-6">
                                <Input label="IP"
                                    onChange={(e) => setConf({
                                        ...conf,
                                        ip: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-96 m-6">
                                <Input type='number' max={32} min={1} label="Mask"
                                    onChange={(e) => setConf({
                                        ...conf,
                                        mask: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-96 m-6">
                                <Input label="Gw"
                                    onChange={(e) => setConf({
                                        ...conf,
                                        gw: e.target.value
                                    })}

                                />
                            </div>
                            <div className="w-96 m-6">
                                <Input label="Dns Primary"
                                    onChange={(e) => setConf({
                                        ...conf,
                                        dnsP: e.target.value
                                    })}

                                />
                            </div>
                            <div className="w-96 m-6">
                                <Input label="Dns Secondary"
                                    onChange={(e) => setConf({
                                        ...conf,
                                        dnsS: e.target.value
                                    })}

                                />
                            </div>
                        </div>
                        :
                        <></>
                }
            
            <div className='flex justify-end mt-64'>
                <Button color='green'
                    onClick={connectWifi}
                >Submit</Button>
            </div>
            </div>
            <ToastContainer />
        </div>
    )
}