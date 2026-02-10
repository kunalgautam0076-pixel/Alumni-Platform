import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function AlumniDashboard(){
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({name:'', bio:'', education:'', workplace:'', achievements:''})
  useEffect(()=>{
    if(!user) return
    api.get('/api/alumni/me').then(r=>{ setProfile(r.data); setForm({name:r.data.name, bio:r.data.bio, education:r.data.education, workplace:r.data.workplace, achievements:r.data.achievements}) }).catch(()=>{})
  },[user])
  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})
  const save = async e=>{
    e.preventDefault()
    try{
      const res = await api.put('/api/alumni/me/update', form)
      setProfile(res.data)
      alert('Saved')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }
  if(!user) return <div>Please login as alumni</div>
  return (
    <div className="container">
      <h2>Alumni Dashboard</h2>
      {profile && <div className="card">
        <h3>{profile.name}</h3>
        <form onSubmit={save}>
          <input name="name" value={form.name} onChange={onChange} />
          <input name="workplace" value={form.workplace} onChange={onChange} />
          <input name="education" value={form.education} onChange={onChange} />
          <textarea name="bio" value={form.bio} onChange={onChange}></textarea>
          <textarea name="achievements" value={form.achievements} onChange={onChange}></textarea>
          <button type="submit">Save</button>
        </form>
      </div>}
    </div>
  )
}
