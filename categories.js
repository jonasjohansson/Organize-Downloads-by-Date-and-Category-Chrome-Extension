var DEFAULT_PATTERN = '{year}/{category}/{month}/{day}';

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
