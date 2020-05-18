const default_state = {
    msg_for_recall: ""
};


function new_message_reducer(state = default_state, action)
{
    let new_state = {...state};
    if(action.type === "ADD_TO_RECALL")
    {
        new_state.msg_for_recall = {type: action.msg_type, id: action.msg_id};
        return new_state;
    }
    if(action.type === "DEL_MSG_FOR_RECALL")
    {
        new_state.msg_for_recall = "";
        return new_state;
    }
    return state;
}

export default new_message_reducer;