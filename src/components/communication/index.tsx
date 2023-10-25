
import Table from './Table'

export default function CommunicationConf() {
    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Communication Configuration
                        </h3>
                    </div>
                    <div>
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
    )
}