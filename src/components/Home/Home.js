import React, { useState } from "react";
import Head from "../Header/Header";
import PostTweet from "../Tweet/PostTweet";
import ViewUser from "../User/Viewusers";
import ViewAllTweet from "../Tweet/ViewAllTweet";
import Comment from "../Tweet/Comment";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Home = () => {
  const [option, setOption] = useState("All");
  const [tweet, setTweet] = useState(null);
  const [user, setUser] = useState(null);
  let display = (
    <ViewAllTweet name="All" comment={setOption} showtweet={setTweet} />
  );
  if (option === "All") {
    display = (
      <ViewAllTweet name="All" comment={setOption} showtweet={setTweet} />
    );
  } else if (option === "Own") {
    display = (
      <ViewAllTweet name="Own" comment={setOption} showtweet={setTweet} />
    );
  } else if (option === "Comment") {
    display = <Comment comment={setOption} data={JSON.stringify(tweet)} />;
  } else if (option === "Users") {
    display = <ViewUser comment={setOption} profile={setUser} />;
  } else {
    display =
      sessionStorage.getItem("email") === JSON.parse(user).email ? (
        setOption("Own")
      ) :(
        <ViewAllTweet
          name={JSON.parse(user).email}
          fullName={JSON.parse(user).firstName+ " "+JSON.parse(user).lastName}
          comment={setOption}
          showtweet={setTweet}
        />
      );
  }

  return (
    <div>
      <div className="row">
        <Head />

        <form className="col-sm-2" style={{ marginLeft: "10pt" }}>
          <ToggleButtonGroup
            orientation="vertical"
            value="UIG"
            exclusive
            sx={{ backgroundColor: "white" }}
          >
            <ToggleButton value="list" aria-label="list">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                value="All"
                onChange={(e) => setOption(e.target.value)}
                checked={option === "All"}
              />
              <label htmlFor="option1">View All Tweets</label>
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                value="Own"
                onChange={(e) => setOption(e.target.value)}
                checked={option === "Own"}
              />
              <label htmlFor="option2">View Own Tweets</label>
            </ToggleButton>
            <ToggleButton value="quilt" aria-label="quilt">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                value="Users"
                onChange={(e) => setOption(e.target.value)}
                checked={option === "Users"}
              />
              <label htmlFor="option3">View All Users</label>
            </ToggleButton>
          </ToggleButtonGroup>
        </form>
        <div className="col-sm-6">
          <PostTweet option={setOption}/>
          {display}
        </div>

        {
          <div className="col-sm-2 text-white">
            <AccountCircleIcon /> {sessionStorage.getItem("name")}
            <br />
            <EmailIcon /> {sessionStorage.getItem("email")}
            <br />
            <LocalPhoneIcon /> {sessionStorage.getItem("phone")}
            <br />
            <KeyIcon />{" "}
            <Link to="/reset-password" style={{ textDecoration: "none" }}>
              Change Password
            </Link>
          </div>
        }
      </div>
    </div>
  );
};
export default Home;
