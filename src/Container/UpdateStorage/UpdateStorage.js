import React from "react";

class UpdateStorage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.get_updates = this.get_updates.bind(this);
    }
    get_updates(online)
    {
        if(online === "offline")
            this.props.get_updates("offline");
        else
        {
            let display = {};
            display.comments = this.props.comments;
            let users_ids = [];
            if(this.props.chat_users_ids.length)
                users_ids = this.props.chat_users_ids;
            if(this.props.users_ids.length)
                users_ids = this.props.users_ids;
            if(this.props.private_cur_user_id)
                if(users_ids.indexOf(this.props.private_cur_user_id) === -1)
                    users_ids.push(this.props.private_cur_user_id);
            this.props.get_updates("online", display, users_ids);
        }
    }
    componentDidMount()
    {
        this.interval = setInterval(this.get_updates, 15000, "online");
        this.get_updates("online");
        window.addEventListener("beforeunload", ()=>this.get_updates("offline"));
    }
    componentDidUpdate()
    {
        this.get_updates("online");
    }
    componentWillUnmount()
    {
        window.removeEventListener("beforeunload", ()=>this.get_updates("offline"));
        this.get_updates("offline");
        clearInterval(this.interval);
    }
    render()
    {
        return <div></div>;
    }
};

export default UpdateStorage;