import { MessageTypes } from "@/types/messageTypes";


export default function Message({ time, text, username, isCurrent = false }: MessageTypes) {
    const messageBoxClass = ` ${isCurrent ? "bg-primary-700 text-typo-reverse rounded-br-none" : "bg-wp-white text-typo-primary rounded-bl-none"}`;

    return (
        <div className={["flex w-full ", isCurrent ? "flex-end flex-row-reverse" : "flex-row"].join(" ")}>
            <div>
                <div className="flex items-center">
                    {!isCurrent &&
                        <h5 className="caption-primary font-medium text-typo-primary">
                            {username}
                        </h5>
                    }
                </div>
                <div className={["max-w-md mb-2 inline-block rounded-[5px] px-5 py-3 shadow-card", messageBoxClass].join(" ")}>
                    <p className="text-base word-wrap break-words"
                    >{text}</p>
                </div>
                <span className={["block text-sm", isCurrent ? "text-end" : "text-start"].join(" ")}>{time}</span>
            </div>
        </div>
    );
}