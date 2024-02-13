type MessageTypes = {
    time: string
    text: string
    username: string
    isCurrent?: boolean
}

const timeConverter = (UNIX_timestamp: string) => {
    const a = new Date(UNIX_timestamp)
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min
    return time
}

export default function Message({
    time,
    text,
    username,
    isCurrent = false,
}: MessageTypes) {
    const messageBoxClass = ` ${isCurrent ? 'bg-primary-700 !text-typo-reverse rounded-br-none' : 'bg-wp-white text-typo-primary rounded-bl-none'}`

    return (
        <div
            className={[
                'flex w-full ',
                isCurrent ? 'flex-end flex-row-reverse' : 'flex-row',
            ].join(' ')}
        >
            <div
                className={[
                    'flex flex-col',
                    isCurrent ? 'items-end' : 'items-start',
                ].join(' ')}
            >
                <div className="flex items-center">
                    {!isCurrent && (
                        <h5 className="caption-primary font-medium text-blue-600">
                            {username}
                        </h5>
                    )}
                </div>
                <div
                    className={[
                        'mb-2 inline-block max-w-md rounded-[5px] px-5 py-3 shadow-card',
                        messageBoxClass,
                    ].join(' ')}
                >
                    <p className="word-wrap break-words text-base">{text}</p>
                </div>
                <span
                    className={[
                        'block text-sm',
                        isCurrent ? 'text-end' : 'text-start',
                    ].join(' ')}
                >
                    {timeConverter(time)}
                </span>
            </div>
        </div>
    )
}
