import { Input } from "@material-tailwind/react";

export default function Static() {
    return (
        <div className="flex gap-40">
            <div className="w-96">
                <Input label="Ip" />
            </div>
            <div className="w-96">
                <Input label="Mask" />
            </div>
            <div className="w-96">
                <Input label="Gw" />
            </div>
        </div>
    )
}