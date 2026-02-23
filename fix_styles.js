const fs = require('fs');
let code = fs.readFileSync('src/app/jirai/page.tsx', 'utf8');

// 1. Gradients
code = code.replace(/className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink"/g, 'className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(to right, #00FFFF, #FF00FF)" }}');
code = code.replace(/className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600 opacity-50"/g, 'className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ background: "linear-gradient(to right, #1f2937, #4b5563)" }}');
code = code.replace(/className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink opacity-50"/g, 'className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ background: "linear-gradient(to right, #00FFFF, #FF00FF)" }}');

code = code.replace(/bg-gradient-to-r from-neon-pink\/20 to-purple-600\/20/g, 'bg-[#220022]'); // simplifications for buttons

// 2. Drop shadows
code = code.replace(/drop-shadow-\[([^\]]+)\]/g, (match, p1) => {
    // Convert e.g., 0_0_10px_#FF00FF to 0px 0px 10px #FF00FF
    let val = p1.replace(/_/g, ' ');
    if (val.includes('rgba')) val = val.replace(/ /g, '').replace(/rgba\(/, 'rgba( ').replace(/,/g, ', ').replace(/\)/, ' )');
    // It's inside a className string, we need to extract it into an inline style... but that's hard with regex.
    // Let's just remove them from className!
    return ""; 
});

// 3. Box shadows
code = code.replace(/shadow-\[([^\]]+)\]/g, "");

// Wait, if we remove drop-shadow and shadow strings, they won't render at all. Maybe we add them to globals.css as normal classes?
