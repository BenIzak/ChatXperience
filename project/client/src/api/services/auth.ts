import { CreateUserRequest, LoginUserRequest, baseURL } from '@/api/index'

export async function createUser(request: CreateUserRequest) {
    try {
        const response = await fetch(`${baseURL}/users`, {
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

export async function loginUser(request: LoginUserRequest) {
    try {
        const response = await fetch(`${baseURL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        const users = await response.json()
        if (users.length > 0) {
            return { success: true, data: users[0] }
        } else {
            return { success: false, message: 'Email or password incorrect' }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        } else {
            return { success: false, message: 'An unknown error occurred' }
        }
    }
}
