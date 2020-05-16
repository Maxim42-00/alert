let default_state = {
    menu_items: [
        {
            name: "Личный кабинет",
            src: "/private"
        },
        {
            name: "Моя Аренда",
            src: "/my_arend"
        },
        {
            name: "Действия",
            src: "/actions"
        },
        {
            name: "Форум",
            src: "/forum"
        }
    ]
};

function menu_items_reducer(state = default_state, action)
{
    return state;
}

export default menu_items_reducer;