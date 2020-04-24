import React, {useContext} from "react";
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import '../../App.css';

function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/explore">Explore</Link></li>,
        <li>
          <button
            className="btn #f4511e deep-orange darken-1"
            onClick={() => {
              localStorage.clear();
              dispatch({type: "CLEAR"});
              history.push("/login");
            }}
          >
            LogOut
          </button>
        </li>
      ];
    }else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      ];
    }
  }
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/login"} className="brand-logo">
            Instagram
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
      <ul className="sidenav sidenav-close" id="mobile-demo">
        <li style={{paddingTop: '8px'}}>
          <Link to={state ? "/" : "/login"} className="brand-logo">
          Instagram
          </Link>
        </li>
        <li><div class="divider"></div></li>
        {renderList()}
      </ul>
    </>
  );
}

export default Navbar;
