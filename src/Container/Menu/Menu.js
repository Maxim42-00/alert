import React from "react";
import "./Menu.css";
import {NavLink} from "react-router-dom";

class Menu extends React.Component
{
    render()
    {
        let number_of_updates = this.props.number_of_comments + this.props.number_of_followers;
        let updates_label = "";
        if(number_of_updates)
        {
            updates_label = <div className="menu_update_label"> {number_of_updates} </div>;
        }

        let menu_items = this.props.menu_items.map((cur, i)=>
            <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert"+cur.src}> <span className="menu_item"> {cur.name} </span> </NavLink></div>);
        return (
            <div className="Menu">
                <div className="menu_btn">MENU</div>
                <div className="menu_logo">Astro-Margo.ru</div>
                <div className="menu_panel">
                    <div className="menu_nav_div">{updates_label}<NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert/private/"+this.props.my_id}> <span className="menu_item"> Моя Страница </span> </NavLink></div>
                    {menu_items}
                    <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert"}> <span className="menu_item" onClick={this.props.quit}> Выйти </span> </NavLink></div>
                </div>
            </div>
        );
    }
};

export default Menu;