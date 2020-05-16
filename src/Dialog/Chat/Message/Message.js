import React from "react";
import "./Message.css";
import Media from "./Media";
import Dialog from "../../Dialog";

class Message extends React.Component
{
    render()
    {
        let files;
        if(this.props.files)
            files = this.props.files.map(file => <Media type={file.type} url={file.url} m_type={this.props.params.type} />);

        return (
            <div className="Message">
                <div>{this.props.user}</div>
                <div>{this.props.date}</div>
                <div>{this.props.ip}</div>
                <div>{this.props.text}</div>
                <div>
                    {files}
                </div>
                { (this.props.params.type === "posts") ? <Dialog params={{type: "comments", post_id: this.props.message_id}} /> : "" }
            </div>
        );
    }
};

export default Message;