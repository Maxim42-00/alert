import NewMessage from "./NewMessage";
import {connect} from "react-redux";
import load_messages_thunk from "./load_messages_thunk";

function mapStateToProps(state)
{
    return {
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params, input)=>dispatch(load_messages_thunk(params, input))
    };
}

const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessage);

export default NewMessageContainer;