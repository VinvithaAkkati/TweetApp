const BASE_URL = "https://tweetbackend.azurewebsites.net/Tweets/";

const viewAllTweet = async () => {
  let response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  let tweets = await response.json();
  return tweets;
};

const submitTweet = async (content,tags) => {
  let tweet = {
    creatorId: sessionStorage.getItem("email"),
    token: sessionStorage.getItem("token"),
    content: content,
    tags: tags,
  };
  let response = await fetch(
    BASE_URL + tweet.creatorId + "/Add",
    {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        Authorization: "Bearer " + tweet.token,
      },
    }
  );
  if (response.ok) return true;
  return false;
};

const getTweet = async (tweetId) => {
  let response = await fetch(
    BASE_URL + sessionStorage.getItem("email") + "/get/" + tweetId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }
  );
  let result = await response.json();
  return result;
};

const postComment = async (tweetJson, reply) => {
  let tweet = await getTweet(tweetJson.tweetId);
  let comment = {
    Replied_userId: sessionStorage.getItem("email"),
    ReplyMessage: reply,
  };
  let response = await fetch(
    BASE_URL + comment.Replied_userId + "/reply/" + tweet.tweetId,
    {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};

export { viewAllTweet, submitTweet, postComment, getTweet };
