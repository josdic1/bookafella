import { FaRegStickyNote, FaUsers } from 'react-icons/fa';

function ReservationCard({ reservation, onListClick }) {

    let displayDate = null;
  if (reservation.arrival) {
    displayDate = new Date(reservation.arrival);
  }

let formattedDisplayTime = '';
  if (displayDate && !isNaN(displayDate)) { 
    formattedDisplayTime = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',    
      year: '2-digit',    
      hour: 'numeric',    
      minute: '2-digit', 
      hour12: true        
    }).format(displayDate).replace(', ', ' '); 
  }

  const onClick = (e) => {
    const { id, name } = e.target
    onListClick(id, name)
}



return (
    <>
        <tr id={reservation.id}>
            <td>{reservation.member}</td>
            <td>{reservation.room}</td>
            <td>{formattedDisplayTime}</td>
            <td>{reservation.guests + 1}</td>
            <td>
                {reservation.notes && (
                    <FaRegStickyNote title="Has Notes" style={{ color: '#007bff', marginRight: '5px' }} />
                )}
                {reservation.guest_array && reservation.guest_array.length > 0 && (
                    <FaUsers title="Has Additional Guests" style={{ color: '#28a745' }} />
                )}
                {/* You can also add text next to icons or make them clickable */}
            </td>
            <td>
                <button id={reservation.id} type="button" name="view" onClick={onClick}>View</button>
            </td>
            <td>
                <button id={reservation.id} type="button" name="edit" onClick={onClick}>Edit</button>
            </td>
            <td>
                <button id={reservation.id} type="button" name="delete" onClick={onClick}>Del</button>
            </td>
        </tr>
    </>
);}

export default ReservationCard
