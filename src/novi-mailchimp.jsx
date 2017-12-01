const React = novi.react.React;
import * as ExcerptFunction from "./ExcerptFunction";
import MailchimpEditor from "./MailchimpEditor";
import MailchimpSettings from "./MailchimpSettings";
const Language = novi.language;
const Plugin = {
    name: "novi-plugin-mailchimp",
    title: "Novi Mailchimp",
    description: "Novi Mailchimp description",
    version: "1.0.4",
    dependencies: {
        novi: "0.8.6"
    },
    defaults: {
        querySelector: '[class*="mailchimp-mailform"]'
    },
    ui: {
        editor: [MailchimpEditor],
        settings: <MailchimpSettings />,
    },
    excerpt : ExcerptFunction.validMailchimpForm,
    onLanguageChange : onLanguageChange
};
function onLanguageChange(plugin){
    let messages = Language.getDataByKey("novi-plugin-mailchimp");
    plugin.ui.editor[0].title = messages.editor.title;
    plugin.ui.editor[0].tooltip = messages.editor.tooltip;
    plugin.ui.editor[0].header[1] = <span>{messages.editor.tooltip}</span>;
    return plugin;
}
novi.plugins.register(Plugin);