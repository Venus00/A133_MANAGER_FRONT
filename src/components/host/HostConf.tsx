import { Button, Input } from "@material-tailwind/react";
import ApiClient from "../../features/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function HostConfiguration() {
    const [host,setHost] = useState<string>('')
    const [oldHostname,setOldHostname] = useState<string>('');
    const notify = () => toast.success("Host Submitted Succefully",{
        position: "bottom-right",
    });
    async function submitHost() {
        console.log(host)
        try {
            const result = await ApiClient.post('/general/hostname',{hostname:host})
            console.log(result.data);
            notify();
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchHostname() {
        try {
            const result = await ApiClient.get('/general/hostname');
            console.log(result.data)
            setOldHostname(result.data.toString());  
        } catch (error) {
            console.log(error)
        }

        
    }
    useEffect(() => {
      
        fetchHostname();
      
    }, [])
    
    return (
        <div>
             <div className="w-96 m-6">
                            <Input 
                            label={oldHostname} 
                            placeholder={oldHostname}
                            onChange={(e:any)=>setHost(e.target.value)}
                            />
            </div>
              <div className='flex justify-end m-6'>
                <Button color='green' onClick={submitHost}>Submit</Button>
            </div>
        </div>
    )
}