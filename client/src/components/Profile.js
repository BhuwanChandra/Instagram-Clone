import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import "../App.css";
import { UserContext } from "../App";

function Profile() {
  const { state } = useContext(UserContext);
  const [mypics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(res => {
        setPics(res.mypost);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {!loading ? (
        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px"
            }}
          >
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <img
                style={{ width: "160px", height: "160px", borderRadius: "50%", marginBottom: '10px' }}
                src={state ? state.pic : ""}
                alt={state ? state.name : ""}
              />

              <Link
                to="/profile/edit"
                className="btn btn-small #42a5f5 blue darken-1"
              >Edit Profile</Link>
            </div>
            <div>
              <h4>{state ? state.name : ""}</h4>
              <h5>{state ? state.email : ""}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%"
                }}
              >
                <h6>{mypics.length} posts</h6>
                <h6>{state ? state.followers.length : 0} followers</h6>
                <h6>{state ? state.following.length : 0} following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {mypics.map(item => (
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
          <h2>loading...</h2>
        </center>
      )}
    </>
  );
}

export default Profile;
