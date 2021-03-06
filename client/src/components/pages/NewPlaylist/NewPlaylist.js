import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../../utils/API";
import { Input } from "../../partials/Form/";
import Header from "../../partials/Header";
import { SaveIcon } from "../../partials/Controls";
import { GridContainer, VideoSelectTile } from "../../partials/Tiles";
import Loading from "../../partials/Loading";
import "./NewPlaylist.css";

class NewPlaylist extends Component {
  state = {
      title: "",
      userId: "",
      loggedIn: null,
      videosLoaded: false,
      redirect: false,
      video: []
  };

  componentDidMount = () => {
      this.getUser();
  }

  getUser = () => {
    API.getUserStatus()
    .then(res => {
      console.log("getUser: ", res);
      this.setState({
        loggedIn: res.data.loggedIn,
        userId: res.data.userId
      });
      this.getUserData(res.data.userId);
    })
    .catch(err => console.log(err));
  }

  getUserData = (userId) => {
    API.getUserData(userId)
      .then(res => {
        console.log(res);
        this.setState({
          video: res.data.allVideos,
          videosLoaded: true
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  selectVideo = (index) => {
    let temp = [...this.state["video"]];
    temp[index].selected = !temp[index].selected;
    this.setState({
      ["video"]: temp
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      let selectedVideos = [];

      this.state.video.forEach(video => {
        if (video.selected) {
          selectedVideos.push(video._id);
        }
      });

      const storePlaylistObj = {
        userId: this.state.userId,
        playlist: {
          userId: [this.state.userId],
          title: this.state.title,
          videos: selectedVideos
        }
      }

      console.log(storePlaylistObj);

      API.createPlaylist(storePlaylistObj).then(res => {
        console.log(res);
        this.setState({ redirect: true });
      });
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/home" />
    }

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    } else if (this.state.loggedIn === null) {
      return <Loading />;
    }
    if (this.state.loggedIn === true) {

      return (
          <div className="new-playlist-page">
              <Header />
              <div className="page-container new-playlist-container container">
                  <h1 className="page-title center-title">Create A New Playlist</h1>   
                  
                  {this.state.title ? <SaveIcon onClick={this.handleFormSubmit} /> : "" }
                      
                  <div className="add-title-container">
                      <Input
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      name="title"
                      placeholder="Title"
                      />
                  </div>

                  <h2 className="section-title center-title">Add Videos From Your Collection:</h2>

                  <GridContainer>
                    {this.state.videosLoaded ? 
                      this.state.video.map((video, index) => (
                        <VideoSelectTile
                          imageUrl={video.imageUrl}
                          title={video.title}
                          key={video._id}
                          index={index}
                          _id={video._id}
                          selected={video.selected}
                          selectVideo={this.selectVideo}
                        />
                      )) : ""
                    }
                  </GridContainer>
                  
              </div>
          </div>
      )
    }
  }
}

export default NewPlaylist;
