import { MessageProps } from "@/types/messageTypes";


export default function Message({ img, time, text, isCurrent = false }: MessageProps) {
    const containerClass = `flex w-full  ${isCurrent ? 'flex-end flex-row-reverse' : 'flex-row'}`;
    const messageBoxClass = `mb-[10px] inline-block rounded-[5px] px-5 py-3 shadow-card ${isCurrent ? 'bg-dark dark:bg-dark-2 text-white' : 'bg-white dark:bg-dark-3 text-body-color dark:text-dark-6'}`;

    return (
        <div className={containerClass}>
            <div className="relative h-10 w-full max-w-[40px] rounded-full m-1 mx-2">
                <img
                    src={img}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>

            <div>
                <div className={messageBoxClass}>
                    <p className="text-base">{text}</p>
                </div>
                <span className="block text-sm">{time}</span>
            </div>
        </div>
    );
}