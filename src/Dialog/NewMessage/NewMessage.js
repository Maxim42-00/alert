import React from "react";
import "./NewMessage.css";

class NewMessage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: "",
            files: []
        };
        this.on_change_text = this.on_change_text.bind(this);
        this.on_change_file = this.on_change_file.bind(this);
        this.send = this.send.bind(this);
    }
    on_change_text(value)
    {
        this.setState({text: value});
    }
    on_change_file(file_input)
    {
        let files= [...file_input.files];
        this.setState({files: files});
    }
    send()
    {
        this.props.load_messages(this.props.params, this.state, this.props.msg_for_recall);
        this.setState({text: "", files: []});
        this.files_val.value="";
        this.props.del_msg_for_recall();
    }
    render()
    {
        let msg_for_recall_div = this.props.msg_for_recall;
        if(this.props.msg_for_recall)
        {
            msg_for_recall_div = <div> <span> Выделено Сообщение  </span> <div onClick={this.props.del_msg_for_recall} className="del_msg_for_recall"> Удалить </div> </div>;
            
        }
        return (
            <div className="NewMessage">
                <textarea className="new_message_input" value={this.state.text} placeholder="Новое Сообщение" onChange={(e)=>this.on_change_text(e.target.value)}></textarea>
                <input type="file" onChange={(e)=>this.on_change_file(e.target)}  ref={(r)=>this.files_val=r} multiple />
                <div>{msg_for_recall_div}</div>
                <span className="send_message" onClick={()=>this.send()}> Send </span>
            </div>
        );
    }
};

export default NewMessage;