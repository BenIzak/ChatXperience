import { createGroup } from '@/api/services/group'
import { RootState } from '@/redux/store'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CreateGroupForm = ({ onSubmit, onCancel }) => {
    const [groupName, setGroupName] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(true)

    const dispatch = useDispatch()
    const { userId, token } = useSelector((state: RootState) => state.auth)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!userId || !token) {
            console.error('User ID or token is missing')
            return
        }

        if (!groupName) {
            console.error('Group name is required')
            return
        }

        onSubmit(
            {
                creator_id: userId,
                name: groupName,
                public: isPublic,
                description: description || undefined,
            },
            token
        )

        onCancel() // Pour fermer le modal après la soumission, si nécessaire
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="groupName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Group Name
                </label>
                <input
                    type="text"
                    id="groupName"
                    placeholder="Choose a group name"
                    required
                    onChange={(e) => setGroupName(e.target.value)}
                    maxLength={70}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    description
                </label>
                <textarea
                    className=" mt-1 block max-h-16 w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="description (max 200 characters)"
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={200}
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Public
                </label>
                <div className="mt-1 flex items-center">
                    <input
                        id="public"
                        name="public"
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                        htmlFor="public"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Anyone can join
                    </label>
                </div>
            </div>

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
                    onClick={handleSubmit}
                >
                    Create Group
                </button>
            </div>
        </form>
    )
}

export default CreateGroupForm
