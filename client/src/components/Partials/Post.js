import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Post({ props }) {
  const {
    item,
    likePost,
    unlikePost,
    makeComment,
    deleteComment,
    deletePost,
    state
  } = props;

  const [comment, setComment] = useState('');

  return (
    <div className="card home-card">
      <h5>
        <Link
          to={
            item.postedBy._id !== state._id
              ? `/profile/${item.postedBy._id}`
              : `/profile`
          }
        >
          {item.postedBy.name}
        </Link>
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
        <img src={item.photo} alt={item.title} />
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
                  onClick={() =>
                    deleteComment(record._id, record.text, item._id)
                  }
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
            setComment('');
          }}
        >
          <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="add a comment..." />
        </form>
      </div>
    </div>
  );
}

export default Post;
