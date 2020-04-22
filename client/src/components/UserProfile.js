import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setProfile(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      { (userProfile.user && userProfile.posts) ?(
        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey"
            }}
          >
            <div>
              <img
                style={{ width: "160px", height: "160px", borderRadius: "50%" }}
                src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%"
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map(item => (
              <div key={item._id} className="img-item">
                <img
                  className="gallery-item"
                  src={item.photo}
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <center>
          <h2>Loading...</h2>
        </center>
      )}
    </>
  );
}

export default UserProfile;
