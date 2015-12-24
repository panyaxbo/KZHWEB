"use strict";function formatLangResult(a){if("th"==a.text||"us"==a.text||"cn"==a.text){var b=$('<span><img src="/images/'+a.text+'.png"/></span>');return b}}function formatLangSelection(a){if("th"==a.text||"us"==a.text||"cn"==a.text){var b=$('<span><img src="/images/'+a.text+'.png"/> </span>');return b}}function PDF(){var a=new jsPDF;a.setFontSize(40),a.setFont("TH SarabunPSK","Regular"),a.text("โค้ว ซุ่น เฮง",35,25),a.text(20,20,"This PDF has a title, subject, author, keywords and a creator."),a.setProperties({title:"Title",subject:"This is the subject",author:"James Hall",keywords:"generated, javascript, web 2.0, ajax",creator:"MEEE"}),a.save("Test.pdf")}function isEmpty(a){return void 0===a||null==a||a.length<=0?!0:!1}!function(a){var b=function(a,b){this.init("magnify",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e="mousemove",f="mouseleave";this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.nativeWidth=0,this.nativeHeight=0,this.$element.wrap('<div class="magnify" >'),this.$element.parent(".magnify").append('<div class="magnify-large" >'),this.$element.siblings(".magnify-large").css("background","url('"+this.$element.attr("src")+"') no-repeat"),this.$element.parent(".magnify").on(e+"."+this.type,a.proxy(this.check,this)),this.$element.parent(".magnify").on(f+"."+this.type,a.proxy(this.check,this))},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},check:function(b){var c=a(b.currentTarget),d=c.children("img"),e=c.children(".magnify-large");if(this.nativeWidth||this.nativeHeight){var f=c.offset(),g=b.pageX-f.left,h=b.pageY-f.top;if(g<c.width()&&h<c.height()&&g>0&&h>0?e.fadeIn(100):e.fadeOut(100),e.is(":visible")){var i=-1*Math.round(g/c.width()*this.nativeWidth-e.width()/2),j=-1*Math.round(h/c.height()*this.nativeHeight-e.height()/2),k=i+"px "+j+"px",l=g-e.width()/2,m=h-e.height()/2;e.css({left:l,top:m,backgroundPosition:k})}}else{var n=new Image;n.src=d.attr("src"),this.nativeWidth=n.width,this.nativeHeight=n.height}}},a.fn.magnify=function(c){return this.each(function(){var d=a(this),e=d.data("magnify"),f="object"==typeof c&&c;e||d.data("tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.magnify.Constructor=b,a.fn.magnify.defaults={delay:0},a(window).on("load",function(){a('[data-toggle="magnify"]').each(function(){var b=a(this);b.magnify()})})}(window.jQuery),$(document).ready(function(){$(window).scroll(function(){$(this).scrollTop()>100?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},600),!1})}),$('a[href^="#"]').on("click",function(a){var b=$($(this).attr("href"));b.length&&(a.preventDefault(),$("html,body").animate({scrollTop:750},600))}),$("#DropdownLanguage li").on("click",function(){$("#SelectedDropdownLanguage").html($(this).find("a").html())}),$("#DropdownCurrency li").on("click",function(){$("#SelectedDropdownCurrency").html($(this).find("a").html())}),$(".js-example-templating").select2({templateResult:formatLangResult,templateSelection:formatLangSelection});var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b,c,d,e,f,g,h,i="",j=0;for(a=Base64._utf8_encode(a);j<a.length;)b=a.charCodeAt(j++),c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=b>>2,f=(3&b)<<4|c>>4,g=(15&c)<<2|d>>6,h=63&d,isNaN(c)?g=h=64:isNaN(d)&&(h=64),i=i+this._keyStr.charAt(e)+this._keyStr.charAt(f)+this._keyStr.charAt(g)+this._keyStr.charAt(h);return i},decode:function(a){var b,c,d,e,f,g,h,i="",j=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");j<a.length;)e=this._keyStr.indexOf(a.charAt(j++)),f=this._keyStr.indexOf(a.charAt(j++)),g=this._keyStr.indexOf(a.charAt(j++)),h=this._keyStr.indexOf(a.charAt(j++)),b=e<<2|f>>4,c=(15&f)<<4|g>>2,d=(3&g)<<6|h,i+=String.fromCharCode(b),64!=g&&(i+=String.fromCharCode(c)),64!=h&&(i+=String.fromCharCode(d));return i=Base64._utf8_decode(i)},_utf8_encode:function(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b},_utf8_decode:function(a){for(var b="",c=0,d=c1=c2=0;c<a.length;)d=a.charCodeAt(c),128>d?(b+=String.fromCharCode(d),c++):d>191&&224>d?(c2=a.charCodeAt(c+1),b+=String.fromCharCode((31&d)<<6|63&c2),c+=2):(c2=a.charCodeAt(c+1),c3=a.charCodeAt(c+2),b+=String.fromCharCode((15&d)<<12|(63&c2)<<6|63&c3),c+=3);return b}};$(document).ready(function(){var a=$("div.setup-panel div a"),b=$(".setup-content"),c=$(".nextBtn");b.hide(),a.click(function(c){c.preventDefault();var d=$($(this).attr("href")),e=$(this);e.hasClass("disabled")||(a.removeClass("btn-primary").addClass("btn-default"),e.addClass("btn-primary"),b.hide(),d.show(),d.find("input:eq(0)").focus())}),c.click(function(){var a=$(this).closest(".setup-content"),b=a.attr("id"),c=$('div.setup-panel div a[href="#'+b+'"]').parent().next().children("a"),d=a.find("input[type='text'],input[type='url']"),e=!0;$(".form-group").removeClass("has-error");for(var f=0;f<d.length;f++)d[f].validity.valid||(e=!1,$(d[f]).closest(".form-group").addClass("has-error"));e&&c.removeAttr("disabled").trigger("click")}),$("div.setup-panel div a.btn-primary").trigger("click")}),"use strict"(function(a){var b=function(a,b){var c=function(a,b,c){return function(){c.$apply(function(){b.resolve(a.result)})}},d=function(a,b,c){return function(){c.$apply(function(){b.reject(a.result)})}},e=function(a,b){return function(a){b.$broadcast("fileProgress",{total:a.total,loaded:a.loaded})}},f=function(a,b){var f=new FileReader;return f.onload=c(f,a,b),f.onerror=d(f,a,b),f.onprogress=e(f,b),f},g=function(b,c){var d=a.defer(),e=f(d,c);return e.readAsDataURL(b),d.promise};return{readAsDataUrl:g}};a.factory("fileReader",["$q","$log",b])}(angular.module("plunker")));