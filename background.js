chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  var ext = item.filename.split('.').pop().toLowerCase();
  var folder = ext || 'other';
  var year = new Date().getFullYear();
  __suggest({
    filename: year + '/' + folder + '/' + item.filename,
    conflictAction: 'uniquify',
    conflict_action: 'uniquify'
  });
  return true;
});
