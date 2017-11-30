const Input = novi.ui.input;
const React = novi.react.React;
const Component = novi.react.Component;
const Language = novi.language;
export default class Body extends Component{
    constructor(props){
        super(props);

        let action = novi.element.getAttribute(props.element, 'action');

        this.state = {
            action,
            initActionValue: action,
            element: props.element
        };

        this._handleActionChange = this._handleActionChange.bind(this);
        this.messages = Language.getDataByKey("novi-plugin-mailchimp");
    }

    render(){
        return (
            <div className="mailchimp-wrap" style={{"padding": "0 12px", "display": "flex", "flexDirection": "column", "justifyContent": "center", "height": "100%", "color": "#6E778A"}}>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    {this.messages.editor.body.signUpUrl}
                </p>
                <Input onChange={this._handleActionChange} value={this.state.action}/>
            </div>

        )
    }

    _handleActionChange(e){
        let value = e.target.value;
        this.setState({
            action : value
        });
    }
}