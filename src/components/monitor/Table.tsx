import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import useTable from "../../hooks/useTable";
import { useQuery } from "react-query";
import ApiClient from "../../features/axios";

const TABLE_HEAD = ["Name", "Pid","Memory","CPU", "Started At","Command","Terminate"];

export function Table() {
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const { data: process } = useQuery({
    initialData: [],
    queryFn: fetchProcess,
    queryKey: 'process',
    refetchInterval: 10000
  })
  const { slice, range } = useTable(process ? process : [], page, rowsPerPage);

  async function fetchProcess() {
    try {
      const result = await ApiClient.get('/performance/processes');
      console.log(result.data)
      const all_process = await result.data.filter((item:any)=> (item.cpu>0 && item.mem>0))
      return await all_process.sort((a:any,b:any) => {
        if(a.mem < b.mem) return 1;
        if(a.mem > b.mem) return -1;
        return 0;
    });
    
    } catch (error) {

    }
  }
  async function killProcess(pid:number) {
    try { 
      const result = await ApiClient.post('/performance/process',{pid})
      console.log(result);
    } catch (error) {
      
    }
  }
  return (
    <Card className="h-full w-full dark:bg-meta-4">
      <CardHeader floated={false} shadow={false} className="rounded-none  dark:bg-meta-4">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Running Process
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the Running process
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
                  name,
                  pid,
                  mem,
                  cpu,
                  started,
                  param
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pid}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {mem}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {cpu.toFixed(2) + '%'}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {started}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {param}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Kill Porcess">
                        <IconButton variant="text" color="white" className="bg-red-800" onClick={()=>killProcess(pid)}>
                            kill
                        </IconButton>
                      </Tooltip>  
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
          {/* {range.map((key, page) => {
            return (
              <IconButton key={key} variant="outlined" size="sm"  onClick={() => setPage(page)}>
                {page+1}
              </IconButton>
            )
          })
          } */}
           <Button variant="outlined" size="sm" onClick={()=>{
          if(page>1) {setPage(page-1)}
        }}>
          Previous
        </Button>
        <Button variant="outlined" size="sm" onClick={()=>{
          console.log(range.length-1)
          console.log(page)
          if(page<(range.length-1)) {
            setPage(page+1)}
        }}>
          Next
        </Button>
       
      </CardFooter>
    </Card>
  );
}