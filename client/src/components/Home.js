import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

function Home() {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        setData(res.posts);
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
      .then(res =>{
        console.log(res) 
        return res.json()})
      .then(result => {
        console.log(result);
        const newData = data.filter(item => item._id !== result._id);
        setData(newData);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      {data.map(item => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              {item.postedBy.name}
              {item.postedBy._id === state._id ? (
                <i
                  onClick={() => deletePost(item._id)}
                  style={{ color: "#e53935", float: "right" }}
                  className="material-icons"
                >
                  delete
                </i>
              ) : (
                ""
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              {item.likes.includes(state._id) ? (
                <i
                  onClick={() => unlikePost(item._id)}
                  style={{ color: "red" }}
                  className="small material-icons"
                >
                  favorite
                </i>
              ) : (
                <i
                  onClick={() => likePost(item._id)}
                  className="small material-icons"
                >
                  favorite_border
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map(record => {
                return (
                  <h6 key={record._id}>
                    <strong>{record.postedBy.name + " "}</strong> 
                    {record.text}
                    {record.postedBy._id === state._id ? (
                      <i
                        onClick={() => deleteComment(record._id, record.text, item._id)}
                        style={{ color: "#e53935", float: "right" }}
                        className="material-icons"
                      >
                        delete
                      </i>
                    ) : (
                        ""
                      )}
                  </h6>
                );
              })}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
