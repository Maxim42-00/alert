import {connect} from "react-redux";
import Chat from "./Chat";
import load_messages_thunk from "../NewMessage/load_messages_thunk";
import React from "react";
import del_msg_thunk from "./del_msg_thunk";

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
            messages: data,
            my_id: state.private.user_id
        };
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params)=>dispatch(load_messages_thunk(params)),
        remove_dialog: (type, post_id=0)=>dispatch({type: "REMOVE_DIALOG", param_type: type, post_id}),
        del_msg: (params, id)=>dispatch(del_msg_thunk(params, id))
    };
}

function ChatContainer(props)
{
    const ConnectedChatContainer = connect(mapStateToProps(props.params), mapDispatchToProps)(Chat);
    return <ConnectedChatContainer params={props.params} />;
}

export default ChatContainer;