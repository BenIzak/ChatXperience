type typeOfChat = "private" | "group";

type Props = {
    name: string;
    text: string;
    time: string;
    active?: boolean;
    number?: string;
    typeOfChat: typeOfChat;
};

export default function ListingItem(props: Props) {
    return (
        <div className="flex cursor-pointer items-center rounded p-2 hover:bg-wp-100">

            <div className="w-full max-w-fit-content flex flex-col gap-1">
                <div className="flex justify-between caption-primary text-typo-primary font-medium">
                    <span className="flex items-center  text-typo-primary font-medium gap-2">
                        <span className="p-1">
                            {props.typeOfChat === "private" ? (
                                <i className="fa-duotone fa-user text-primary"></i>
                            ) : (
                                <i className="fa-duotone fa-users text-primary"></i>
                            )}
                        </span>
                        <h5 className="truncate whitespace-nowrap font-semibold">
                            {props.name}
                        </h5>
                        {props.number && (
                            <div className="flex items-center justify-center h-5 w-5 rounded bg-primary text-typo-reverse text-xs font-semibold">
                                {props.number}
                            </div>
                        )}
                    </span>
                    <span>
                        {props.time}
                    </span>

                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-body-color truncate">
                        {props.text}
                    </p>

                </div>
            </div>
        </div>
    );
}