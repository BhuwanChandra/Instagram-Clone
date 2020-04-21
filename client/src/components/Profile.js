import React, { useEffect, useState, useContext } from "react";
import '../App.css';
import { UserContext } from '../App';

function Profile() {
const { state, dispatch } = useContext(UserContext);  
const [mypics, setPics] = useState([]);
  useEffect(() => {
    fetch("/mypost", {
        headers:{
            Authorization: "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res => res.json())
    .then(res => {
        setPics(res.mypost);
    }).catch(err => console.log(err));
  },[]);

  return (
    <div style={{maxWidth: '600px', margin: '0px auto'}}>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: '1px solid grey'
        }}>
            <div>
                <img 
                style={{ width: "160px", height: "160px", borderRadius: "50%" }}
                src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
            </div>
            <div>
                <h4>{state ? state.name : ''}</h4>
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    width: '108%'
                    
                }}>
                    <h6>40 posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
            </div>
        </div>
        <div className="gallery">
        {
            mypics.map(item => <div key={item._id} className="img-item">
                <img className="gallery-item" src={item.photo} alt={item.title}/>
            </div>
            )
        }
            <div className="img-item">
                <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            </div>
        </div>
    </div>
  );
}

export default Profile;
