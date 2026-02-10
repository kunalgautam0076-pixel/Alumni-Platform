import React, {useEffect, useState} from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function AlumniList(){
  const [alumni, setAlumni] = useState([])
  useEffect(()=>{ api.get('/api/alumni/list').then(r=>setAlumni(r.data)).catch(()=>{}) }, [])
  return (
    <div className="container">
      <h2>Alumni</h2>
      {alumni.map(a=> (
        <div className="card" key={a._id}>
          <h3><Link to={`/alumni/${a._id}`}>{a.name}</Link></h3>
          <p>{a.workplace}</p>
        </div>
      ))}
    </div>
  )
}
