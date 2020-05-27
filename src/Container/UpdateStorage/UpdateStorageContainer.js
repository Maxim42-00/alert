import UpdateStorage from "./UpdateStorage";
import {connect} from "react-redux";
import get_updates_thunk from "./get_updates_thunk";

function mapStateToProps(state)
{
    return {
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        get_updates: (online)=>dispatch(get_updates_thunk(online))
    };
}

const UpdateStorageContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStorage);

export default UpdateStorageContainer;