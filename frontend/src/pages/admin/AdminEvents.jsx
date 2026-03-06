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
await api.post("/api/events",newEvent)
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

<div className="admin-events-form">

<input name="title" placeholder="Title" onChange={handleChange}/>
<input name="description" placeholder="Description" onChange={handleChange}/>
<input type="date" name="date" onChange={handleChange}/>
<input name="location" placeholder="Location" onChange={handleChange}/>

<button onClick={addEvent}>Add Event</button>

</div>

{events.map(event=>(
<div key={event._id} className="admin-events-box">

<div>
<h4>{event.title}</h4>
<p>{new Date(event.date).toDateString()}</p>
</div>

<button onClick={()=>deleteEvent(event._id)}>Delete</button>

</div>
))}

</div>
</div>

)

}