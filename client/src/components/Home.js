import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../App";
import Post from "./Partials/Post";
import Loading from "./Partials/Loading";

function Home() {
  const { state } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = false;
    fetch("/getsubpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(res => {
        if(!isMounted){
          setData(res.posts);
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
      return () => {
        isMounted = true;
      }
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
        state.following.length === 0 ?
          <div style={{textAlign: 'center'}} className="card no-post">
            <h4>You haven't followed anyone yet.</h4>
            <h6 style={{paddingBottom: "10px"}}>you can explore other users post.</h6>
            <Link to="/explore" className="btn #42a5f5 blue darken-1">Explore</Link>
          </div> :
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
      ) : <Loading />
      }
    </>
  );
}

export default Home;
