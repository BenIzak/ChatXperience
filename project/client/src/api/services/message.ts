import {
    SendMessageRequest,
    baseURL,
    GetMessagesByGroupIdRequest,
    DeleteMessageRequest,
} from '@api/index'

export async function sendMessage(request: SendMessageRequest) {
    try {
        const response = await fetch(`${baseURL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}

export async function getMessagesByGroupId(
    request: GetMessagesByGroupIdRequest
) {
    try {
        const response = await fetch(`${baseURL}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}

export async function deleteMessage(request: DeleteMessageRequest) {
    try {
        const response = await fetch(
            `${baseURL}/messages/${request.message_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}
