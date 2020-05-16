import React from "react";
import "./Container.css";
import MenuContainer from "./Menu/MenuContainer";

class Container extends React.Component
{
    render()
    {
        return (
            <div className="Container">
                <MenuContainer />
                <div className="container_main">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default Container;