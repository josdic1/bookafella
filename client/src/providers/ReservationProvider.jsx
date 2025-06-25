import { useState, useEffect } from "react"
import ReservationContext from "../contexts/ReservationContext"

function ReservationProvider({ children }) {
   const [reservations, setReservations] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      fetchData()
   }, [])

   async function fetchData() {
      try {
         setLoading(true)
         const r = await fetch(`${import.meta.env.VITE_API_URL}/reservations`)
         if (!r.ok) {
            throw new Error("💥 Error");
         }
         const data = await r.json()
         setReservations(data)
      } catch (error) {
         console.error("❌ Caught error:", error);
      } finally {
         setLoading(false)
      }
   }

   async function handleAdd(newRes) {
      try {
         const r = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRes)
         })
         if (!r.ok) {
            throw new Error("💥 Error");
         }
         const data = await r.json()
         const updated = [...reservations, data]
         setReservations(updated)
      } catch (error) {
         console.error("❌ Caught error:", error)
      } finally {
         setLoading(false);

      }
   }

   async function handleEdit(updatedRes) {
      try {
         const r = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${updatedRes.id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRes)
         })
         if (!r.ok) {
            throw new Error("💥 Error");
         }
         const data = await r.json()
         const updated = reservations.map(res => (
            res.id === data.id ? data : res
         ))
         setReservations(updated)
      } catch (error) {
         console.error("❌ Caught error:", error)
      } finally {
         setLoading(false);

      }
   }


   async function handleDelete(resId) {
      try {
         const r = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${resId}`, {
            method: 'DELETE'
         })
         if (!r.ok) {
            throw new Error("💥 Error");
         }
         const updated = reservations.filter(res => res.id !== resId)
         setReservations(updated)
      } catch (error) { console.error("❌ Caught error:", error) } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <ReservationContext.Provider
            value={{ reservations, loading, handleAdd, handleEdit, handleDelete }}
         >
            {children}
         </ReservationContext.Provider>
      </>
   )
}

export default ReservationProvider
