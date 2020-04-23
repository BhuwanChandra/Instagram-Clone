import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import Post from "./Partials/Post";

function Home() {
  const { state } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/getsubpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(res => {
        setData(res.posts);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const likePost = id => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  const unlikePost = id => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId,
        text
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  const deleteComment = (commentId, text, postId) => {
    fetch("/deletecomment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId,
        commentId,
        text
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  const deletePost = postId => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(result => {
        console.log(result);
        const newData = data.filter(item => item._id !== result._id);
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {!loading ? (
        <div className="home">
          {data.map(item => (
            <Post
              key={item._id}
              props={{
                item,
                likePost,
                unlikePost,
                makeComment,
                deleteComment,
                deletePost,
                state
              }}
            />
          ))}
        </div>
      ) : (
        <center>
          <h2>loading...</h2>
        </center>
      )}
    </>
  );
}

export default Home;
