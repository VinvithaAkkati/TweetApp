import React, { useState } from "react"
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CardHeader from '@mui/material/CardHeader';
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ViewUser = (props) => {
    const [users, setUsers] = useState([])
    let url = "https://tweetbackend.azurewebsites.net/Tweets/Users/All"

    fetch(url, {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }
    }).then(result => result.json()).then(data => setUsers(data))

    const userProfile = (profile) =>{
        props.comment("viewProfile")
        props.profile(profile)
    }

    return (<div>
        <Typography variant="h4" color="White" style={{marginBottom:"5pt"}}>
        Tweet Users
        </Typography>
        {
            users.map(
                (u) => (<React.Fragment key={u.email}>
                    <Card style={{ marginBottom: "10pt" }}>
                        <CardHeader avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {u.firstName[0].toUpperCase()}
                  </Avatar>
                }
                title={u.firstName+ " " + u.lastName}
                style= {{backgroundColor:"white"}}
                onClick={()=>userProfile(JSON.stringify(u))}
              />
                <CardContent >
                    <EmailIcon/>{u.email}&nbsp;
                    <LocalPhoneIcon/>{u.contactNumber}
                </CardContent>
                    </Card>
                </React.Fragment>)
            )
        }
    </div>)
}

export default ViewUser
