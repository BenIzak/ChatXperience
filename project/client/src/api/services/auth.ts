import { CreateUserRequest, LoginUserRequest, baseURL } from '@/api/index'

export async function createUser(request: CreateUserRequest) {
    const requestData = {
        firstname: request.firstname,
        lastname: request.lastname,
        email: request.email,
        passwd: request.password
    };

    try {
        const response = await fetch(`${baseURL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
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
    const requestData = {
        email: request.email,
        passwd: request.password
    };

    try {
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // Attempt to parse the JSON response from the server
        const data = await response.json();

        // Check if the HTTP response status code is 200-299
        if (response.ok) {

            return { success: true, data: data };
        } else {
            // Handle server-side errors (non-2xx status code)
            console.error('Login failed:', data);
            return { success: false, message: data.error || 'Login failed due to server error' };
        }
    } catch (error) {
        // Handle errors related to network issues or JSON parsing errors
        console.error('Login error:', error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: 'An unknown error occurred' };
        }
    }
}
