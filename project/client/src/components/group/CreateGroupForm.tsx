import { createGroup } from '@/api/services/group'
import React, { useState, useEffect } from 'react'

interface User {
    id: string
    firstname: string
    lastname: string
}

interface Group {
    id: string
    creatorId: string
    name: string
    type: 'private' | 'group'
    lastMessageDate: string // Date de la dernière activité dans le groupe
    participants: string[]
    messages: Messages[]
}

interface GroupFormProps {
    onSubmit: (group: { name: string; participants: string[] }) => void
    onCancel: () => void
}

// Simuler une liste d'utilisateurs (remplacer par un appel API dans une application réelle)
const initialUsers: User[] = [
    { id: '1', firstname: 'Olivier', lastname: 'Monge' },
    { id: '2', firstname: 'Samuel', lastname: 'Leroy' },
    { id: '3', firstname: 'John', lastname: 'Doe' },
    { id: '4', firstname: 'Laura', lastname: 'Smith' },
]
const CreateGroupForm: React.FC<GroupFormProps> = ({ onSubmit, onCancel }) => {
    const currentUserId = localStorage.getItem('user_id') // remove current user from the list
    const [users, setUsers] = useState<User[]>(
        initialUsers.filter((user) => user.id !== currentUserId)
    )
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [groupName, setGroupName] = useState('')

    const handleUserSelectToggle = (userId: string) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        )
    }

    // function to get random number without decimal

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedUsers.length < 1) {
            alert('Veuillez sélectionner au moins un utilisateur.')
            return
        }
        const newGroup = {
            id: getRandomInt(1000).toString(),
            name:
                groupName ||
                (selectedUsers.length > 1
                    ? 'Group chat'
                    : `Chat with ${selectedUsers.map((id) => users.find((user) => user.id === id)?.firstname).join(', ')}`),
            type: selectedUsers.length > 1 ? 'group' : 'private',
            lastMessageDate: new Date().toISOString(),
            creatorId: currentUserId, // Assurez-vous d'avoir l'ID de l'utilisateur actuel
            participantsId: selectedUsers,
            messages: [], // Vide pour la création du groupe
        }
        createGroup(newGroup)
        onCancel() // Pour fermer le modal après la soumission, si nécessaire
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="groupName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Group Name (optional)
                </label>
                <input
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Add Users
                </label>
                <div className="mt-1 flex w-full flex-row gap-8 overflow-x-auto whitespace-nowrap rounded-md border border-wp-300 p-2">
                    {users.map((user) => (
                        <span key={user.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`user-${user.id}`}
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelectToggle(user.id)}
                                className=" focus:border-primery-500 focus:ring-primery-500 cursor-pointer rounded border-wp-300 text-primary-600"
                            />
                            <label
                                htmlFor={`user-${user.id}`}
                                className="cursor-pointer text-sm font-medium text-typo-primary"
                            >
                                {user.firstname} {user.lastname}
                            </label>
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {selectedUsers.map((userId) => {
                    const user = users.find((u) => u.id === userId)
                    return (
                        <span
                            key={userId}
                            className="inline-flex items-center gap-2 rounded bg-wp-200 px-2 py-1 text-xs font-medium text-typo-primary"
                        >
                            {user?.firstname} {user?.lastname}
                            <button
                                type="button"
                                onClick={() => handleUserSelectToggle(userId)}
                                className="flex h-5 w-5 items-center justify-center rounded-full text-typo-primary hover:bg-wp-400 hover:text-typo-reverse"
                            >
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </span>
                    )
                })}
            </div>{' '}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Create Group
                </button>
            </div>
        </form>
    )
}

export default CreateGroupForm
