const default_state = {
    posts: [],
    comments: {},
    chat: [],

    comments_displayed: [],
    users_ids: []
};

function get_comments_keys(comments)
{
    let keys = [];
    for(let k in comments)
        keys.push(k);
    return keys;
}

function add_user_ids_from_messages(users_ids, messages)
{
    for(let message of messages)
    {
        if(users_ids.indexOf(message.user_id) === -1)
            users_ids.push(message.user_id);
    }
}

function get_users_ids_from_messages(new_state)
{
    let users_ids = [];
    add_user_ids_from_messages(users_ids, new_state.posts);
    for(let key in new_state.comments)
    {
        let comments = new_state.comments[key];
        add_user_ids_from_messages(users_ids, comments);
    }
    return users_ids;
}

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
        new_state.comments_displayed = get_comments_keys(new_state.comments);

        new_state.users_ids = get_users_ids_from_messages(new_state);
    }
    if(action.type === "REMOVE_DIALOG")
    {
        if(action.param_type === "comments")
        {
            delete(new_state.comments[action.post_id]);
            new_state.comments_displayed = get_comments_keys(new_state.comments);
        }
        else
            new_state[action.param_type] = [];

        new_state.users_ids = get_users_ids_from_messages(new_state);
    }
    return new_state;
}

export default chat_reducer;