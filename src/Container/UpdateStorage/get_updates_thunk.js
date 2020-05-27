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
console.log(data);
                if(data.status === "ok")
                {
                    dispatch({type: "USER_ID_TO_ONLINE", user_id_to_online: data.user_id_to_online});
                    if(data.updates.comments)
                    {
                        let updates_for_menu = [];
                        for(let key in data.updates.comments)
                        {
                            let update_comment_id = data.updates.comments[key];
                            if(display.comments.indexOf(update_comment_id) === -1)
                                    updates_for_menu.push(update_comment_id);
                        }
                        dispatch({type: "UPDATES_FOR_MENU", update: "comments", ids: updates_for_menu});
                    }
                    else
                        dispatch({type: "UPDATES_FOR_MENU", update: "comments", ids: []});
                }
            });
    }
}

export default get_updates_thunk;