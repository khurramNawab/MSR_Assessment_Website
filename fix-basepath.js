const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Replace /msrassessment/ with /
            content = content.replace(/\/msrassessment\//g, '/');
            // Also fix the full URL if it exists
            content = content.replace(/https:\/\/msrassessment\.com\/msrassessment\//g, 'https://msrassessment.com/');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'src'));
