const React = novi.react.React;
import * as ExcerptFunction from "./ExcerptFunction";
import MailchimpEditor from "./MailchimpEditor";
import MailchimpSettings from "./MailchimpSettings";

const Plugin = {
    name: "novi-plugin-mailchimp",
    title: "Novi Mailchimp",
    description: "Novi Mailchimp description",
    version: "1.0.2",
    dependencies: {
        "plugin": "1.0.1"
    },
    defaults: {
        querySelector: '[class*="mailchimp-mailform"]'
    },
    ui: {
        editor: [MailchimpEditor],
        settings: <MailchimpSettings />,
    },
    excerpt : ExcerptFunction.validMailchimpForm
};

novi.plugins.register(Plugin);