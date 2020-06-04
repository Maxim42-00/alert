import {host} from "../../host";
import load_messages_thunk from "../../Dialog/NewMessage/load_messages_thunk";
import load_chats_thunk from "../../Chats/load_chats_thunk";

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
console.log("display: ", display);
                if(data.status === "ok")
                {
                    dispatch({type: "USER_ID_TO_ONLINE", user_id_to_online: data.user_id_to_online});

                    let updates_for_menu = {};
                    for(let key in data.updates)
                    {
                        if(key === "messages")
                        {
                            updates_for_menu.messages = [];
                            for(let chat_id of data.updates.messages)
                            {
                                if(display.messages === chat_id)
                                {
                                    dispatch(load_messages_thunk({type: "messages", chat_id: chat_id}));
                                    delete data.updates["del_message"];
                                }
                                else
                                    updates_for_menu.messages.push(chat_id);
                            }
                        }
                        else if(key === "new_chats")
                        {
                            if(display.chats)
                                dispatch(load_chats_thunk);
                            else
                                updates_for_menu.new_chats = data.updates.new_chats;
                        }
                        else
                            updates_for_menu[key] = data.updates[key];
                    }
                    dispatch({type: "UPDATES_FOR_MENU", updates_for_menu: updates_for_menu});
                }
            });
    }
}

export default get_updates_thunk;