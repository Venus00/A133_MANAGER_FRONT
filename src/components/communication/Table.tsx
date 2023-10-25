import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useTable from "../../hooks/useTable";
import { useQuery } from "react-query";
import ApiClient from "../../features/axios";
import { socket } from "../../features/socket";
import ComDialog from "./ComDialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABLE_HEAD = ["Type", "Path","VendorId","ProductId","Manufacturer", "Action"];

const notifyOpen = () => toast.success("Port Opened Succefully");
const notifyClosed = () => toast.success("Port Closed Succefully");
const notifyOpenError = () => toast.error("Port Already Opened");
const notifyClosedError = () => toast.error("Port Already Closed");


interface CONF {
    path?:string;
    baudRate?:string;
    data?:string;
    isOpen?:boolean;
    delimiter?:string
}
export default function Table() {
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [conf,setConf] = useState<CONF>({
        isOpen:false,
        baudRate:"115200",
        delimiter:'\r\n'
    })
    const handleOpen = () => {
        if(conf.isOpen)
        actionOnPort('close');
        setOpen(!open)
    };
    const { data: comList } = useQuery({
        initialData: [],
        queryFn: fetchProcess,
        queryKey: 'comList',
        refetchInterval: 10000
    })
    async function fetchProcess() {
        try {
            const result = await ApiClient.get('/communication/list');
            return result.data

        } catch (error) {

        }
    }

    const { slice, range } = useTable(comList ? comList : [], page, rowsPerPage);

    function actionOnPort(action:string) {
        switch (action) {
            case 'open':
                if (conf.isOpen === false)
                {
                    setConf({
                        ...conf,
                        isOpen:true
                    })
                    socket.emit('communication',{
                        action,
                        baudRate: conf.baudRate? +conf.baudRate : undefined,
                        path:conf.path,
                        delimiter:conf.delimiter,
                    })
                    notifyOpen();
                }
                else{
                    notifyOpenError();
                }
                break;
            case 'close':
                if (conf.isOpen === true)
                {
                    socket.emit('communication',{
                        action,
                        path:conf.path,
                    })
                    setConf({
                        ...conf,
                        isOpen:false
                    })
                    notifyClosed();
                }
                else {
                    notifyClosedError();
                }
                break;
            default:
                break;
        }
       
    }

    return (
        <Card className="h-full w-full dark:bg-meta-4">
            <CardHeader floated={false} shadow={false} className="rounded-none  dark:bg-meta-4">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Communication Port List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            These are details about All detected Serial And USB port
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slice ? slice.map(
                            (
                                {
                                    type,
                                    path,
                                    vendorId,
                                    productId,
                                    manufacturer,

                                },
                                index,
                            ) => {
                                const isLast = index === slice.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <IconButton variant="text" color="white" className="bg-[#F4CE14]">
                                                    {type}
                                                </IconButton>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {path}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {vendorId}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {productId}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {manufacturer}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                                <IconButton variant="text" color="white" className="bg-green-500" 
                                                onClick={()=> {
                                                    setConf({
                                                        ...conf,
                                                        path
                                                    })
                                                    handleOpen()
                                                    }}>
                                                    Open
                                                </IconButton>
                                        </td>
                                    </tr>
                                );
                            },
                        )
                            :
                            <></>
                        }
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex  justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm" onClick={() => {
                    if (page > 1) { setPage(page - 1) }
                }}>
                    Previous
                </Button>
                <Button variant="outlined" size="sm" onClick={() => {
                    if (page < (range.length)) {
                        setPage(page + 1)
                    }
                    }}>
                    Next
                </Button>

            </CardFooter>
            <ComDialog handleOpen={handleOpen} open={open} conf={conf} actionOnPort={actionOnPort} setConf={setConf}/>
            <ToastContainer />

        </Card>
    );
}