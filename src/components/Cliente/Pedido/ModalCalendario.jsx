import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function ModalCalendario({ onClose }) {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Calendar 
            onChange={setDate} 
            value={date}  
            className="absolute top-20 left-[55rem]" 
            />
        </>
    );
}

export default ModalCalendario;