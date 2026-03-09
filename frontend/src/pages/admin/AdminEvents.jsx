import { useEffect,useState } from "react"
import api from "../../services/api"
import AdminSidebar from "./AdminSidebar"
import "./AdminEvents.css"

export default function AdminEvents(){

const [events,setEvents] = useState([])

const [newEvent,setNewEvent] = useState({
title:"",
description:"",
date:"",
location:""
})

useEffect(()=>{
fetchEvents()
},[])

const fetchEvents = async()=>{
const res = await api.get("/api/events")
setEvents(res.data)
}

const handleChange = (e)=>{
setNewEvent({...newEvent,[e.target.name]:e.target.value})
}

const addEvent = async()=>{
if(!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location){
alert("Please fill all fields")
return
}

await api.post("/api/events",newEvent)

setNewEvent({
title:"",
description:"",
date:"",
location:""
})

fetchEvents()
}

const deleteEvent = async(id)=>{
await api.delete(`/api/events/${id}`)
fetchEvents()
}

return(

<div className="admin-events-wrapper">

<AdminSidebar/>

<div className="admin-events-content">

<h1 className="admin-events-title">Manage Events</h1>

{/* Event Form */}

<div className="admin-events-card">

<h2 className="admin-events-subtitle">Create New Event</h2>

<div className="admin-events-form">

<input
name="title"
placeholder="Event Title"
value={newEvent.title}
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Event Description"
value={newEvent.description}
onChange={handleChange}
/>

<input
type="date"
name="date"
value={newEvent.date}
onChange={handleChange}
/>

<input
name="location"
placeholder="Event Location"
value={newEvent.location}
onChange={handleChange}
/>

<button className="admin-events-add-btn" onClick={addEvent}>
Add Event
</button>

</div>

</div>

{/* Events List */}

<h2 className="admin-events-subtitle">All Events</h2>

<div className="admin-events-grid">

{events.map(event=>(

<div key={event._id} className="admin-event-item">

<div className="admin-event-info">

<h3>{event.title}</h3>

<p className="admin-event-desc">
{event.description}
</p>

<p className="admin-event-date">
📅 {new Date(event.date).toDateString()}
</p>

<p className="admin-event-location">
📍 {event.location}
</p>

</div>

<button
className="admin-event-delete"
onClick={()=>deleteEvent(event._id)}
>
Delete
</button>

</div>

))}

</div>

</div>

</div>

)

}