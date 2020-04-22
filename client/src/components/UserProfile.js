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
        // console.log(res);
        setProfile(res);
      })
      .catch(err => console.log(err));
  }, []);

  const followUser = () => {
      fetch("/follow",{
          method: "put",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
              followId: userId
          })
      }).then(res => res.json())
      .then(result => {
          dispatch({type: "UPDATE", payload: { following: result.following, followers: result.followers }});
          localStorage.setItem("user", JSON.stringify(result));
          setProfile((prevState) => {
              return {
                  ...prevState,
                  user: {
                      ...prevState.user,
                      followers: [...prevState.user.followers, result._id]
                  }
              }
          })
      }).catch(err => console.log(err));
  }

  const unfollowUser = () => {
      fetch("/unfollow",{
          method: "put",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
              unfollowId: userId
          })
      }).then(res => res.json())
      .then(result => {
          dispatch({type: "UPDATE", payload: { following: result.following, followers: result.followers }});
          localStorage.setItem("user", JSON.stringify(result));
          setProfile((prevState) => {
              return {
                  ...prevState,
                  user: {
                      ...prevState.user,
                      followers: [...prevState.user.followers.filter(e => e !== result._id)]
                  }
              }
          })
      }).catch(err => console.log(err));
  }

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
                <h6> {userProfile.user.followers.length} followers</h6>
                <h6> {userProfile.user.following.length} following</h6>
              </div>
              {
                userProfile.user.followers.includes(state._id) ?
                <button className="btn" onClick={unfollowUser}> Unfollow </button>
                : <button className="btn" onClick={followUser}> follow </button>
              }
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
          <h2>loading...</h2>
        </center>
      )}
    </>
  );
}

export default UserProfile;
