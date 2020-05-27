import {host} from "../../host";


function get_updates_thunk(online)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("online", online);

        fetch(host + "/alert/php/get_updates.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                console.log(data);
            });
    }
}

export default get_updates_thunk;