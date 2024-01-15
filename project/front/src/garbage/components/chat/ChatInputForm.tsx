import { ChangeEventHandler } from "react";

export default function ChatInputForm(props: { sendMessage: () => void; newMessage: string | number | readonly string[] | undefined; handleNewMessageChange: ChangeEventHandler<HTMLInputElement> | undefined; }) {

    const openEmojiPicker = () => {
        console.log('openEmojiPicker');
    };
    return (
        <div className="w-full">
            <form
                className="flex items-center justify-between gap-4 rounded-md bg-color-wp-200 p-4 shadow-team-3 dark:bg-dark-2 dark:shadow-box-dark"
                onSubmit={(e) => { e.preventDefault(); props.sendMessage(); }}
            >

                <div className="relative w-full">
                    <input
                        type="text"
                        value={props.newMessage}
                        onChange={props.handleNewMessageChange}
                        placeholder="Type something here..."
                        className="h-11 w-full rounded-[5px] border border-stroke bg-transparent pl-[18px] pr-12 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6"
                    />
                    <button className="absolute top-0 right-0 h-full w-12 flex items-center justify-center"
                        onClick={() => { openEmojiPicker() }}
                    >
                        <i className="fa-light fa-smile text-typo-secondary
                        "></i>
                    </button>
                </div>

                <button className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-5 text-base font-medium text-white hover:bg-blue-dark">
                    <span className="hidden pr-[10px] sm:inline"> Send </span>
                    <span>
                        <i className="fa-regular fa-paper-plane"></i>
                    </span>
                </button>
            </form>
        </div >
    )
}



