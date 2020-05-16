import React from "react";
import Message from "./Message/Message";
import "./Chat.css";
import timestamp_to_string from "../../functions/timestamp_to_string";

class Chat extends React.Component
{
    scroll_down()
    {
        document.getElementById("Chat").scrollTop = document.getElementById("Chat").scrollHeight - document.getElementById("Chat").clientHeight;
    }
    componentDidMount()
    {
        this.props.load_messages(this.props.params);
   //     this.interval = setInterval(this.props.load_messages, 5000, this.props.params);
    }
    componentDidUpdate()
    {
        if(this.props.params.type === "chat")
        {
            setTimeout(this.scroll_down, 1000);
        }
    }
    componentWillUnmount()
    {
    //    clearInterval(this.interval);
        if(this.props.params.type === "comments")
            this.props.remove_comments(this.props.params.post_id);
    }
    render()
    {
        const style = {};
        if(this.props.params.type === "chat")
        {
            style.overflow = "auto";
        }
        let messages = "";
        if(this.props.messages)
            messages = this.props.messages.map(cur => <Message user={cur.user} date={timestamp_to_string(cur.date*1000)} ip={cur.ip} text={cur.text} files={cur.files} params={this.props.params} message_id = {cur.id} />);
        return (
            <div className="Chat" style={style} id="Chat">
                {messages}
            </div>
        );
    }
};

export default Chat;