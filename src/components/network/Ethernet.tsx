import { useState } from 'react';
import { Switch, Button, Input } from "@material-tailwind/react";
import ApiClient from '../../features/axios';

interface ETHERNET {
    isDhcp:boolean;
    mask?:string;
    ip?:string;
    gw?:string;
    dnsP?:string;
    dnsS?:string;
}

export default function Ethernet() {
    const [conf,setConf] = useState<ETHERNET>({
        isDhcp:false,
    });
    async function connectEthernet() {
        console.log('ethernet connection ... ');
        try {
            const result = await ApiClient.post('wifi',conf)
            console.log(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className='flex gap-6'>
            <p>Dhcp</p>
            <Switch
                //inputRef={isStatic}
                onChange={()=>setConf({
                    ...conf,
                    isDhcp:!conf.isDhcp
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
                conf.isDhcp ?
                    <div className="flex flex-wrap">
                        <div className="w-96 m-6">
                            <Input label="IP" 
                            onChange={(e)=>setConf({
                                ...conf,
                                ip:e.target.value
                            })}
                            />
                        </div>
                        <div className="w-96 m-6">
                            <Input type='number' max={32} min={1} label="Mask" 
                            onChange={(e)=>setConf({
                                ...conf,
                                mask:e.target.value
                            })}                            
                            />
                        </div>
                        <div className="w-96 m-6">
                            <Input label="Gw" 
                            onChange={(e)=>setConf({
                                ...conf,
                                gw:e.target.value
                            })}
                            
                            />
                        </div>
                        <div className="w-96 m-6">
                            <Input label="Dns Primary" 
                            onChange={(e)=>setConf({
                                ...conf,
                                dnsP:e.target.value
                            })}
                            
                            />
                        </div>
                        <div className="w-96 m-6">
                            <Input label="Dns Secondary" 
                            onChange={(e)=>setConf({
                                ...conf,
                                dnsS:e.target.value
                            })}
                            
                            />
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className='flex justify-end'>
                <Button color='green' onClick={connectEthernet}>Submit</Button>
            </div>
        </div>
        </div>
    )
}