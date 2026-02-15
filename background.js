/**
* Author: Lucas Bustamante
* Website: https://www.lucasbustamante.com.br
* Updated by: Jonas Johansson
* Website: https://www.jonasjohansson.se
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

importScripts('categories.js');

chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({
      filename: filename,
      conflictAction: conflictAction,
      conflict_action: conflictAction
    });
  }

  chrome.storage.sync.get({ pattern: DEFAULT_PATTERN, customRules: [] }, function(data) {
    var d = new Date();
    var day = ('0' + d.getDate()).slice(-2);
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();

    var fileExtension = item.filename.split('.').pop().toLowerCase();

    // Check custom rules first (they override built-in categories)
    var category = null;
    for (var i = 0; i < data.customRules.length; i++) {
      var exts = data.customRules[i].extensions.split(',').map(function(e) { return e.trim().toLowerCase(); });
      if (exts.includes(fileExtension)) {
        category = data.customRules[i].folder;
        break;
      }
    }

    // Fall back to built-in categories
    if (!category) {
      category = extensionGroups.find(group => group.extensions.includes(fileExtension))?.folder || 'other';
    }

    var path = data.pattern
      .replace('{year}', year)
      .replace('{month}', month)
      .replace('{day}', day)
      .replace('{category}', category);

    suggest(path + '/' + item.filename, 'uniquify');
  });

  return true; // keep the suggest callback alive for async storage call
});
