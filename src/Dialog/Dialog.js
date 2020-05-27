import React from "react";
import "./Dialog.css";
import ChatContainer from "./Chat/ChatContainer";
import NewMessageContainer from "./NewMessage/NewMessageContainer";

class Dialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            show_comments: false
        };

        this.show_comments = this.show_comments.bind(this);
    }
    show_comments()
    {
        this.setState({show_comments: !this.state.show_comments});
    }
    render()
    {
        const style = {};
        if(this.props.params.type === "chat")
        {
            style.height = "calc(100% - 25px)";
        }
        if(this.props.params.type === "comments")
        {
            style.width = "80%";
        }
        let content;
        if(this.props.params.type === "posts")
        {
            content = 
            [
                (this.props.params.user_id === this.props.my_id ? <NewMessageContainer params={this.props.params} /> : ""),
                <ChatContainer params={this.props.params} />
            ];
        }
        else
        {
            content = 
            [
                <ChatContainer params={this.props.params} />,
                <NewMessageContainer params={this.props.params} />
            ];
        }
        let show_comments_btn = "";
        if(this.props.params.type === "comments")
        {
            let show_comments_btn_text;
            if(!this.state.show_comments)
            {
                show_comments_btn_text = "Показать комментарии";
                content = "";
            }
            if(this.state.show_comments) 
            {
                show_comments_btn_text = "Скрыть комментарии";
            }
            show_comments_btn = <div onClick={this.show_comments}> {show_comments_btn_text} </div>
        }
        return (
            <div className="Dialog" style={style}>
                {show_comments_btn}
                {content}
            </div>
        );
    }
};

export default Dialog;