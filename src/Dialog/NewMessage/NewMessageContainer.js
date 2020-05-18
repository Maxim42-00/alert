import NewMessage from "./NewMessage";
import {connect} from "react-redux";
import load_messages_thunk from "./load_messages_thunk";

function mapStateToProps(state)
{
    return {
        msg_for_recall: state.new_message.msg_for_recall
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params, input, msg_for_recall)=>dispatch(load_messages_thunk(params, input, msg_for_recall)),
        del_msg_for_recall: ()=>dispatch({type: "DEL_MSG_FOR_RECALL"})
    };
}

const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessage);

export default NewMessageContainer;