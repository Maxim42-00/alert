import {host} from "../host";

const default_state = {
    is_auth: "",
    waiting: false
};

function auth_reducer(state = default_state, action)
{
    let new_state = {...state};
    if(action.type === "AUTH_WAIT")
    {
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "AUTH_DATA_RECEIVED")
    {
        new_state.waiting = false;
        if(action.status === "ok")
        {
            new_state.is_auth = true;
        }
        return new_state;
    }
    if(action.type === "SET_AUTH")
    {
        if(action.auth === "ok")
            new_state.is_auth = true;
        else
            new_state.is_auth = false;
        return new_state;
    }
    if(action.type === "QUIT")
    {
        fetch(host + "/alert/php/quit.php", {credentials: "include"});
        new_state.is_auth = false;
        return new_state;
    }
    return state;
}

export default auth_reducer;