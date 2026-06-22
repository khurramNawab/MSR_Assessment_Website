const fs = require('fs');
const file = 'src/components/ServiceDetail.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/maxHeight: isOpen \? '300px' : '0'/g, "maxHeight: isOpen ? '1500px' : '0'");
fs.writeFileSync(file, content);
