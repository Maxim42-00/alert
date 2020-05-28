const default_state = {
    name: "",
    surname: "",
    img: "",
    waiting: false,
    found: "",
    cur_user_id: "",

    is_show_contacts_wnd: false,
    attach_type: ""
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
    if(action.type === "SHOW_CONTACTS_WND")
    {
        new_state.is_show_contacts_wnd = action.show;
        new_state.attach_type = action.attach_type;
        return new_state;
    }
    return state;
}

export default private_reducer;