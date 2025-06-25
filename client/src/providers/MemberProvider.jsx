import { useState, useEffect } from "react"
import MemberContext from "../contexts/MemberContext"

function MemberProvider({children}) {
   const [ members, setMembers ] = useState([])
   const [ loading, setLoading ] = useState(true)

useEffect(() => {
   fetchData()
}, [])

async function fetchData() {
   try {
      setLoading(true)
      const r = await fetch(`${import.meta.env.VITE_API_URL}/members`)
      if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      setMembers(data)
   }catch (error) {console.error("❌ Caught error:", error)
          } finally {
            setLoading(false); 
   }
}

async function handleAdd(newMem) {
   try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/members`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newMem)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = [...members, data]
      setMembers(updated)
    }catch (error) {console.error("❌ Caught error:", error)
          } finally {
            setLoading(false); 
         
   }
}

async function handleEdit(updatedMem) {
   try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/members/${updatedMem.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedMem)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = members.map(mem => (
         mem.id === data.id ? data : mem
      ))
      setMembers(updated)
    }catch (error) {console.error("❌ Caught error:", error)
                } finally {
            setLoading(false); 
          
   }
}

async function handleDelete(memId) {
   try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/members/${memId}`, {
         method: 'DELETE'
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }

      const updated = members.filter(mem => mem.id !== memId)
         setMembers(updated)
      } catch (error) { console.error("❌ Caught error:", error) } finally {
         setLoading(false);
      }
   }


return (
<>
<MemberContext.Provider
value={{ members, loading, handleAdd, handleEdit, handleDelete }}
>
   {children}
</MemberContext.Provider>
</>
)}

export default MemberProvider
