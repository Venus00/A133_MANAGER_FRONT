import Card from "../../components/monitor/Card";
import { Table } from "../../components/monitor/Table";
import cpu from '../../images/cpu.svg'
import ram from '../../images/ram.svg';
import disk from '../../images/disk.svg';
import usage from '../../images/usage.svg'
const Monitor = () => {

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <Card icon={cpu} value={0} title={"CPU"} color="#219C90" />
                <Card icon={disk} value={0} title={"DISK"} color="#E9B824" />
                <Card icon={ram} value={0} title={"RAM"} color="#EE9322" />
                <Card icon={usage} value={0} title={"PROCESS"} color="#D83F31" />

            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2 xl:col-span-3">
                    <Table/>
                </div>
            </div>
        </div>
    );
};

export default Monitor;
