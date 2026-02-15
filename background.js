/**
* Author: Lucas Bustamante
* Website: https://www.lucasbustamante.com.br
* Updated by: Jonas Johansson
* Website: https://www.jonasjohansson.se
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var DEFAULT_PATTERN = '{year}/{category}/{month}/{day}';

// Define arrays to group file extensions
var extensionGroups = [
  { extensions: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico', 'tiff', 'tif', 'raw', 'cr2', 'nef', 'heic', 'heif', 'avif', 'psd', 'ai', 'eps', 'xcf'], folder: 'image' },
  { extensions: ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'm4v', 'mpg', 'mpeg', '3gp', 'ts', 'vob'], folder: 'video' },
  { extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'aiff', 'alac', 'opus', 'mid', 'midi'], folder: 'audio' },
  { extensions: ['exe', 'dmg', 'app', 'pkg', 'msi', 'deb', 'rpm', 'appimage', 'snap', 'flatpak', 'apk', 'ipa'], folder: 'apps' },
  { extensions: ['doc', 'docx', 'pdf', 'txt', 'md', 'rtf', 'odt', 'pages', 'tex', 'epub', 'mobi', 'log'], folder: 'text' },
  { extensions: ['xls', 'xlsx', 'csv', 'ods', 'numbers', 'tsv'], folder: 'spreadsheet' },
  { extensions: ['ppt', 'pptx', 'odp', 'key'], folder: 'presentation' },
  { extensions: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'zst', 'tgz', 'tbz2', 'lz', 'cab', 'iso', 'img'], folder: 'archive' },
  { extensions: ['js', 'ts', 'jsx', 'tsx', 'py', 'rb', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'go', 'rs', 'swift', 'kt', 'php', 'sh', 'bash', 'zsh', 'ps1', 'bat', 'cmd', 'r', 'lua', 'pl', 'scala', 'dart', 'vue', 'svelte'], folder: 'code' },
  { extensions: ['html', 'htm', 'css', 'scss', 'sass', 'less', 'xml', 'json', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf', 'env', 'sql'], folder: 'web' },
  { extensions: ['ttf', 'otf', 'woff', 'woff2', 'eot', 'fon'], folder: 'font' },
  { extensions: ['obj', 'fbx', 'stl', 'blend', 'dae', '3ds', 'gltf', 'glb', 'usdz'], folder: 'model' },
  { extensions: ['torrent', 'magnet'], folder: 'torrent' },
  { extensions: ['dll', 'so', 'dylib', 'bin', 'dat', 'sys', 'drv'], folder: 'system' }
];

chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({
      filename: filename,
      conflictAction: conflictAction,
      conflict_action: conflictAction
    });
  }

  chrome.storage.sync.get({ pattern: DEFAULT_PATTERN }, function(data) {
    var d = new Date();
    var day = ('0' + d.getDate()).slice(-2);
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();

    var fileExtension = item.filename.split('.').pop().toLowerCase();
    var category = extensionGroups.find(group => group.extensions.includes(fileExtension))?.folder || 'other';

    var path = data.pattern
      .replace('{year}', year)
      .replace('{month}', month)
      .replace('{day}', day)
      .replace('{category}', category);

    suggest(path + '/' + item.filename, 'uniquify');
  });

  return true; // keep the suggest callback alive for async storage call
});
