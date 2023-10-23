import { Button, Input } from "@material-tailwind/react";
import ApiClient from "../../features/axios";
import { useState } from "react";

export function HostConfiguration() {
    const [host,setHost] = useState<string>('')

    async function submitHost() {
        console.log(host)
        try {
            const result = await ApiClient.post('/host',{host})
        } catch (error) {
            
        }
    }
    return (
        <div>
             <div className="w-96 m-6">
                            <Input label="Host" 
                            onChange={(e:any)=>setHost(e.target.value)}
                            />
            </div>
              <div className='flex justify-end m-6'>
                <Button color='green' onClick={submitHost}>Submit</Button>
            </div>
        </div>
    )
}