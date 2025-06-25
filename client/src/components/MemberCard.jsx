
function MemberCard({ member, onListClick }) {

const onClick = (e) => {
    const { id, name } = e.target
    onListClick(id, name)
}


return (
<>
<tr id={member.id}>
    <td>{member.id}</td>
        <td>{member.member}</td>
          <td>{member.role}</td>
                <td>
            <button id={member.id} type="button" name="view" onClick={onClick}>View</button>
        </td>
                <td>
            <button id={member.id} type="button" name="edit" onClick={onClick}>Edit</button>
        </td>
        <td>
            <button id={member.id} type="button" name="delete" onClick={onClick}>Del</button>
        </td>

</tr>
</>
)}

export default MemberCard
