import React from 'react'

function Home() {
    return (
      <div className="home">
        <div class="card home-card">
          <h5>John</h5>
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="card-content">
            <i className="small material-icons">favorite_border</i>
            <i className="small material-icons">favorite</i>
            <h6>title</h6>
            <p>this is amazing post</p>
            <input type="text" placeholder="add a comment" />
          </div>
        </div>
        <div class="card home-card">
          <h5>John</h5>
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="card-content">
            <i className="small material-icons">favorite_border</i>
            <i className="small material-icons">favorite</i>
            <h6>title</h6>
            <p>this is amazing post</p>
            <input type="text" placeholder="add a comment" />
          </div>
        </div>
      </div>
    );
}

export default Home
