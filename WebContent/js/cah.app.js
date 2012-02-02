/**
 * Copyright (c) 2012, Andy Janata
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this list of conditions
 *   and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other materials provided
 *   with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Main app for cah.
 * 
 * @author ajanata
 */

$(document).ready(function() {
  // see if we already exist on the server so we can resume
  cah.Ajax.build(cah.$.AjaxOperation.FIRST_LOAD).run();

  // TODO see if we have a stored nickname somewhere
  $("#nicknameconfirm").click(nicknameconfirm_click);
  $("#nickbox").keyup(nickbox_keyup);
  $("#nickbox").focus();

  $("#chat").keyup(chat_keyup);
  $("#chat_submit").click(chatsubmit_click);

  // TODO: have some sort of mechanism to alert the server that we have unloaded the page, but
  // have not expressed an interest in being cleared out yet.
  // $(window).bind("beforeunload", window_beforeunload);
  $("#logout").click(logout_click);

  // if (($.browser.mozilla || $.browser.opera) && !$.cookie("browser_dismiss")) {
  // var name = $.browser.mozilla ? "Firefox" : "Opera";
  // $("#browser").show();
  // $("#browser_name").text(name);
  // $("#browser_ok").click(function() {
  // $("#browser").hide();
  // $.cookie("browser_dismiss", true, {
  // expires : 3650,
  // });
  // });
  // }

  if ($.browser.mozilla) {
    // Firefox sucks.
    $("body").css("font-size", "12px");
  }

  $(window).resize(app_resize);
  app_resize();
});

function nickbox_keyup(e) {
  if (e.which == 13) {
    $("#nicknameconfirm").click();
    e.preventDefault();
  }
}

function nicknameconfirm_click(e) {
  var nickname = $.trim($("#nickname").val());
  cah.Ajax.build(cah.$.AjaxOperation.REGISTER).withNickname(nickname).run();
}

function chat_keyup(e) {
  if (e.which == 13) {
    $("#chat_submit").click();
    e.preventDefault();
  }
}

function chatsubmit_click(e) {
  var text = $.trim($("#chat").val());
  // TODO when I get multiple channels working, this needs to know active and pass it
  cah.Ajax.build(cah.$.AjaxOperation.CHAT).withMessage(text).run();
  cah.log.status("<" + cah.nickname + "> " + text);
  $("#chat").val("");
  $("#chat").focus();
}

function logout_click(e) {
  cah.Ajax.build(cah.$.AjaxOperation.LOG_OUT).run();
}

function app_resize() {
  // this works well enough in chrome. I would not be surprised if this sucks everywhere else.
  var chatWidth = $("#canvas").width() - 251;
  $("#chat_area").width(chatWidth);
  $("#chat").width(chatWidth - 48);
  var bottomHeight = $(window).height() - $("#main").height() - $("#menubar").height() - 27;
  $("#bottom").height(bottomHeight);
  $("#info_area").height(bottomHeight);
  $("#chat_area").height(bottomHeight);
  $("#log").height(bottomHeight - $("#chat").height() - 1);
  // this is ugly and terrible.
  if ($(window).height() < 650) {
    $("body").css("overflow-y", "auto");
  } else {
    $("body").css("overflow-y", "hidden");
  }
}
