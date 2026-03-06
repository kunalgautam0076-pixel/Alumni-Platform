import { useEffect,useState } from "react"
import api from "../../services/api"
import AdminSidebar from "./AdminSidebar"
import "./AdminJobs.css"

export default function AdminJobs(){

const [jobs,setJobs] = useState([])

const [newJob,setNewJob] = useState({
role:"",
company:"",
location:"",
type:"",
salary:""
})

useEffect(()=>{
fetchJobs()
},[])

const fetchJobs = async()=>{
const res = await api.get("/api/jobs")
setJobs(res.data)
}

const handleChange = (e)=>{
setNewJob({...newJob,[e.target.name]:e.target.value})
}

const addJob = async()=>{
await api.post("/api/jobs",newJob)
fetchJobs()
}

const deleteJob = async(id)=>{
await api.delete(`/api/jobs/${id}`)
fetchJobs()
}

return(

<div className="admin-jobs-wrapper">

<AdminSidebar/>

<div className="admin-jobs-content">

<h1 className="admin-jobs-title">Manage Jobs</h1>

<div className="admin-jobs-form">

<input name="role" placeholder="Role" onChange={handleChange}/>
<input name="company" placeholder="Company" onChange={handleChange}/>
<input name="location" placeholder="Location" onChange={handleChange}/>

<select name="type" onChange={handleChange}>
<option value="">Select Type</option>
<option value="Full-Time">Full-Time</option>
<option value="Part-Time">Part-Time</option>
<option value="Internship">Internship</option>
</select>

<input name="salary" placeholder="Salary" onChange={handleChange}/>

<button onClick={addJob}>Add Job</button>

</div>

{jobs.map(job=>(
<div key={job._id} className="admin-jobs-box">

<div>
<h4>{job.role} - {job.company}</h4>
<p>{job.location}</p>
</div>

<button onClick={()=>deleteJob(job._id)}>Delete</button>

</div>
))}

</div>
</div>

)

}