import React from "react";
import '../App.css';

function Profile() {
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
                <h4>John Doe</h4>
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
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            <img className="gallery-item" src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
        </div>
    </div>
  );
}

export default Profile;
