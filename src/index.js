import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import chat_reducer from "./reducers/chat_reducer";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import menu_items_reducer from "./reducers/menu_items_reducer";
import auth_reducer from "./reducers/auth_reducer";
import private_reducer from "./reducers/private_reducer";
import new_message_reducer from "./reducers/new_message_reducer";

const reducers = combineReducers({
    auth: auth_reducer,
    menu: menu_items_reducer,
    chat: chat_reducer,
    private: private_reducer,
    new_message: new_message_reducer
});

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);