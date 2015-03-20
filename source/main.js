var gmail;
var body_text;
var signature;
var me;

function refresh(f) {
    if ((/in/.test(document.readyState)) || (undefined === Gmail)) {
        setTimeout('refresh(' + f + ')', 10);
    } else {
        f();
    }
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index+12, this.length);
  else
    return string + this;
};


var main = function() {

    gmail = new Gmail();
    me=gmail.get.user_email();

    gmail.observe.on('recipient_change', function(match, recipients) {
        signature=match.body();

    	body_text=localStorage.getItem("body_text");
    	if(!body_text)
    		body_text='This is a sample body text you can auto fill. Once you modify this and sent next time it will load updated body msg'+signature;


        if ((recipients.to[0].indexOf(me)) > 0) {

            match.subject('Test subject' );
            

            match.body(body_text);


            register_before_send();


        };



    });

function register_before_send(){


gmail.observe.before('send_message', function(url, body, data, xhr){


localStorage.setItem("body_text", data.body);



});
}

}


refresh(main);
