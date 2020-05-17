import {host} from "../../host";

function load_messages_thunk(params, input={})
{
    return function(dispatch)
    {
        let fetch_obj = {};
        let form_data = new FormData();
        form_data.append("type", params.type);
        if(input.text)
        {
            form_data.append("text", input.text);
        }
        if(input.files)
        {
            input.files.forEach(file => {
                form_data.append("files[]", file, file.name);
            });
        }
        if(params.type === "comments")
            form_data.append("post_id", params.post_id);

        fetch_obj = {method: "POST", body: form_data, credentials: "include"};

        fetch(host + `/alert/php/load_messages.php`, fetch_obj)
            .then(data=>data.json())
            .then(data=>{
                if(data.status === "ok")
                    dispatch({type: "LOAD_MESSAGES", messages: data.data, params});
                else
                    dispatch({type: "SET_AUTH", auth: data.status});
            });

    }
}

export default load_messages_thunk;