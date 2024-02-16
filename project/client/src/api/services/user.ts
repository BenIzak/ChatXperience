import { UserData } from '@/types';
import { DeleteUserRequest, UpdateUserRequest, baseURL } from '@api/index'


export async function getUser(id: number, token: string): Promise<UserData> {
    try {
        const response = await fetch(`${baseURL}/user/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export async function deleteUser(request: DeleteUserRequest) {
    try {
        const response = await fetch(`${baseURL}/users/${request.id}`, {
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

export async function updateUser(request: UpdateUserRequest) {
    try {
        const response = await fetch(`${baseURL}/users/${request.id}`, {
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
