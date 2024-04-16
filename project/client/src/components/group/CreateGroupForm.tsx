import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/services/user'; // Adjusted import
import { createGroup } from '@/api/services/group';

interface User {
    id: number;
    firstname: string;
    lastname: string;
}

interface CreateGroupRequest {
    name: string;
    public: boolean;
    participantIDs: number[];
    description?: string;
}

interface GroupFormProps {
    onCancel: () => void;
}

const CreateGroupForm: React.FC<GroupFormProps> = ({ onCancel }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [groupName, setGroupName] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, []);

    const handleUserSelectToggle = (userId: number) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUsers.length === 0) {
            alert('Please select at least one user.');
            return;
        }

        const groupData: CreateGroupRequest = {
            name: groupName || 'Group Chat',
            public: isPublic,
            participantIDs: selectedUsers,
        };

        const result = await createGroup(groupData);
        if (result.success) {
            console.log('Group created successfully:', result.data);
            onCancel(); // Close the form or redirect the user
        } else {
            alert('Failed to create group: ' + result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">Add Users</label>
                <div className="mt-1 flex flex-wrap gap-3">
                    {users.map((user) => (
                        <label key={user.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelectToggle(user.id)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            {user.firstname} {user.lastname}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Group Type</label>
                <div className="flex gap-4">
                    <label>
                        <input
                            type="radio"
                            name="groupType"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        Public
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="groupType"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        Private
                    </label>
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button type="button" onClick={onCancel} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Cancel
                </button>
                <button type="submit" className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Create Group
                </button>
            </div>
        </form>
    );
};

export default CreateGroupForm;
