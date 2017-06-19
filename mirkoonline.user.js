// ==UserScript==
// @name       Mirkoonline
// @namespace  https://wykop.pl/
// @version    1.5
// @description  Liczba aktywnych mirków
// @match      https://www.wykop.pl/*
// @copyright  2014, @Grizwold
// @updateURL   https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// @installURL  https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// @downloadURL https://github.com/tomekbielaszewski/mirkoonline-bot-userscript/raw/master/mirkoonline.user.js
// ==/UserScript==

$(function () {
  function createPlaceholder() {
    $('#nav > div > ul.clearfix.mainnav > li:nth-child(5) > a').html($('#nav > div > ul.clearfix.mainnav > li:nth-child(5) > a').text() + ' <em class="mark-number mirko-counter">...</em>');
  }

  function refreshCounter() {
    $.ajax({
      url: 'https://api.grizwold.pl:8443/entries/last/mirkoonline',
      dataType: 'jsonp',
      success: function (data) {
        if (data != null) {
          $('.mirko-counter').text(data.value);
          $('.mirko-counter').attr("title", new Date(data.date).toLocaleString());
        }
      },
      error: function () {
        $('.mirko-counter').remove();
      }
    });
  }

  function init() {
    createPlaceholder();
    refreshCounter();

    setInterval(function () {
      refreshCounter();
    }, 300000);
  }

  init();
});
