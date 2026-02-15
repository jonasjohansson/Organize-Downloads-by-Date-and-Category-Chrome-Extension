var patternInput = document.getElementById('pattern');
var preview = document.getElementById('preview');
var saveBtn = document.getElementById('save');
var rulesContainer = document.getElementById('rules');
var addRuleBtn = document.getElementById('addRule');
var refToggle = document.getElementById('refToggle');
var refList = document.getElementById('refList');

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

// Built-in categories reference list
extensionGroups.forEach(function(group) {
  var item = document.createElement('div');
  item.className = 'ref-item';
  item.innerHTML = '<strong>' + group.folder + '</strong><br><span>' + group.extensions.join(', ') + '</span>';
  refList.appendChild(item);
});

refToggle.addEventListener('click', function() {
  var open = refList.style.display !== 'none';
  refList.style.display = open ? 'none' : 'block';
  refToggle.innerHTML = 'Built-in Categories <small>' + (open ? '&#9654;' : '&#9660;') + '</small>';
});

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
