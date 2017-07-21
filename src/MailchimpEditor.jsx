const React = novi.react.React;
const Icons = novi.ui.icons;
import Trigger from "./editor/Trigger";
import Body from "./editor/Body";


const EditorItem = {
    trigger: <Trigger/>,
    tooltip: "Change mailchimp sign up url",
    header: [Icons.ICON_MAILCHIMP, <span>Mailchimp Settings</span>],
    body: [<Body/>],
    closeIcon: "submit",
    onSubmit: onSubmitAction,
    width: 360,
    height: 94,
    title: "Mailchimp settings"
};


export default EditorItem;

function onSubmitAction(headerStates, bodyStates) {
    let state = bodyStates[0];
    if( state.initActionValue === state.action ) return;
    novi.element.setAttribute(state.element, "action", state.action);
    novi.page.forceUpdate();

}