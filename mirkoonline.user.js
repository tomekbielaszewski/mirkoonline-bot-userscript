// ==UserScript==
// @name       Mirkoonline
// @namespace  http://wykop.pl/
// @version    1.2
// @description  Liczba aktywnych mirk?w
// @match      http://www.wykop.pl/*
// @copyright  2014, @Grizwold
// @updateURL   https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// @installURL  https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// @downloadURL https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// ==/UserScript==

$(function(){
    function createPlaceholder() {
        $('#nav > div > ul.clearfix.mainnav > li:nth-child(5) > a').html($('#nav > div > ul.clearfix.mainnav > li:nth-child(5) > a').text() + ' <em class="mark-number mirko-counter">...</em>');
    }

    function refreshCounter() {
        $.ajax({
            url: 'http://46.101.0.193:8080/entries/last/mirkoonline',
            dataType: 'jsonp',
            success: function(data){
                if (data != null) {
                    var updated = new Date(data.date).getTime();
                    var maxTimeWithoutUpdate = new Date().getTime() - (11 * 60 * 1000);
                    $('.mirko-counter').text(data.value + "" + ((updated > maxTimeWithoutUpdate) ? " OK" : " NIE DZIALA!!"));
                    $('.mirko-counter').attr("title", new Date(data.date).toLocaleString());
                }
            },
            error: function() {
                $('.mirko-counter').remove();
            }
        });
    }

    function init() {
        createPlaceholder();
        refreshCounter();

        setInterval(function() {
            refreshCounter();
        }, 300000);
    }

    init();
});