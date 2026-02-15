var DEFAULT_PATTERN = '{year}/{category}/{month}/{day}';
var patternInput = document.getElementById('pattern');
var preview = document.getElementById('preview');
var saveBtn = document.getElementById('save');
var rulesContainer = document.getElementById('rules');
var addRuleBtn = document.getElementById('addRule');

function updatePreview() {
  var d = new Date();
  var example = patternInput.value
    .replace('{year}', d.getFullYear())
    .replace('{month}', ('0' + (d.getMonth() + 1)).slice(-2))
    .replace('{day}', ('0' + d.getDate()).slice(-2))
    .replace('{category}', 'image');
  preview.textContent = example + '/photo.jpg';
}

function addRuleRow(ext, folder) {
  var row = document.createElement('div');
  row.className = 'rule';
  row.innerHTML =
    '<input class="ext" type="text" placeholder="ext1, ext2, ..." value="' + (ext || '') + '" spellcheck="false">' +
    '<input class="folder" type="text" placeholder="folder" value="' + (folder || '') + '" spellcheck="false">' +
    '<button title="Remove">\u00d7</button>';
  row.querySelector('button').addEventListener('click', function() {
    row.remove();
  });
  rulesContainer.appendChild(row);
}

function getCustomRules() {
  var rules = [];
  rulesContainer.querySelectorAll('.rule').forEach(function(row) {
    var ext = row.querySelector('.ext').value.trim();
    var folder = row.querySelector('.folder').value.trim();
    if (ext && folder) {
      rules.push({ extensions: ext, folder: folder });
    }
  });
  return rules;
}

// Load saved settings
chrome.storage.sync.get({ pattern: DEFAULT_PATTERN, customRules: [] }, function(data) {
  patternInput.value = data.pattern;
  data.customRules.forEach(function(rule) {
    addRuleRow(rule.extensions, rule.folder);
  });
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

addRuleBtn.addEventListener('click', function() {
  addRuleRow('', '');
});

// Save
saveBtn.addEventListener('click', function() {
  chrome.storage.sync.set({
    pattern: patternInput.value,
    customRules: getCustomRules()
  }, function() {
    saveBtn.textContent = 'Saved!';
    saveBtn.classList.add('saved');
    setTimeout(function() {
      saveBtn.textContent = 'Save';
      saveBtn.classList.remove('saved');
    }, 1500);
  });
});
