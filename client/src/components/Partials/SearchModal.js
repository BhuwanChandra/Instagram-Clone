import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

function SearchModal({ refProp, modal }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const {state, dispatch} = useContext(UserContext);

  const searchUser = (query) => {
    setSearch(query);
    if(query != '')
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error){
          setUsers([...data.users]);
        }
      })
      .catch(err => {
        console.log(err);
      });
      else setUsers([]);
  };


  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers }
        });
        localStorage.setItem("user", JSON.stringify(result));
        setUsers(users.map(user => {
          if(user._id === userId){
            return {
              ...user,
              followers: [...user.followers, result._id]
            }
          }
          return user;
        }))
      })
      .catch(err => console.log(err));
  };

  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userId
      })
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers }
        });
        localStorage.setItem("user", JSON.stringify(result));
        setUsers(users.map(user => {
          if (user._id === userId) {
            return {
              ...user,
              followers: [...user.followers.filter(e => e !== result._id)]
            }
          }
          return user;
        }))
      })
      .catch(err => console.log(err));
  };


  return (
    <>
        <div ref={refProp} id="modal1" className="modal">
          <div className="modal-content input-field">
            <input
              value={search}
              type="text"
              placeholder="search user"
              onChange={e => searchUser(e.target.value.trim())}
            />{ users.length !== 0 ?
            <ul className="collection">
              {
                users.map(user => {
                    return user._id !== state._id ? (
                      <li key={user._id} className="collection-item avatar">
                        <Link
                          to={`/profile/${user._id}`}
                          onClick={() => {
                            setSearch("");
                            setUsers([]);
                            modal(refProp.current).close();
                          }}
                        >
                          <img src={user.pic} alt="" className="circle" />
                          <span className="title">{user.name}</span>
                          <p>{user.email}</p>
                        </Link>
                        {user.followers.includes(state._id) ? (
                          <button
                            className="btn btn-small #42a5f5 blue darken-1 p-btn secondary-content"
                            onClick={() => unfollowUser(user._id)}
                          >
                            {" "}
                            Unfollow{" "}
                          </button>
                        ) : (
                          <button
                            className="btn btn-small #42a5f5 blue darken-1 p-btn secondary-content"
                            onClick={() => followUser(user._id)}
                          >
                            {" "}
                            follow{" "}
                          </button>
                        )}
                      </li>
                    ) : undefined;
                })
              }
            </ul> : ""
          }</div>
          <div className="modal-footer">
            <button onClick={()=> {setSearch('');setUsers([]);}} className="modal-close waves-effect waves-green btn-flat">
              close
            </button>
          </div>
        </div>
    </>
  );
}

export default SearchModal;
