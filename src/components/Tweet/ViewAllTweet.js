import React, { useState } from "react";
import swal from "sweetalert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';

const ViewAllTweet = (props) => {
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  var [tweets, setTweets] = useState([]);

  let url = "https://tweetbackend.azurewebsites.net/Tweets/";
  if (props.name === "All") {
    url = url + "All";
  } else if (props.name === "Own") {
    url = url + sessionStorage.getItem("email");
  } else {
    url = url + props.name;
  }

  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then((result) => result.json())
    .then((data) => setTweets(data));

  var likeTweet = (id) => {
    fetch(
      "https://tweetbackend.azurewebsites.net/Tweets/" +
        sessionStorage.getItem("email") +
        "/Like/" +
        id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  };

  var deleteTweet = (id) => {
    swal({
      title: "Are you sure?",
      buttons: true,
      dangerMode: true,
      className: "swalCSS",
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          "https://tweetbackend.azurewebsites.net/Tweets/" +
            sessionStorage.getItem("email") +
            "/delete/" +
            id,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json, text/plain, */*",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
      } else {
      }
    });
  };
  return (
    <div>
      <Typography variant="h4" color="White" style={{marginBottom:"5pt"}}>
        {props.name === "All" ? (
          <div>Latest Tweets</div>
        ) : props.name === "Own" ? (
          <div>Your Tweets</div>
        ) : (
          <div>Tweets from {props.fullName}</div>
        )}
      </Typography>
      {tweets.reverse().map((t) => (
        <React.Fragment key={t.tweetId}>
          <Card style={{ marginBottom: "10pt" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red" }}>
                    {t.creatorId.split("@")[0][0].toUpperCase()}
                  </Avatar>
                }
                title={t.creatorId.split("@")[0]}
                subheader={new Date(t.createTime).toLocaleDateString(
                  "en-us",
                  dateFormat
                )}
                style= {{backgroundColor:"white"}}
              />
              
              <CardContent >
              <Typography variant="body2">
                {t.content}
                <br />
                <br />
                {t.tags}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {props.name === "Own" ? (
                <Button
                variant="contained"
                color="error"
                style={{position:"relative"}}
                  onClick={() => deleteTweet(t.tweetId)}
                >
                  Delete
                </Button>
              ) : (
                <div>
                  <IconButton
                    onClick={() => {
                      likeTweet(t.tweetId);
                    }}
                  >
                    <FavoriteIcon />
                    {t.likes.length}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      props.comment("Comment");
                      props.showtweet(t);
                    }}
                  >
                    <ForumOutlinedIcon />
                  </IconButton>
                </div>
              )}
            </CardActions>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ViewAllTweet;
