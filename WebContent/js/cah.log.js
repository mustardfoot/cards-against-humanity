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
 * Logging functions.
 * 
 * @author ajanata
 */

cah.log = {};

cah.log.status = function(text, opt_class) {
  var scroll = $("#log").prop("scrollHeight") - $("#log").height() - $("#log").prop("scrollTop") <= 5;

  var node = $("<span></span><br/>");
  $(node).text("[" + new Date().toLocaleTimeString() + "] " + text + "\n");
  if (opt_class) {
    $(node).addClass(opt_class);
  }
  $("#log").append(node);

  if (scroll) {
    $("#log").prop("scrollTop", $("#log").prop("scrollHeight"));
  }
};

cah.log.error = function(text) {
  cah.log.status("Error: " + text, "error");
};

/**
 * Log a message if debugging is enabled, optionally dumping the contents of an object.
 * 
 * @param {string}
 *          text Text to display
 * @param {object}
 *          opt_obj Optional. Object to dump along with message.
 */
cah.log.debug = function(text, opt_obj) {
  if (cah.SILENT_DEBUG && console) {
    if (console.debug) {
      console.debug("[" + new Date().toLocaleTimeString() + "]", text, opt_obj);
    } else if (console.log) {
      console.log("[" + new Date().toLocaleTimeString() + "] " + text);
      if (opt_obj) {
        if (console.dir) {
          console.dir(opt_obj);
        } else if (JSON && JSON.stringify) {
          console.log(JSON.stringify(opt_obj));
        } else {
          console.log("TODO: SILENT_DEBUG without console.debug, with console.log, "
              + "without console.dir, without JSON.stringify");
        }
      }
    } else if (console.log) {
      console.log("[" + new Date().toLocaleTimeString() + "]", text, opt_obj);
    }
  }
  if (cah.DEBUG) {
    if (opt_obj) {
      if (JSON && JSON.stringify) {
        cah.log.debug(text + ": " + JSON.stringify(opt_obj));
      } else {
        cah.log.debug(text + ": TODO: debug log without JSON.stringify()");
      }
    } else {
      cah.log.status("DEBUG: " + text, "debug");
    }
  }
};
