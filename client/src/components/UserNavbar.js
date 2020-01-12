import React from "react";



  function UserNavbar(props) {
    return (
      <div id="user-nav">
        <nav className="navbar navbar-light bg-light">
          <h1><a className="navbar-brand" href="/">Macklist</a></h1>
          <div className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Welcome {props.user}!
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/">My Posts</a>
          <a className="dropdown-item" href="/">Change Password</a>
          <a className="dropdown-item" href="/">Logout</a>
        </div>
        </div>
        </nav>       
      </div>
    );
  }


export default UserNavbar;