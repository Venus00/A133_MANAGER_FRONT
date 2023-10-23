import react, { useEffect, useState } from 'react';
import NetNavTab from './NetNavTab';
import wifi from '../../images/wifi.svg';
import ethernet from '../../images/ethernet.svg';
import ApiClient from '../../features/axios';

interface STATUS {
    wifi?:string;
    ethernet?:string;
}
export default function Network() {
    const [status,setStatus] = useState<STATUS>({})

    async function fetchStatus(){
        try {
            const result = await ApiClient.get('/network/status');
            setStatus(result?.data);
        } catch (error) {
            
        }
    }
    useEffect(() => {
      fetchStatus();
    }, [])
    
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-around  border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Network Settings
                </h3>
                <div>
                    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-transparent ">
                        <img src={ethernet} />
                        <h3 className='ml-3'>{status?.ethernet}</h3>
                    </div>
                </div>
                <div>
                    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-transparent ">
                        <img src={wifi} />
                        <h3 className='ml-3'>{status?.wifi}</h3>
                    </div>
                </div>
            </div>
            <div>
                <NetNavTab />
            </div>
        </div>

    )
}