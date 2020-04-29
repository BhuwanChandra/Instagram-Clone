import React, {useContext, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import '../../App.css';
import SearchModal from "./SearchModal";

function Navbar() {
  const SearchRef = useRef(null);
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(SearchRef.current);
  }, [])

  const renderList = () => {
    if(state){
      return [
        <li key="search"><i data-target="modal1" className="material-icons modal-trigger">search</i></li>,
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="create"><Link to="/create">Create Post</Link></li>,
        <li key="explore"><Link to="/explore">Explore</Link></li>,
        <li key="logout">
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
        <li key="login"><Link to="/login">Login</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
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
        <li><div className="divider"></div></li>
        {renderList()}
      </ul>
      <SearchModal state={state} modal={M.Modal.getInstance} refProp={SearchRef} />
    </>
  );
}

export default Navbar;
