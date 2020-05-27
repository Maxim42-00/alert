import UpdateStorage from "./UpdateStorage";
import {connect} from "react-redux";
import get_updates_thunk from "./get_updates_thunk";

function mapStateToProps(state)
{
    return {
        comments: state.chat.comments_displayed,
        chat_users_ids: state.chat.users_ids
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        get_updates: (online, display, users_ids)=>dispatch(get_updates_thunk(online, display, users_ids))
    };
}

const UpdateStorageContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStorage);

export default UpdateStorageContainer;