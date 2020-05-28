import React from "react";
import Waiting from "../Waiting/Waiting";
import "./Private.css";
import Dialog from "../Dialog/Dialog";
import {host} from "../host";
import MyContactsContainer from "./MyContacts/MyContactsContainer";

class Private extends React.Component
{
    constructor(props)
    {
        super(props);
        this.redirect_to_login = this.redirect_to_login.bind(this);
    }
    redirect_to_login()
    {
        this.props.history.push("/alert/login");
    }
    componentDidMount()
    {
        this.props.load_private_data(this.props.match.params.user_id);
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === false)
        {
            this.redirect_to_login();
        }
        if(this.props.cur_user_id !== this.props.match.params.user_id)
            this.props.load_private_data(this.props.match.params.user_id);
    }
    render()
    {
        if(this.props.found === "not_found")
        {
            return (
                <div>
                    <h1> Not Found </h1>
                </div>
            );
        }

        let img;
        if(this.props.img)
            img = <img src={this.props.img} style={{padding: "5px"}} width="200" />;
        else
            img = <img src={host + "/alert/php/files/0.jpg"} style={{padding: "5px"}} width="200" />

        return (
            <div className="Private">
                {this.props.waiting ? <Waiting /> : ""}
                <div className="private_data">
                    <div>
                        <span className="private_field"> {this.props.name} </span>
                        <span className="private_field"> {this.props.surname} </span>
                    </div>
                    <div>{img}</div>
                    <MyContactsContainer params={{user_id: this.props.match.params.user_id}} />
                </div>
                <Dialog params={{type: "posts", user_id: this.props.match.params.user_id}}  my_id={this.props.my_id} />
            </div>
        );
    }
};

export default Private;