import Menu from "./Menu";
import {connect} from "react-redux";

function mapStateToProps(state)
{
    return {
        menu_items: state.menu.menu_items,
        my_id: state.auth.my_id
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