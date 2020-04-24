import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css';

function EditProfile() {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(undefined);
    const [url, setUrl] = useState(undefined);

    useEffect(() => {
      if(state){
        setName(state.name);
        setEmail(state.email);
      }
    },[state])
    useEffect(() => {
      if(url){
        uploadFields();
      }
    },[url])

  const uploadFields = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: "#e53935 red darken-1" });
      return;
    }
    fetch("/editprofile", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: state._id,
        name,
        email,
        pic: url ? url : state.pic
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error)
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        else {
          dispatch({
            type: "UPDATEPROFILE",
            payload: { name: data.name, email: data.email, pic: data.pic }
          });
          localStorage.setItem("user", JSON.stringify(data));
          M.toast({
            html: "Updated Successfully",
            classes: "#43a047 green darken-1"
          });
          history.push("/profile");
        }
      })
      .catch(err => console.log(err));
  };

  const PostData = () => {
    if(image) uploadPic();
    else uploadFields();
  };

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "bbs779");
    fetch("https://api.cloudinary.com/v1_1/bbs779/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(() => M.toast({ html: "Pic upload failed", classes: "#e53935 red darken-1" }));
  };

  return (
    <>
        { state ?
        <div className="my-card">
        <div className="card auth-card input-field">
          <h2 className="brand-logo">Edit Profile</h2>
          <input
            value={state ? name : ''}
            type="text"
            placeholder="name"
            onChange={e => setName(e.target.value)}
          />
          <input
            value={state ? email : ''}
            type="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
          <div className="card-image" style={{marginTop: "15px"}}>
              <img src={image ? URL.createObjectURL(image): state.pic} alt="image preview" />
          </div>
          <div className="file-field input-field">
            <div className="btn #42a5f5 blue darken-1">
              <span>Upload pic</span>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="upload pic to change..."
              />
            </div>
          </div>
          <button
            className="btn #42a5f5 blue darken-1"
            onClick={PostData}
          >
            Save
          </button>
        </div>
        </div>
        : (
          <center>
            <h2>loading...</h2>
          </center>
        )
      }
        </>
  );
}

export default EditProfile;
