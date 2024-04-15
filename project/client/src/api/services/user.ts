import { DeleteUserRequest, UpdateUserRequest, User, baseURL } from '@api/index'

export async function getUserDetails(userId: number) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${baseURL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data: User = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: "An unknown error occurred" }
        }
    }
}

export async function getAllUsers() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${baseURL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data: User[] = await response.json();
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: "An unknown error occurred" }
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
