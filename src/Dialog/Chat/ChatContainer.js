import {connect} from "react-redux";
import Chat from "./Chat";
import load_messages_thunk from "../NewMessage/load_messages_thunk";
import React from "react";

function mapStateToProps(params)
{
    return function(state)
    {
        let data;
        if((params.type === "posts") || (params.type === "chat"))
            data = state.chat[params.type];
        if(params.type === "comments")
            data = state.chat[params.type][params.post_id];
        return {
            messages: data
        };
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params)=>dispatch(load_messages_thunk(params)),
        remove_comments: (post_id)=>dispatch({type: "REMOVE_COMMENTS", post_id})
    };
}

function ChatContainer(props)
{
    const ConnectedChatContainer = connect(mapStateToProps(props.params), mapDispatchToProps)(Chat);
    return <ConnectedChatContainer params={props.params} />;
}

export default ChatContainer;