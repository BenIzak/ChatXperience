import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
// import { useUpdateGroupMutation } from '../../api/chatApi';
// import { updateGroup } from '../../redux/slices/groupSlice';

const GroupSettings = () => {
    const currentGroup = useAppSelector(
        (state) => state.group.currentGroupDetails
    )
    const [groupName, setGroupName] = useState(currentGroup?.name || '')
    // const [updateGroupMutation] = useUpdateGroupMutation();
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // const updatedGroup = await updateGroupMutation({ id: currentGroup?.id, name: groupName }).unwrap();
            // dispatch(updateGroup(updatedGroup));
        } catch (error) {
            console.error('Error updating group:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="groupName">Group Name:</label>
            <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter new group name"
                required
            />
            <button type="submit">Update Group</button>
        </form>
    )
}

export default GroupSettings
