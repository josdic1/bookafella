import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReservationContext from "../contexts/ReservationContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function NewReservation () {
    const { handleAdd } = useContext(ReservationContext);
    const { currentUser } = useContext(CurrentUserContext);
    const [startDate, setStartDate] = useState(new Date());

    const [ formData, setFormData ] = useState({
        member_id: "",
        member: "",
        room: "",
        arrival: "",
        guests: 0, // Initialize guests as a number (0)
        guest_array: "", // This holds the comma-separated string from the input
        notes: ""
    });

    const navigate = useNavigate();

    // Effect to set current user's ID and name when available
    useEffect(() => {
        if(currentUser?.id) { // Use optional chaining for safety
          setFormData(prev => ({
            ...prev,
            member_id: currentUser.id,
            member: currentUser.member
          }));
        }
    },[currentUser]);

    // Effect to update arrival date in formData when startDate (from DatePicker) changes
    useEffect(() => {
        if (startDate) {
            const formattedDate = startDate.toISOString().slice(0, 16);
            setFormData(prev => ({
                ...prev,
                arrival: formattedDate
            }));
        }
    }, [startDate]);

    // New Effect: Update 'guests' count in real-time based on 'guest_array' input
    useEffect(() => {
        const processedGuests = formData.guest_array
            .split(',')                  // NOW SPLITTING BY COMMA
            .map(s => s.trim())          // Trim whitespace
            .filter(s => s);             // Remove empty strings

        setFormData(prev => ({
            ...prev,
            guests: processedGuests.length // Update 'guests' with the count of valid names
        }));
    }, [formData.guest_array]); // Re-run this effect whenever 'guest_array' changes

    const onFormChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Button handler to add a comma and space
    const handleAddGuestSeparator = () => {
        const currentInputValue = formData.guest_array.trim();
        // Only add separator if the current input isn't empty and doesn't already end with a comma
        if (currentInputValue !== '' && !currentInputValue.endsWith(',')) {
            setFormData(prev => ({
                ...prev,
                guest_array: `${currentInputValue}, ` // Append comma and space
            }));
        }
    };

    function onSubmit(e) {
        e.preventDefault();

        // Process the guest_array string into an array before sending
        const guestArrayProcessed = formData.guest_array
            .split(',')                  // NOW SPLITTING BY COMMA
            .map(s => s.trim())          // Trim whitespace from each part
            .filter(s => s);             // Remove any empty strings (e.g., from trailing commas)

        const newReservation = {
            ...formData,
            guest_array: guestArrayProcessed, // Use the processed array for submission
            guests: guestArrayProcessed.length, // Ensure guests count is accurate on submit
        };
        handleAdd(newReservation);
        onCancel();
    }

    function onClear() {
        setFormData({
            member_id: currentUser.id || "",
            member: currentUser.member || "",
            room: "",
            arrival: "",
            guests: 0, // Reset to 0
            guest_array: "", // Reset to empty string
            notes: ""
        });
        setStartDate(new Date()); // Reset DatePicker to current date
    }

    function onCancel() {
        onClear();
        navigate('/home');
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id="member"
                    name="member"
                    onChange={onFormChange}
                    value={formData.member}
                    placeholder="Member..."
                    readOnly={!!currentUser?.id} // Make readOnly if currentUser exists
                />
                <label htmlFor="room"> Room: </label>
                <select id="room" name="room" onChange={onFormChange} value={formData.room}>
                    <option disabled value="">Room...</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                    <option value="e">E</option>
                </select>
                <label htmlFor="arrival"> Arrival Date & Time: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    timeFormat="p"
                    timeIntervals={15}
                    minDate={new Date()}
                />

                <label htmlFor="guests"> Total Guests: </label>
                <input
                    disabled // This field is derived, so disable it
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests} // Display the real-time count
                    placeholder="Total party size..."
                />

                <label htmlFor="guest_array"> Other Guest Names: </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> {/* Use flex for layout */}
                    <input
                        type="text"
                        id="guest_array"
                        name="guest_array"
                        onChange={onFormChange}
                        value={formData.guest_array}
                        placeholder="e.g., 'Josh, Dorrie, Demi'" // Updated placeholder to suggest commas
                        style={{ flexGrow: 1 }} // Allows input to take available space
                    />
                    <button type="button" onClick={handleAddGuestSeparator} title="Add another guest">
                        Add
                    </button>
                </div>
                <label htmlFor="notes"> Notes: </label>
                <input type="text" id="notes" name="notes" onChange={onFormChange} value={formData.notes} placeholder="Notes..." />

                <button type='submit'> Submit </button>
                <button type='button' onClick={onClear}> Clear </button>
                <button type='button' onClick={onCancel}> Cancel </button>
            </form>
        </>
    );
}

export default NewReservation;
