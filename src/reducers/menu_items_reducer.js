let default_state = {
    menu_items: [
        {
            name: "Аккаунт",
            src: "/account"
        }
    ]
};

function menu_items_reducer(state = default_state, action)
{
    return state;
}

export default menu_items_reducer;