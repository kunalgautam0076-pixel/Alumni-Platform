import { useEffect,useState } from "react"
import api from "../../services/api"
import AdminSidebar from "./AdminSidebar"
import "./AdminRequests.css"

export default function AdminRequests(){

const [requests,setRequests] = useState([])

useEffect(()=>{
fetchRequests()
},[])

const fetchRequests = async()=>{
const res = await api.get("/api/admin/requests")
setRequests(res.data)
}

const approveUser = async(id)=>{
await api.post(`/api/admin/approve/${id}`)
fetchRequests()
}

const rejectUser = async(id)=>{
await api.post(`/api/admin/reject/${id}`)
fetchRequests()
}

return(

<div className="admin-requests-wrapper">

<AdminSidebar/>

<div className="admin-requests-content">

<h1 className="admin-requests-title">Pending Requests</h1>

{requests.map(user=>(
<div key={user._id} className="admin-requests-box">

<div>
<h4>{user.name}</h4>
<p>{user.email}</p>
</div>

<div>
<button className="admin-approve" onClick={()=>approveUser(user._id)}>Approve</button>
<button className="admin-reject" onClick={()=>rejectUser(user._id)}>Reject</button>
</div>

</div>
))}

</div>
</div>

)

}