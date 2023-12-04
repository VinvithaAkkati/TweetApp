import React, { useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Grid from '@mui/material/Grid';
import Item from "./style";

const Comment = (props) => {
  const [tweet, setTweet] = useState(JSON.parse(props.data));
  const [ReplyMessage, setComment] = useState("");
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  const Replied_userId = sessionStorage.getItem("email");

  fetch(
    "https://tweetbackend.azurewebsites.net/Tweets/" + Replied_userId + "/get/" + tweet.tweetId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }
  )
    .then((result) => result.json())
    .then((data) => setTweet(data));

  const postComment = async (e) => {
    e.preventDefault();
    let cmtObject = { Replied_userId, ReplyMessage };
    await fetch(
      "https://tweetbackend.azurewebsites.net/Tweets/" +
        Replied_userId +
        "/reply/" +
        tweet.tweetId,
      {
        method: "POST",
        body: JSON.stringify(cmtObject),
        headers: {
          "Content-Type": "application/JSON",
          Accept: "application/JSON",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    ).then(setComment(""));
  };

  return (
    <div>
      <Card style={{ marginBottom: "5pt" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }}>
                {tweet.creatorId.split("@")[0][0].toUpperCase()}
              </Avatar>
            }
            title={tweet.creatorId.split("@")[0]}
            subheader={new Date(tweet.createTime).toLocaleDateString(
              "en-us",
              dateFormat
            )}
            style={{ backgroundColor: "white" }}
          />
          <CardContent>
            <Typography variant="body2">
              {tweet.content}
              <br />
              <br />
              {tweet.tags}
            </Typography>
          </CardContent>
          <Grid container spacing={2}>
          <Grid item xs={10}>
          <Item>
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="filled"
            value={ReplyMessage}
            size="large"
            onChange={(e) => setComment(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: 8}}
            fullWidth
          />
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item sx={{textAlign: "center", marginTop:"4pt"}}>
          <IconButton onClick={postComment}>
            <ForumOutlinedIcon />
          </IconButton>
          </Item>
        </Grid>
          </Grid>
          </Card>
          {tweet.replys.reverse().map((t) => (
            <Card>
            <React.Fragment key={t.replied_userId + t.reply_Time}>
            <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "green" }}>
                    {t.replied_userId.split("@")[0][0].toUpperCase()}
                  </Avatar>
                }
                title={t.replied_userId.split("@")[0]}
                subheader={new Date(t.reply_Time).toLocaleDateString(
                  "en-us",
                  dateFormat
                )}
                style= {{backgroundColor:"white"}}
              />
              <CardContent >
              <Typography variant="body2">
                {t.replyMessage}
              </Typography>
              </CardContent>
            </React.Fragment>
            </Card>
          ))}
    </div>
  );
};

export default Comment;
