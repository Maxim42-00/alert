import React from "react";
import "./UserImg.css";
import {host} from "../host";
import {NavLink} from "react-router-dom";

class UserImg extends React.Component
{
    render()
    {
        let img;
        if(this.props.img)
            img = <img src={this.props.img} style={{padding: "5px"}} width={this.props.img_width} />;
        else
            img = <img src={host + "/alert/php/files/0.jpg"} style={{padding: "5px"}} width={this.props.img_width} />

        let online_label = "";
        if(this.props.online === "online")
            online_label = <div className="online_label"> </div>;

        return (
            <span className="UserImg">
                <NavLink to={"/alert/private/" + this.props.user_id}>
                {img}
                </NavLink>
                {online_label}
            </span>
        );
    }
};

export default UserImg;