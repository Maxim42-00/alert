import React from "react";

class UpdateStorage extends React.Component
{
    componentDidMount()
    {
        this.interval = setInterval(this.props.get_updates, 5000, "online");
        this.props.get_updates("online");
        window.addEventListener("beforeunload", ()=>this.props.get_updates("offline"));
    }
    componentWillUnmount()
    {
        window.removeEventListener("beforeunload", ()=>this.props.get_updates("offline"));
        this.props.get_updates("offline");
        clearInterval(this.interval);
    }
    render()
    {
        return <div></div>;
    }
};

export default UpdateStorage;