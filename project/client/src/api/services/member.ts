import {
    baseURL,
    AddMemberToGroupRequest,
    RemoveMemberFromGroupRequest,
} from '@api/index'

export async function addMemberToGroup(request: AddMemberToGroupRequest) {
    try {
        const response = await fetch(`${baseURL}/usergroups`, {
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

export async function removeMemberFromGroup(
    request: RemoveMemberFromGroupRequest
) {
    try {
        const response = await fetch(`${baseURL}/usergroups`, {
            method: 'DELETE',
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
