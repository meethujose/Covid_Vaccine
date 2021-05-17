import React from 'react'
import './Sidebar.css';
function Sidebar() {
    return (
        <div>
            
<aside className="sidebar">
  <ul className="no-list sb_top_lv">
    <li><i className="fa fa-dashboard"></i><span>Home</span>
      <ul className="no-list sb_dropdown clearfix">
        <li><a>The Dash</a></li>
        <li><a>Settings</a></li>
        <li><a>Account</a></li>
      </ul>
    </li>
    <li><i className="fa fa-cubes"></i><span>Profile Settings</span>
      <ul className="no-list sb_dropdown clearfix">
        <li><a>Awesome Project</a></li>
        <li><a>No Lama No!!</a></li>
        <li><a>I Like Trains</a></li>
      </ul>
    </li>
    <li><i className="fa fa-users"></i><span>Staff Details</span>
      <ul className="no-list sb_dropdown clearfix">
        <li><a>Dashboard</a></li>
        <li><a>Contacts</a></li>
        <li><a>Pipeline</a></li>
        <li><a>Tasks</a></li>
      </ul>
    </li>
    <li><i className="fa fa-tasks"></i><span>Task Center</span>
      <ul className="no-list sb_dropdown clearfix">
        <li><a>The Dash</a></li>
      </ul>
    </li>
    <li><i className="fa fa-lock"></i><span>Access Vault</span>
      <ul className="no-list sb_dropdown clearfix">
        <li><a>The Vault</a></li>
      </ul>
    </li>
  </ul>
</aside>

        </div>
    )
}

export default Sidebar
