import React from "react";
import "./App.css";
import Dialog from "./Dialog/Dialog";
import {Route} from "react-router-dom";
import Container from "./Container/Container";
import Home from "./Home/Home";
import AuthContainer from "./Auth/AuthContainer";
import PrivateContainer from "./Private/PrivateContainer";

class App extends React.Component
{
    render()
    {
        return (
            <div className="App">
                <Route exact path="/alert" render={()=><Home />} />
                <Route path="/alert/login" render={()=><AuthContainer auth_type="log_in" />} />
                <Route path="/alert/newaccount" render={()=><AuthContainer auth_type="new_account" />} />
                <Route path="/alert/private" render={()=><Container> <PrivateContainer /> </Container>} />
            </div>
        );
    }
};

export default App;