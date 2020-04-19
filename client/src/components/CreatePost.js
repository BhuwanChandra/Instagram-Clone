import React from "react";

function CreatePost() {
  return (
    <div className="card input-field"
    style={{
        margin: "30px auto",
        maxWidth: "550px",
        padding: "20px",
        textAlign: "center"
    }}
    >
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
              <div className="btn #42a5f5 blue darken-1">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn #42a5f5 blue darken-1" type="submit" name="action">
          Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
