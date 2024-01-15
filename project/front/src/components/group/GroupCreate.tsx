import React, { useState } from 'react';
// import { useCreateGroupMutation } from '../../api/chatApi';
import { useAppDispatch } from '../../hooks';
// import { addGroup } from '../../redux/slices/groupSlice';

const GroupCreate = () => {
    const [groupName, setGroupName] = useState('');
    // const [createGroup, { isLoading }] = useCreateGroupMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // const newGroup = await createGroup({ name: groupName }).unwrap();
            // dispatch(addGroup(newGroup));
            setGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                required
            />
            {/* <button type="submit" disabled={isLoading}>Create Group</button> */}
        </form>
    );
};

export default GroupCreate;
