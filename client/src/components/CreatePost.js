import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url)
      fetch("/createpost", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          pic: url
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error)
            M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          else {
            M.toast({
              html: "created post successfully",
              classes: "#43a047 green darken-1"
            });
            history.push("/");
          }
        })
        .catch(err => console.log(err));
  }, [url]);

  const PostDetails = () => {
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
      .catch(err => console.log(err));
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "550px",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <input
        value={title}
        type="text"
        onChange={e => setTitle(e.target.value)}
        placeholder="title"
      />
      <input
        value={body}
        type="text"
        onChange={e => setBody(e.target.value)}
        placeholder="body"
      />
      <div className="file-field input-field">
        <div className="btn #42a5f5 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn #42a5f5 blue darken-1"
        type="submit"
        onClick={PostDetails}
        name="action"
      >
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
