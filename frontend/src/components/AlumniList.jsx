import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AlumniList.css";

export default function AlumniList() {

  const alumniData = [
    {
      _id: "1",
      name: "Rahul Sharma",
      yearOfPassing: 2015,
      course: "Computer Science Engineering",
      position: "Senior Software Engineer",
      workplace: "Google",
      location: "Bangalore, India",
      bio: "Passionate about scalable systems and cloud architecture.",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      _id: "2",
      name: "Priya Verma",
      yearOfPassing: 2018,
      course: "Information Technology",
      position: "Product Manager",
      workplace: "Microsoft",
      location: "Hyderabad, India",
      bio: "Driving innovation in enterprise SaaS platforms.",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      _id: "3",
      name: "Amit Patel",
      yearOfPassing: 2012,
      course: "Mechanical Engineering",
      position: "Operations Head",
      workplace: "Tata Motors",
      location: "Pune, India",
      bio: "Leading manufacturing excellence initiatives.",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      _id: "4",
      name: "Sneha Kulkarni",
      yearOfPassing: 2017,
      course: "Electronics Engineering",
      position: "Embedded Systems Engineer",
      workplace: "Intel",
      location: "Mumbai, India",
      bio: "Working on next-gen IoT hardware solutions.",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      _id: "5",
      name: "Rohan Mehta",
      yearOfPassing: 2014,
      course: "Civil Engineering",
      position: "Project Manager",
      workplace: "L&T Construction",
      location: "Delhi, India",
      bio: "Managing large-scale infrastructure projects.",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      _id: "6",
      name: "Anjali Desai",
      yearOfPassing: 2019,
      course: "Computer Science Engineering",
      position: "Data Scientist",
      workplace: "Amazon",
      location: "Chennai, India",
      bio: "Building AI-driven recommendation systems.",
      image: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      _id: "7",
      name: "Kunal Gupta",
      yearOfPassing: 2016,
      course: "Information Technology",
      position: "Full Stack Developer",
      workplace: "Infosys",
      location: "Noida, India",
      bio: "Developing scalable web applications.",
      image: "https://randomuser.me/api/portraits/men/17.jpg",
    },
    {
      _id: "8",
      name: "Neha Singh",
      yearOfPassing: 2013,
      course: "Electronics Engineering",
      position: "Network Engineer",
      workplace: "Cisco",
      location: "Bangalore, India",
      bio: "Specialized in enterprise networking solutions.",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      _id: "9",
      name: "Vikram Joshi",
      yearOfPassing: 2011,
      course: "Mechanical Engineering",
      position: "Plant Head",
      workplace: "Mahindra",
      location: "Nagpur, India",
      bio: "Driving production efficiency and innovation.",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      _id: "10",
      name: "Ritika Sharma",
      yearOfPassing: 2020,
      course: "Computer Science Engineering",
      position: "UI/UX Designer",
      workplace: "Flipkart",
      location: "Bangalore, India",
      bio: "Designing user-centric digital experiences.",
      image: "https://randomuser.me/api/portraits/women/20.jpg",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredAlumni = alumniData.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="alumni-page">

      <div className="alumni-header">
        <h1>Alumni Directory</h1>
        <p>Explore our strong and growing alumni network.</p>

        <input
          type="text"
          placeholder="Search alumni by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="alumni-grid">
        {filteredAlumni.map((a) => (
          <div className="alumni-card" key={a._id}>

            <div className="alumni-image">
              <img src={a.image} alt={a.name} />
            </div>

            <div className="alumni-info">
              <h3>{a.name}</h3>
              <p className="year">Batch: {a.yearOfPassing}</p>
              <p>{a.course}</p>
              <p>{a.position}</p>
              <p>{a.workplace}</p>
              <p>{a.location}</p>
              <p className="bio">{a.bio}</p>

              <Link to={`/alumni/${a._id}`} className="view-btn">
                View Profile
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
