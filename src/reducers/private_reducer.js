const default_state = {
    name: "",
    surname: "",
    img: "",
    waiting: false,
    found: "",
    cur_user_id: ""
};

function private_reducer(state = default_state, action)
{
    let new_state = {...state};
    if(action.type === "PRIVATE_WAIT")
    {
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "PRIVATE_DATA_RECEIVED")
    {
        new_state.waiting = false;
        if(action.status === "ok")
        {
            new_state.cur_user_id = action.id;
            if( (new_state.found=action.found) === "found")
            {
                new_state.name = action.data.name;
                new_state.surname = action.data.surname;
                new_state.img = action.data.img;
            }
        }
        return new_state;
    }
    return state;
}

export default private_reducer;