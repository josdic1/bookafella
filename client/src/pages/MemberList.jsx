import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import MemberCard from "../components/MemberCard"
import MemberContext from "../contexts/MemberContext"

function Members() {
    const { members, handleDelete } = useContext(MemberContext)

    const navigate = useNavigate()

    function onListClick(id, name) {
        switch(name) {
            case 'view':
                navigate(`/member/${id}`)
                break;
            case 'edit':
                navigate(`/edit/member/${id}`)
                break;
            case 'delete':
                handleDelete(id)
                break;
            default:
                break;
        }
    }

    const listData = members.map(mem => (
        <MemberCard 
        key={mem.id} 
        member={mem} 
        onListClick={onListClick}
        />
    ))

return (
<>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Role</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {listData}
    </tbody>
</table>
</>
)}

export default Members
