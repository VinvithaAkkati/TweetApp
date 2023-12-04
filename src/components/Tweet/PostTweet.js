import React, { useState } from "react";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import { submitTweet } from "../../api/tweet";
import { TextareaAutosize } from "@mui/material";

const PostTweet = (props) => {
  const [content, setTweet] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await submitTweet(content, tags)) {
      swal("Tweet posted", "", "success", {
        button: false,
        timer: 1000,
      });
      setTweet("");
      setTags("");
      props.option("All")
      return;
    }

    swal(
      "Oops..",
      "Error due to one of the following:\n*Tweet length is more than 144char\n*Tag length is more than 50 char",
      "warning")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20pt" }}>
      <div className="row-sm-6" style={{ position: "relative" }}>
        <TextareaAutosize
          label="Tweet"
          placeholder="What's happening?..."
          onChange={(e) => setTweet(e.target.value)}
          minRows={4}
          required
          style={{ backgroundColor: "white", borderRadius: 8 }}
        />
      </div>
      <div className="crow-sm-2">
        <TextField
          id="outlined-basic"
          label="Tags"
          variant="filled"
          value={tags}
          size="small"
          onChange={(e) => setTags(e.target.value)}
          style={{ backgroundColor: "white", borderRadius: 8 }}
        />
        <button
          className="btn btn-primary shadow-none"
          variant="contained"
          color="primary"
          style={{ float: "right", alignItems: "center" }}
        >
          Post Tweet
        </button>
      </div>
    </form>
  );
};

export default React.memo(PostTweet);
