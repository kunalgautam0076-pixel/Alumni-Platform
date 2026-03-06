import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";

export default function AdminDashboard() {

const [stats,setStats] = useState({
alumni:0,
events:0,
jobs:0,
pending:0
})

useEffect(()=>{
fetchDashboard()
},[])

const fetchDashboard = async()=>{
const res = await api.get("/api/dashboard")
setStats(res.data)
}

return(

<div className="admin-dashboard-wrapper">

<AdminSidebar/>

<div className="admin-dashboard-content">

<h1 className="admin-dashboard-title">System Overview</h1>

<div className="admin-dashboard-stats">

<div className="admin-dashboard-card">
<h3>{stats.alumni}</h3>
<p>Alumni</p>
</div>

<div className="admin-dashboard-card">
<h3>{stats.events}</h3>
<p>Events</p>
</div>

<div className="admin-dashboard-card">
<h3>{stats.jobs}</h3>
<p>Jobs</p>
</div>

<div className="admin-dashboard-card">
<h3>{stats.pending}</h3>
<p>Pending Requests</p>
</div>

</div>

</div>

</div>

)

}