import React from "react";
import "./UserImg.css";
import {host} from "../host";

class UserImg extends React.Component
{
    render()
    {
        let img;
        if(this.props.img)
            img = <img src={this.props.img} style={{padding: "5px"}} width="50" />;
        else
            img = <img src={host + "/alert/php/files/0.jpg"} style={{padding: "5px"}} width="50" />

        let online_label = "";
        if(this.props.online === "online")
            online_label = <div className="online_label"> </div>;

        return (
            <span className="UserImg">
                {img}
                {online_label}
            </span>
        );
    }
};

export default UserImg;