var DEFAULT_PATTERN = '{year}/{category}/{month}/{day}';
var patternInput = document.getElementById('pattern');
var preview = document.getElementById('preview');
var saveBtn = document.getElementById('save');

function updatePreview() {
  var d = new Date();
  var example = patternInput.value
    .replace('{year}', d.getFullYear())
    .replace('{month}', ('0' + (d.getMonth() + 1)).slice(-2))
    .replace('{day}', ('0' + d.getDate()).slice(-2))
    .replace('{category}', 'image');
  preview.textContent = example + '/photo.jpg';
}

// Load saved pattern
chrome.storage.sync.get({ pattern: DEFAULT_PATTERN }, function(data) {
  patternInput.value = data.pattern;
  updatePreview();
});

patternInput.addEventListener('input', updatePreview);

// Preset buttons
document.querySelectorAll('.presets button').forEach(function(btn) {
  btn.addEventListener('click', function() {
    patternInput.value = btn.dataset.pattern;
    updatePreview();
  });
});

// Save
saveBtn.addEventListener('click', function() {
  chrome.storage.sync.set({ pattern: patternInput.value }, function() {
    saveBtn.textContent = 'Saved!';
    saveBtn.classList.add('saved');
    setTimeout(function() {
      saveBtn.textContent = 'Save';
      saveBtn.classList.remove('saved');
    }, 1500);
  });
});
