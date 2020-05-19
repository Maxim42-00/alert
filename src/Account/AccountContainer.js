import Account from "./Account";
import {connect} from "react-redux";
import load_account_data_thunk from "./load_account_data_thunk";
import {withRouter} from "react-router-dom";

function mapStateToProps(state)
{
    return {
        img: state.account.img,
        name: state.account.name,
        surname: state.account.surname,
        e_mail: state.account.e_mail,
        password: state.account.password,
        is_auth: state.auth.is_auth
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_account_data: (input)=>dispatch(load_account_data_thunk(input))
    };
}

const AccountWithRouter = withRouter(Account);
const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(AccountWithRouter);

export default AccountContainer;