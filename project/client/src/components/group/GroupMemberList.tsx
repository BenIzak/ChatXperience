// import { useGetGroupMembersQuery, useAddMemberMutation, useRemoveMemberMutation } from '../../api/chatApi';
import { useAppSelector } from '../../hooks'

const GroupMemberList = () => {
    const currentGroupId = useAppSelector((state) => state.group.currentGroup)
    // const { data: members, isLoading, isError } = useGetGroupMembersQuery(currentGroupId);
    // const [addMember] = useAddMemberMutation();
    // const [removeMember] = useRemoveMemberMutation();

    // if (isLoading) return <div>Loading members...</div>;
    // if (isError || !members) return <div>Error loading members.</div>;

    const handleAddMember = (userId: string) => {
        // addMember({ groupId: currentGroupId, userId });
    }

    const handleRemoveMember = (userId: string) => {
        // removeMember({ groupId: currentGroupId, userId });
    }

    return (
        <div>
            <h3>Group Members</h3>
            <ul>
                {/* {members.map((member) => (
                    <li key={member.id}>
                        {member.name}
                        <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
                    </li>
                ))} */}
            </ul>
            {/* Component or logic to add new members */}
        </div>
    )
}

export default GroupMemberList
