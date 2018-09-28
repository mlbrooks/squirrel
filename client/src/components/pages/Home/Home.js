import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import API from "../../../utils/API";
import PlaylistList from "../Playlist/PlaylistList";
import PlaylistListItem from "../Playlist/PlaylistListItem";
import "./home.css";
import RecentlySaved from "../../partials/RecentlySaved";
import Header from "../../partials/Header";
import NewPlaylist from "../NewPlaylist/";



class Home extends Component {
  state = {
    loggedIn: true,
    userId: null,
    playlists: []
  };

  componentDidMount = () => {
    this.getUser();
    this.getPlaylists();
    this.setCookie();
    console.log("console did mount");
  };

  getUser = () => {
    API.getUserStatus()
      .then(res => {
        console.log("getUser: ", res);
        this.setState({
          loggedIn: res.data.loggedIn,
          userId: res.data.userId
        });
      })
      .catch(err => console.log(err));
  };

  getPlaylists = () => {
    API.getPlaylists()
    .then(res => {
      console.log("get playlists: ", res.data);
      this.setState({
        playlists: res.data
      });
      console.log(this.state.playlists)
    })
    .catch(err => console.log(err));
  };



  setCookie = () => {
    API.setCookie()
      .then(res => {
        console.log("userID: ", res.data.userId);
  
        // document.cookie = ({'userId': res.userId,  maxAge: 2592000000});  // Expires in one month    
        // res.json();
        localStorage.setItem('squirrelId', res.data.userId);
    
        // this.setState({
        //   loggedIn: res.data.loggedIn,
        //   userId: res.data.userId
        // });
      })
      .catch(err => console.log(err));
  };


  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="home-container">
        < Header />
        <div className="home-content-container">
          <h1>Hello user!</h1>
          <h2>Here's everything you've squirreled away so far.</h2>

          <Link to="/video/1">
            <p className="sql-btn">Video Player</p>
          </Link>

          <Link to="/playlist/play/1">
            <p className="sql-btn">Playlist Player</p>
          </Link>

          <div className="recents">
            <h2>Recents</h2>
            {/* <RecentlySaved />  would go here*/}
          </div>   

          <div className="playlists-menu">
            <h2>Playlists</h2>
            <PlaylistList>
              {this.state.playlists.map(playlist => {
                  return (
                // < Link to={"/playlists/"+ playlist._id}>
                  <PlaylistListItem
                      key={playlist.userId}
                      id={playlist._id}
                      description={playlist.description}
                      title={playlist.title}
                      videos={playlist.videos}
                  />
                // </ Link>
                  );
              })}
              < PlaylistListItem title="Create New" id="new"/>
            </PlaylistList>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;
