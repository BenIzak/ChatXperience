import {
    CreateGroupRequest,
    DeleteGroupRequest,
    UpdateGroupRequest,
    baseURL,
} from '@/api/index'

export async function createGroup(data : CreateGroupRequest) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/group`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create group');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        throw error;
    }
}

export async function deleteGroup(request: DeleteGroupRequest) {
    try {
        const response = await fetch(`${baseURL}/groups/${request.id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        return data
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}

export async function updateGroup(request: UpdateGroupRequest) {
    try {
        const response = await fetch(`${baseURL}/groups/${request.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        const data = await response.json()
        return data
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}

export async function getGroupsByUserId(userId: string) {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch(`${baseURL}/user/${userId}/groups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
    
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        throw error;
    }
}