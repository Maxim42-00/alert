import React from "react";
import Waiting from "../Waiting/Waiting";
import "./Private.css";
import Dialog from "../Dialog/Dialog";

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
        this.props.load_private_data();
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === false)
        {
            this.redirect_to_login();
        }
    }
    render()
    {
        return (
            <div className="Private">
                {this.props.waiting ? <Waiting /> : ""}
                <div className="private_data">
                    <div>
                        <span className="private_field"> {this.props.name} </span>
                        <span className="private_field"> {this.props.surname} </span>
                    </div>
                    <div className="private_img_div">
                    </div>
                </div>
                <Dialog params={{type: "posts", user_id: this.props.user_id}} />
            </div>
        );
    }
};

export default Private;