const default_state = {
    posts: [],
    comments: {},
    chat: []
};

function chat_reducer(state = default_state, action)
{
    let new_state = {...state};
    if(action.type === "LOAD_MESSAGES")
    {
        if(action.params.type === "posts")
        {
            if(state.posts.length === action.messages.length)
                return state;
            new_state.posts = [...action.messages];
        }
        if(action.params.type === "comments")
        {
            if(state.comments[action.params.post_id])
            {
                if(state.comments[action.params.post_id].length === action.messages.length)
                    return state;
            }
            new_state.comments[action.params.post_id] = [...action.messages];
        }
    }
    if(action.type === "REMOVE_DIALOG")
    {
        if(action.param_type === "comments")
            delete(new_state.comments[action.post_id]);
        else
            new_state[action.param_type] = [];
    }
    return new_state;
}

export default chat_reducer;