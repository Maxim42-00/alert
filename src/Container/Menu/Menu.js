import React from "react";
import "./Menu.css";
import {NavLink} from "react-router-dom";

class Menu extends React.Component
{
    render()
    {
        let menu_items = this.props.menu_items.map((cur, i)=>
            <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/take"+cur.src}> <span className="menu_item"> {cur.name} </span> </NavLink></div>);
        return (
            <div className="Menu">
                <div className="menu_btn">MENU</div>
                <div className="menu_logo">Astro-Margo.ru</div>
                <div className="menu_panel">
                    {menu_items}
                    <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert"}> <span className="menu_item" onClick={this.props.quit}> Выйти </span> </NavLink></div>
                </div>
            </div>
        );
    }
};

export default Menu;