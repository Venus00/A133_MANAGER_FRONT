import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { socket } from "../../features/socket";
import { useEffect, useRef, useState } from "react";

function ComDialog(props: {setConf:any;actionOnPort:any; conf: any; open: any; handleOpen: any }) {
    const dataWrite = useRef(null);
    const [comData,setComData]= useState<String[]>([])
    function writeData(data:string){
        if(props.conf.isOpen)
        {
            socket.emit('communication',{
                action:'write',
                path:props.conf.path,
                data,
            })

        }
       
    }

    useEffect(() => {

        function onConnect() {
            console.log('it is connected');
           
        }

        function onDisconnect() {
            console.log('disconnected')
        }



        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('port', onMessage);

        return () => {
            //clearInterval(scanInterval)
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('port', onMessage);
            props.actionOnPort('close');
        };
    }, []);
    function onMessage(data: any) {
        if(comData.length > 10){
            setComData((oldData)=>{
                const listData = oldData.slice(1);
                listData.push(data.data)
                return listData
            })
        }
        else {
            setComData((oldState)=>{
                return [...oldState,data.data]
            })
        }
    }
    return (
        <div className="">
            <Dialog size="md" open={props.open} handler={props.handleOpen}>
                <DialogHeader>Serial/USB SETUP TEST</DialogHeader>
                <DialogBody>
                    <div className="col-span-2 xl:col-span-3">
                        <div className='flex flex-col gap-6'>
                            <div className='w-64'>
                                <Input label={"port : " + props.conf.path}
                                    disabled
                                />
                            </div>
                            <div className="flex justify-between gap-6">

                                <div className="w-64">
                                    <Select label="Select BaudRate"
                                     onChange={(e:any)=>{
                                        props.setConf({
                                            ...props.conf,
                                            baudRate:e
                                        })
                                    }}
                                    >
                                        <Option value="115200">115200</Option>
                                        <Option value="9600">9600</Option>
                                    </Select>
                                </div>
                                <div className='w-64'>
                                    <Input label="Delimiter"
                                    onChange={(e:any)=>{
                                        props.setConf({
                                            ...props.conf,
                                            delimiter:e.target.value
                                        })
                                    }}
                                    />
                                </div>
                                {
                                    !props.conf.isOpen
                                    ?
                                    <Button color="green" onClick={()=>{setComData([]);props.actionOnPort('open');}}>Open</Button>
                                    :
                                    <Button color="red" onClick={()=>{setComData([]);props.actionOnPort('close');}}>Close</Button>
                                }

                            </div>
                            <div className='flex gap-3 w-64'>
                                <Input label="Write"
                                ref={dataWrite}
                                />
                                <div>
                                <Button color='blue' onClick={()=>writeData('test')}>send</Button>
                            </div>
                            </div>
                        
                            <div>
                                <Typography color="blue-gray" className="mb-2">
                                    Read -Port Message Event
                                </Typography>
                                <Card className="mt-6 w-full h-44 overflow-y-auto" >
                                    <CardBody>
                                        {comData}
                                    </CardBody>
                                </Card>

                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        className="mr-1"
                        onClick={()=>{props.handleOpen();setComData([])}}
                        >
                        <span>Cancel</span>
                    </Button >
                    {/* <Button variant="gradient" color="green" onClick={props.handleOpen}>
                        <span>Confirm</span>
                    </Button> */}
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default ComDialog