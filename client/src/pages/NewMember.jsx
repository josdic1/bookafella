import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import MemberContext from "../contexts/MemberContext"

function NewMember () {
    const { handleAdd } = useContext(MemberContext)
    
    const [ formData, setFormData ] = useState({
        member: "",
        role: ""
    })

    const navigate = useNavigate()

    const onFormChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        const newMember = {
            ...formData,
            member: formData.member.toLowerCase(),
            role: formData.role || "user"
        }
        handleAdd(newMember)
         onCancel()
    }

    function onClear() {
        setFormData({
        member: "",
        role: ""
        })
       
    }

    function onCancel() {
        onClear()
        navigate('/home')
    }

return (
<>
<form onSubmit={onSubmit}>
    <label htmlFor="member"> Member: </label>
    <input type="text" id="member" name="member" onChange={onFormChange} value={formData.member} placeholder="Member name..." />
        <select id="role" name="role" onChange={onFormChange} value={formData.role}>
        <option value="user">User</option>
         <option value="admin">Admin</option>
    </select>
    <button type='submit'> Submit </button>
    <button type='button' onClick={onClear}> Clear </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default NewMember
