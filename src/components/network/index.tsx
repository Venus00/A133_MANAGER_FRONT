import react from 'react';
import NetNavTab from './NetNavTab';


export default function Network() {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Network Settings
                </h3>
            </div>
            <div>
                <NetNavTab />
            </div>
        </div>

    )
}