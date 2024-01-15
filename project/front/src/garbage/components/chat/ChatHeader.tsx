import { ChatInfo } from "@/types/chatTypes";

export default function ChatHeader(props: ChatInfo) {
    return (
        <div className="flex items-center justify-between border-b border-stroke bg-white p-4">
            <div className="flex items-center">
                <div className="mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
                    {props.typeOfChat === 'private' ? (
                        <span className="flex items-center justify-center h-full w-full bg-primary text-typo-reverse text-2xl font-semibold">
                            <i className="fa-duotone fa-user"></i>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center h-full w-full bg-primary text-typo-reverse text-2xl font-semibold">
                            <i className="fa-duotone fa-users"></i>
                        </span>
                    )}
                </div>
                <div>
                    <h5 className="text-base font-medium text-dark dark:text-white">
                        {props.typeOfChat === 'private' ? 'Private Chat' : props.groupName}
                    </h5>
                    <p className="text-sm text-body-color dark:text-dark-6">
                        {props.typeOfChat === 'private' ? `Last seen ${props.lastSeen}` : `${props.groupMembers?.length || 0} members`}
                    </p>
                </div>
            </div>
        </div>
    );
}
