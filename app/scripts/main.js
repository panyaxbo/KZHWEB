'use strict'

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
/*
$(document).ready(function() {
  $(".js-example-basic-single").select2();
});
*/
$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
    //  $('html,body').animate({scrollTop: target.offset().top}, 500);
      $('html,body').animate({scrollTop: 750}, 600);
   //     $('html,body').animate({scrollTop:$('[name="'+this.hash.substring(1)+'"]').offset().top}, 500);
    }

});

$('#DropdownLanguage li').on('click', function () {
    $('#SelectedDropdownLanguage').html($(this).find('a').html());
});

$('#DropdownCurrency li').on('click', function () {
    $('#SelectedDropdownCurrency').html($(this).find('a').html());
});

 function formatLangResult (state) {
   //   if (!state.id) { return state.text; }
     
      if (state.text == 'th' || state.text == 'us' || state.text == 'cn') {
        var $state = $(
          '<span><img src="/images/' + state.text + '.png"/></span>'
     
            //      '<span><img src="/images/' + state.element.value.toLowerCase() + '.png"/> </span>'
        );
        return $state;
      }
    };
    function formatLangSelection (state) {
   //   if (!state.id) { return state.text; }

      if (state.text == 'th' || state.text == 'us' || state.text == 'cn') {
          var $state = $(
            '<span><img src="/images/' + state.text + '.png"/> </span>'
        //      '<span><img src="/images/' + state.element.value.toLowerCase() + '.png"/> </span>'
          );
          return $state;
        }
    };
    $(".js-example-templating").select2({
      templateResult: formatLangResult,
      templateSelection: formatLangSelection
    });


    function PDF() {
        var doc = new jsPDF();
        var img = "/images/KZH Logo.png";
        doc.setFontSize(40);
        doc.setFont("TH SarabunPSK", "Regular");
        doc.text("โค้ว ซุ่น เฮง", 35, 25);

        doc.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.');

        // Optional - set properties on the document
        doc.setProperties({
            title: 'Title',
            subject: 'This is the subject',
            author: 'James Hall',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
        });

        // Output as Data URI
        doc.save('Test.pdf');
    }
    
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

