const default_state = {
    comments: [],
    user_id_to_online: [],
    followers: []
};

function app_reducer(state = default_state, action)
{
    if(action.type === "UPDATES_FOR_MENU")
    {
        let new_state = state;
        new_state[action.update] = action.ids;
        return new_state;
    }
    if(action.type === "USER_ID_TO_ONLINE")
    {
        let new_state = state;
        new_state.user_id_to_online = action.user_id_to_online;
        return new_state;
    }
    return state;
}

export default app_reducer;