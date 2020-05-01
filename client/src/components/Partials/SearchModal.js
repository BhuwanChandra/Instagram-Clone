import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function SearchModal({ refProp, modal }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { state } = useContext(UserContext);

  const searchUser = query => {
    setSearch(query);
    if (query != "")
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
          if (!data.error) {
            setUsers([...data.users]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    else setUsers([]);
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
          />
          {users.length !== 0 ? (
            <ul className="collection">
              {users.map(user => {
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
                      <div>
                        <img src={user.pic} alt="" className="circle" />
                        <span className="title">{user.name}</span>
                        <p>{user.email}</p>
                      </div>
                    </Link>
                  </li>
                ) : (
                  undefined
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              setSearch("");
              setUsers([]);
            }}
            className="modal-close waves-effect waves-green btn-flat"
          >
            close
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
