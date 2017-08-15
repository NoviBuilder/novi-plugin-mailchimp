# novi-plugin-mailchimp
Novi Builder Plugin for visual [RD Mailchimp](https://github.com/TemplatemonsterPlugins/rd-mailchimp) customization

## How to Install
You should follow several simple steps to install this plugin:
* Copy the novi-plugin-mailchimp.js file to your path/to/novibuilder/plugins folder.
* Launch NoviBuilder

## What you are able to do
* Change mailchimp signup url

## Developer Settings
* querySelector — contains a css selector which defines the Plugin container.

## How to add RD Mailchimp on your page
If your website doesn't contain RD Mailchimp follow the instructions below to install it.

### Include RD Mailchimp files to Website
Copy the "assets/rd-mailchimp.css" and assets/rd-mailchimp.js to website's CSS and JS folders respectively and include this files to your website.

### Add RD Mailchimp HTML Layout
Add basic HTML markup:
```html
<form class="mailchimp-mailform rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post" action="*************"> // action is your sign up url in mailchimp service
    <div class="form-wrap">
        <input class="form-input" id="contact-name" type="text" name="name" data-constraints="@Required">
        <label class="form-label" for="contact-name">Your Name</label>
    </div>
    ...
    <button type="submit">Send Message</button>
</form>
<div class="snackbars" id="form-output-global"></div>
```

Example of RD Mailchimp markup using [Bootstrap](http://getbootstrap.com/) and [Font Awesome](http://fontawesome.io/):

```html
<!-- RD Mailchimp -->
    <section class="section">
        <div class="container">
            <form class="mailchimp-mailform rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post"
                  action="*************"> // action is your sign up url in mailchimp service
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-name" type="text" name="name"
                                   data-constraints="@Required">
                            <label class="form-label" for="contact-name">Your Name</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-phone" type="text" name="phone"
                                   data-constraints="@Numeric">
                            <label class="form-label" for="contact-phone">Phone</label>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-wrap">
                            <label class="form-label" for="contact-message">Your Message</label>
                            <textarea class="form-input" id="contact-message" name="message"
                                      data-constraints="@Required"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-email" type="email" name="email"
                                   data-constraints="@Email @Required">
                            <label class="form-label" for="contact-email">E-mail</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <button class="button button-block button-primary" type="submit">Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
```

### Initialize RD Mailchimp
Initialize RD Mailchimp in JS by adding following block code:

```js
/**
     * Global variables
     */
    var $document = $(document),
        rdInputLabel = $(".form-label"),
        regulaElements = $("[data-constraints]"),
        mailchimp = $('.mailchimp-mailform');

    /**
     * Initialize All Scripts
     */
    $document.ready(function () {
        var isNoviBuilder = window.xMode;


        /**
         * attachFormValidator
         * @description  attach form validation to elements
         */
        function attachFormValidator(elements) {
            for (var i = 0; i < elements.length; i++) {
                var o = $(elements[i]), v;
                o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
                v = o.parent().find(".form-validation");
                if (v.is(":last-child")) {
                    o.addClass("form-control-last-child");
                }
            }

            elements
                .on('input change propertychange blur', function (e) {
                    var $this = $(this), results;

                    if (e.type !== "blur") {
                        if (!$this.parent().hasClass("has-error")) {
                            return;
                        }
                    }

                    if ($this.parents('.rd-mailform').hasClass('success')) {
                        return;
                    }

                    if ((results = $this.regula('validate')).length) {
                        for (i = 0; i < results.length; i++) {
                            $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
                        }
                    } else {
                        $this.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                })
                .regula('bind');

            var regularConstraintsMessages = [
                {
                    type: regula.Constraint.Required,
                    newMessage: "The text field is required."
                },
                {
                    type: regula.Constraint.Email,
                    newMessage: "The email is not a valid email."
                },
                {
                    type: regula.Constraint.Numeric,
                    newMessage: "Only numbers are required"
                },
                {
                    type: regula.Constraint.Selected,
                    newMessage: "Please choose an option."
                }
            ];


            for (var i = 0; i < regularConstraintsMessages.length; i++) {
                var regularConstraint = regularConstraintsMessages[i];

                regula.override({
                    constraintType: regularConstraint.type,
                    defaultMessage: regularConstraint.newMessage
                });
            }
        }

        /**
         * isValidated
         * @description  check if all elements pass validation
         */
        function isValidated(elements) {
            var results, errors = 0;

            if (elements.length) {
                for (j = 0; j < elements.length; j++) {

                    var $input = $(elements[j]);
                    if ((results = $input.regula('validate')).length) {
                        for (k = 0; k < results.length; k++) {
                            errors++;
                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                        }
                    } else {
                        $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                }

                return errors === 0;
            }
            return true;
        }


        /**
         * RD Input Label
         * @description Enables RD Input Label Plugin
         */

        if (rdInputLabel.length) {
            rdInputLabel.RDInputLabel();
        }


        /**
         * Regula
         * @description Enables Regula plugin
         */

        if (regulaElements.length) {
            attachFormValidator(regulaElements); 
        } 
        
        /**
         * MailChimp Ajax subscription
        */
        
        if (mailchimp.length) {
          for (i = 0; i < mailchimp.length; i++) {
            var $mailchimpItem = $(mailchimp[i]),
              $email = $mailchimpItem.find('input[type="email"]');
    
            // Required by MailChimp
            $mailchimpItem.attr('novalidate', 'true');
            $email.attr('name', 'EMAIL');
    
            $mailchimpItem.on('submit', $.proxy(function (e){
              e.preventDefault();
    
              var $this = this;
    
              var data = {},
                url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
                dataArray = $this.serializeArray(),
                $output = $("#" + $this.attr("data-form-output"));
    
              for (i = 0; i < dataArray.length; i++) {
                data[dataArray[i].name] = dataArray[i].value;
              }
    
              $.ajax({
                data: data,
                url: url,
                dataType: 'jsonp',
                error: function (resp, text) {
                  $output.html('Server error: ' + text);
    
                  setTimeout(function () {
                    $output.removeClass("active");
                  }, 4000);
                },
                success: function (resp) {
                  $output.html(resp.msg).addClass('active');
    
                  setTimeout(function () {
                    $output.removeClass("active");
                  }, 6000);
                },
                beforeSend: function(data){
                  // Stop request if builder or inputs are invalide
                  if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
                    return false;
    
                  $output.html('Submitting...').addClass('active');
                }
              });
    
              return false;
            }, $mailchimpItem));
          }
        }
    });
```
