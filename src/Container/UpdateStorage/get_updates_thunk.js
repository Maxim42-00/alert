import {host} from "../../host";


function get_updates_thunk(online, display, users_ids)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("online", online);
        form_data.append("users_ids", JSON.stringify(users_ids));

        fetch(host + "/alert/php/get_updates.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
console.log("update_data: ", data);
                if(data.status === "ok")
                {
                    dispatch({type: "USER_ID_TO_ONLINE", user_id_to_online: data.user_id_to_online});

                    let updates_for_menu = {};
                    for(let key in data.updates)
                    {
                        updates_for_menu[key] = data.updates[key];
                    }
                    dispatch({type: "UPDATES_FOR_MENU", updates_for_menu: updates_for_menu});
                }
            });
    }
}

export default get_updates_thunk;