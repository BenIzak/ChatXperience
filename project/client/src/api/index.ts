export const baseURL = 'http://localhost:3000'


export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    connected: boolean;
    lastConnection: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }
export interface CreateUserRequest {
    firstname: string
    lastname: string
    password: string
    email: string
}

export interface LoginUserRequest {
    email: string
    password: string
}

export interface DeleteUserRequest {
    id: number
}

export interface UpdateUserRequest {
    id: number
    firstname?: string
    lastname?: string
    email?: string
    password?: string
}

export interface CreateGroupRequest {
    creator_id: number
    Name: string
    public: boolean
    participantIDs: number[]
    description?: string
}

export interface DeleteGroupRequest {
    id: number
}

export interface UpdateGroupRequest {
    id: number
    name?: string
    public?: boolean
    description?: string
}

export interface AddMemberToGroupRequest {
    user_id: number
    group_id: number
}

export interface RemoveMemberFromGroupRequest {
    user_id: number
    group_id: number
}

export interface SendMessageRequest {
    user_id: number
    group_id: number
    content: string
}

export interface GetMessagesByGroupIdRequest {
    groupID: number
}

export interface DeleteMessageRequest {
    user_id: number
    message_id: number
}
