import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function AlumniProfile(){
  const { id } = useParams()
  const [alumni, setAlumni] = useState(null)
  useEffect(()=>{ api.get(`/api/alumni/profile/${id}`).then(r=>setAlumni(r.data)).catch(()=>{}) }, [id])
  if(!alumni) return <div>Loading...</div>
  return (
    <div className="container">
      <h2>{alumni.name}</h2>
      <p><strong>Workplace:</strong> {alumni.workplace}</p>
      <p><strong>Education:</strong> {alumni.education}</p>
      <p><strong>Bio:</strong> {alumni.bio}</p>
      <p><strong>Achievements:</strong> {alumni.achievements}</p>
    </div>
  )
}
