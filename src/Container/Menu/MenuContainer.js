import Menu from "./Menu";
import {connect} from "react-redux";

function mapStateToProps(state)
{
    return {
        menu_items: state.menu.menu_items,
        my_id: state.auth.my_id,
        number_of_comments: state.update_storage.comments.length
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        quit: ()=>dispatch({type: "QUIT"})
    };
}

let MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;