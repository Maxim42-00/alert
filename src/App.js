import React from "react";
import "./App.css";
import {Route} from "react-router-dom";
import Container from "./Container/Container";
import Home from "./Home/Home";
import AuthContainer from "./Auth/AuthContainer";
import PrivateContainer from "./Private/PrivateContainer";
import AccountContainer from "./Account/AccountContainer";

class App extends React.Component
{
    componentDidMount()
    {
        this.interval = setInterval(this.props.get_updates, 5000, "online");
        window.addEventListener("beforeunload", ()=>this.props.get_updates("offline"));
    }
    componentWillUnmount()
    {
        window.removeEventListener("beforeunload", ()=>this.props.get_updates("offline"));
        clearInterval(this.interval);
    }

    render()
    {
        return (
            <div className="App">
                <Route exact path="/alert" render={()=><Home />} />
                <Route path="/alert/login" render={()=><AuthContainer auth_type="log_in" />} />
                <Route path="/alert/newaccount" render={()=><AuthContainer auth_type="new_account" />} />
                <Route path="/alert/private/:user_id" render={()=><Container> <PrivateContainer /> </Container>} />
                <Route path="/alert/account" render={()=><Container> <AccountContainer /> </Container>} />
            </div>
        );
    }
};

export default App;