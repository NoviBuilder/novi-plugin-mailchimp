
export function validMailchimpForm(element){
    let action = getAction(element);
    return action !== null;

}

function getAction(element){
    let action = novi.element.getAttribute(element, 'action');
    return action;
}