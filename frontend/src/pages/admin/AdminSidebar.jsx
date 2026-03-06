import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-logo">
        ⚡ CONTROL
      </div>

      <nav className="admin-sidebar-menu">

        <NavLink to="/admin" end className="admin-sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/events" className="admin-sidebar-link">
          Events
        </NavLink>

        <NavLink to="/admin/jobs" className="admin-sidebar-link">
          Jobs
        </NavLink>

        <NavLink to="/admin/requests" className="admin-sidebar-link">
          Requests
        </NavLink>

      </nav>

    </aside>
  );
}