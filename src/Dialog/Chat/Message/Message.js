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

        let del_msg_btn="";
        if(this.props.user_id === this.props.my_id)
            del_msg_btn = <span className="del_msg_btn" onClick={()=>this.props.del_msg(this.props.params, this.props.message_id)}>X</span>;

        return (
            <div className="Message">
                {del_msg_btn}
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