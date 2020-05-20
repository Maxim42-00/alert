import {host} from "./host";


function get_updates_thunk(online)
{
    return function(dispatch)
    {
        fetch(host + `/alert/php/get_updates.php?online=${online}`, {credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                console.log(data);
            });
    }
}

export default get_updates_thunk;