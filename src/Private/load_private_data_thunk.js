import {host} from "../host";

function load_private_data_thunk(dispatch)
{
    dispatch({type: "PRIVATE_WAIT"});
    fetch(host + "/alert/php/private.php", {credentials: "include"})
        .then(data=>data.json())
        .then(data=>
        {
            dispatch({type: "SET_AUTH", auth: data.status});
            dispatch({type: "PRIVATE_DATA_RECEIVED", status: data.status, data: data.data});
        });
}

export default load_private_data_thunk;