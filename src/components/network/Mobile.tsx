import { useState } from 'react';
import { Switch, Button, Input, Select, Option } from "@material-tailwind/react";
import { useQuery } from 'react-query';
import ApiClient from '../../features/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError, AxiosResponse } from 'axios';
interface MOBILE {
    apn?:string;
    pin?:string;
}

export default function Mobile() {
    const notify = () => toast.success("Mobile Configuration Submitted Succefully",{
        position: "bottom-right",
    });
    const notifyError = () => toast.error("Not Connected",{
        position: "bottom-right",
    });
    const [conf, setConf] = useState<MOBILE>({})

    async function submitMobile() {
        notify();
            return await ApiClient.post('network/mobile',conf)
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
                        <Input label="Apn"
                            onChange={(e) => setConf({
                                ...conf,
                                apn: e.target.value
                            })}

                        />
                    </div>
                    <div className='w-64'>
                        <Input label="Pin"
                            onChange={(e) => setConf({
                                ...conf,
                                pin: e.target.value
                            })}

                        />
                    </div>
                </div>
            <div className='flex justify-end mt-64'>
                <Button color='green'
                    onClick={submitMobile}
                >Submit</Button>
            </div>
            </div>
            <ToastContainer />
        </div>
    )
}