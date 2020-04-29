import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import Loading from "./Partials/Loading";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState([]);
  const { userId } = useParams();

  const fetchUser = () => {
    setProfile([]);
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
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const followUser = () => {
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
        setProfile(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id]
            }
          };
        });
      })
      .catch(err => console.log(err));
  };

  const unfollowUser = () => {
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
        setProfile(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [
                ...prevState.user.followers.filter(e => e !== result._id)
              ]
            }
          };
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {userProfile.user && userProfile.posts ? (
        <div className="profile-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "18px 0px"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                className="profile-image"
                src={userProfile.user.pic}
                alt={userProfile.user.name}
              />
              {userProfile.user.followers.includes(state._id) ? (
                <button
                  className="btn btn-small #42a5f5 blue darken-1 p-btn"
                  onClick={unfollowUser}
                >
                  {" "}
                  Unfollow{" "}
                </button>
              ) : (
                <button
                  className="btn btn-small #42a5f5 blue darken-1 p-btn"
                  onClick={followUser}
                >
                  {" "}
                  follow{" "}
                </button>
              )}
            </div>
            <div className="info-sec">
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "108%"
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6> {userProfile.user.followers.length} followers</h6>
                <h6> {userProfile.user.following.length} following</h6>
              </div>
            </div>
          </div>
          <div className="posts-sec-head">
            <i className="material-icons">apps</i>
            <span>POSTS</span>
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
        <Loading />
      )}
    </>
  );
}

export default UserProfile;
