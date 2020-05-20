import App from "./App";
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

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;