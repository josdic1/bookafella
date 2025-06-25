import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReservationContext from "../contexts/ReservationContext";

function EditReservation() {
    const { id } = useParams(); // Get the ID from the URL
    const { reservations, handleEdit } = useContext(ReservationContext); // Access context
    const navigate = useNavigate();

    // Initialize startDate to null, to be set by useEffect once reservation data is loaded
    const [startDate, setStartDate] = useState(null);

    const [formData, setFormData] = useState({
        id: "", // Make sure ID is part of formData for the PATCH request
        member: "",
        room: "",
        arrival: "",
        guests: 0, // Initialize guests as a number (0)
        guest_array: "", // Ensure initial state is an empty string
        notes: ""
    });

    // Effect to populate formData when reservation data is loaded or ID changes
    useEffect(() => {
        if (reservations.length > 0 && id) {
            const foundReservation = reservations.find(res => res.id === id);
            if (foundReservation) {
                // Set the DatePicker's state to the found reservation's arrival date
                if (foundReservation.arrival) {
                    const parsedDate = new Date(foundReservation.arrival);
                    setStartDate(parsedDate);
                } else {
                    setStartDate(new Date()); // Fallback to current date if no arrival date
                }

                // Populate formData, ensuring guest_array is a comma-separated string for the input
                setFormData({
                    id: foundReservation.id,
                    member: foundReservation.member,
                    room: foundReservation.room,
                    // arrival will be set by the startDate effect
                    arrival: foundReservation.arrival
                             ? new Date(foundReservation.arrival).toISOString().slice(0, 16)
                             : "",
                    guests: foundReservation.guests || 0, // Ensure it's a number
                    notes: foundReservation.notes || "",
                    // JOINING WITH COMMA AND SPACE for display in the input field
                    guest_array: Array.isArray(foundReservation.guest_array)
                                 ? foundReservation.guest_array.join(', ') // JOINING WITH COMMA
                                 : foundReservation.guest_array || ""
                });
            }
        }
    }, [id, reservations]);

    // Effect to update 'arrival' in formData when 'startDate' (from DatePicker) changes
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
            .split(',')                  // Split by comma
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

    // New: Button handler to add a comma and space (matching NewReservation)
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
            .split(',')                  // SPLITTING BY COMMA
            .map(s => s.trim())          // Trim whitespace from each part
            .filter(s => s);             // Remove any empty strings (e.g., from trailing commas)

        const updatedReservation = {
            ...formData,
            guest_array: guestArrayProcessed, // Use the processed array for submission
            guests: guestArrayProcessed.length, // Ensure guests count is accurate on submit
        };
        handleEdit(updatedReservation);
        onCancel();
    }

    function onClear() {
        setFormData({
            id: "",
            member: "",
            arrival: "",
            room: "",
            guests: 0,
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
                    readOnly // Member name usually shouldn't be editable here
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
                    minDate={new Date()} // Keep for future reservations
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
                {/* Add the flex container and button for guest_array input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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

                <button type='submit'> Update </button>
                <button type='button' onClick={onCancel}> Cancel </button>
            </form>
        </>
    );
}

export default EditReservation;
