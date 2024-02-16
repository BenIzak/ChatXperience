import { CreateUserRequest, LoginUserRequest, ApiResponse, baseURL } from '@/api/index'

export async function createUser(request: CreateUserRequest) {
    try {
        const response = await fetch(`${baseURL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message }
        } else {
            return { message: 'An unknown error occurred' }
        }
    }
}


export async function loginUser(request: LoginUserRequest) {
    try {
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { message: errorData.error || 'Login failed' };
        }

        const data = await response.json();
        return { data };

    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message };
        } else {
            return { message: 'An unknown error occurred' };
        }
    }
}
