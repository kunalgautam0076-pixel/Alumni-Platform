import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function AdminDashboard() {
  const { user } = useAuth()

  // existing states
  const [requests, setRequests] = useState([])
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')

  // event states
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventDesc, setEventDesc] = useState('')

  // job states
  const [jobRole, setJobRole] = useState('')
  const [jobCompany, setJobCompany] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobLink, setJobLink] = useState('')

  // fetch pending alumni requests
  useEffect(() => {
    if (!user) return
    api.get('/api/admin/requests')
      .then(r => setRequests(r.data))
      .catch(() => { })
  }, [user])

  // approve request
  const approve = async id => {
    try {
      await api.post(`/api/admin/approve/${id}`)
      setRequests(requests.filter(r => r._id !== id))
    } catch (err) {
      alert('Failed')
    }
  }

  // reject request
  const reject = async id => {
    try {
      await api.post(`/api/admin/reject/${id}`)
      setRequests(requests.filter(r => r._id !== id))
    } catch (err) {
      alert('Failed')
    }
  }

  // send mail to all approved alumni
  const sendMail = async () => {
    try {
      await api.post('/api/admin/send-mail', { subject, text })
      alert('Emails sent (attempted)')
    } catch (err) {
      alert('Failed')
    }
  }

  // add event
  const addEvent = async () => {
    try {
      await api.post('/api/admin/add-event', {
        title: eventTitle,
        date: eventDate,
        description: eventDesc
      })
      alert("Event added & emails sent")

      setEventTitle("")
      setEventDate("")
      setEventDesc("")
    } catch {
      alert("Failed to add event")
    }
  }

  // add job
  const addJob = async () => {
    try {
      await api.post('/api/admin/add-job', {
        role: jobRole,
        company: jobCompany,
        description: jobDesc,
        link: jobLink
      })
      alert("Job posted")

      setJobRole("")
      setJobCompany("")
      setJobDesc("")
      setJobLink("")
    } catch {
      alert("Failed to post job")
    }
  }

  if (!user || user.role !== 'admin') return <div>Please login as admin</div>

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Pending Requests */}
      <section className="card">
        <h3>Pending Requests</h3>
        {requests.map(r => (
          <div key={r._id} style={{ marginBottom: 8 }}>
            <strong>{r.name}</strong> ({r.email})  
            <button onClick={() => approve(r._id)}>Approve</button>  
            <button onClick={() => reject(r._id)}>Reject</button>
          </div>
        ))}
        {requests.length === 0 && <p>No pending requests</p>}
      </section>

      {/* Send Mail */}
      <section className="card">
        <h3>Send Event Email to All Approved Alumni</h3>
        <input 
          placeholder="Subject" 
          value={subject} 
          onChange={e => setSubject(e.target.value)} 
        /><br />

        <textarea 
          placeholder="Message" 
          value={text} 
          onChange={e => setText(e.target.value)}>
        </textarea><br />

        <button onClick={sendMail}>Send</button>
      </section>

      {/* Add Event */}
      <section className="card">
        <h3>Add Event</h3>
        <input 
          placeholder="Event Title" 
          value={eventTitle} 
          onChange={e => setEventTitle(e.target.value)} 
        /><br />

        <input 
          placeholder="Event Date" 
          value={eventDate} 
          onChange={e => setEventDate(e.target.value)} 
        /><br />

        <textarea 
          placeholder="Description" 
          value={eventDesc} 
          onChange={e => setEventDesc(e.target.value)}>
        </textarea><br />

        <button onClick={addEvent}>Add Event</button>
      </section>

      {/* Add Job */}
      <section className="card">
        <h3>Add Job Posting</h3>
        <input 
          placeholder="Job Role" 
          value={jobRole} 
          onChange={e => setJobRole(e.target.value)} 
        /><br />

        <input 
          placeholder="Company Name" 
          value={jobCompany} 
          onChange={e => setJobCompany(e.target.value)} 
        /><br />

        <textarea 
          placeholder="Job Description" 
          value={jobDesc} 
          onChange={e => setJobDesc(e.target.value)}>
        </textarea><br />

        <input 
          placeholder="Apply Link" 
          value={jobLink} 
          onChange={e => setJobLink(e.target.value)} 
        /><br />

        <button onClick={addJob}>Post Job</button>
      </section>
    </div>
  )
}
