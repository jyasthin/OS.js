/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2016, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

/**
 * @namespace lib.auth
 */

/**
 * Initializes a session
 *
 * @param   {ServerInstance}   instance      OS.js instance
 * @param   {ServerRequest}    http          OS.js Server Request
 *
 * @function initSession
 * @memberof lib.auth
 */
module.exports.initSession = function(instance, http) {
  return new Promise(function(resolve, reject) {
    instance.AUTH.initSession(instance, http, resolve, reject);
  });
};

/**
 * Checks a permission
 *
 * @param   {ServerInstance}   instance      OS.js instance
 * @param   {ServerRequest}    http          OS.js Server Request
 * @param   {String}           type          Permission type
 * @param   {Object}           [options]     Permission options/arguments
 *
 * @function checkPermission
 * @memberof lib.auth
 */
module.exports.checkPermission = function(instance, http, group, options) {
  return new Promise(function(resolve, reject) {
    instance.AUTH.checkPermission(instance, http, resolve, reject, group, options);
  });
}

/**
 * Checks a session
 *
 * @param   {ServerInstance}   instance      OS.js instance
 * @param   {ServerRequest}    http          OS.js Server Request
 *
 * @function checkSession
 * @memberof lib.auth
 */
module.exports.checkSession = function(instance, http) {
  return new Promise(function(resolve, reject) {
    instance.AUTH.checkSession(instance, http, resolve, reject);
  });
};

/**
 * Checks if user has given group(s)
 *
 * @param   {ServerInstance}   instance      OS.js instance
 * @param   {ServerRequest}    http          OS.js Server Request
 * @param   {String|Array}     groupList     Group(s)
 *
 * @function hasGroup
 * @memberof lib.auth
 */
module.exports.hasGroup = function(instance, http, groupList) {
  var userGroups = [];
  try {
    userGroups = JSON.parse(http.session.get('groups')) || [];
  } catch ( e ) {};

  if ( userGroups.indexOf('admin') !== -1 ) {
    return true;
  }

  if ( !(groupList instanceof Array) ) {
    groupList = [groupList];
  }

  return groupList.some(function(name) {
    if ( userGroups.indexOf(name) !== -1 ) {
      return true;
    }

    return false;
  });
};