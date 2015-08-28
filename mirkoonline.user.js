// ==UserScript==
// @name       Mirkoonline
// @namespace  http://wykop.pl/
// @version    1.1
// @description  Liczba aktywnych mirków
// @match      http://www.wykop.pl/*
// @copyright  2014, @Grizwold
// @updateURL   http://tomek.ckhost.pl/mirkoonline/mirkoonline.user.js
// @installURL  http://tomek.ckhost.pl/mirkoonline/mirkoonline.user.js
// @downloadURL http://tomek.ckhost.pl/mirkoonline/mirkoonline.user.js
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
				if(data != null) {
					$('.mirko-counter').text(data.value);
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