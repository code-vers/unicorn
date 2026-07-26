const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/checkout/success/page.tsx',
  'app/(auth)/verify-reset/page.tsx',
  'app/(auth)/reset-password/page.tsx',
  'components/dashboard/admin/BookingsTable.tsx',
  'components/dashboard/admin/DropOffChargeModal.tsx'
];

const basePath = '/Users/khalid/Desktop/FB International/Projects/unicorn';

function fixFile(filePath) {
  const fullPath = path.join(basePath, filePath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Add import if not present
  const importStatement = `import { Spinner } from '@/components/ui/Spinner';\n`;
  if (!content.includes('import { Spinner }')) {
    const importRegex = /^import\s+.*from\s+['"].*['"];?$/gm;
    let match;
    let lastIndex = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex > 0) {
      content = content.slice(0, lastIndex) + '\n' + importStatement + content.slice(lastIndex);
    } else {
      content = importStatement + content;
    }
  }

  // Suspense fallbacks
  content = content.replace(
    /<div className="w-full max-w-\[700px\] h-\[400px\] flex items-center justify-center">Loading...<\/div>/g,
    `<Spinner size="lg" centered className="h-[400px]" />`
  );
  content = content.replace(
    /<div className="text-center py-10">Loading...<\/div>/g,
    `<Spinner size="md" centered />`
  );

  // BookingsTable
  content = content.replace(
    /return <div className="p-8 text-center text-gray-500">Loading bookings...<\/div>;/g,
    `return <Spinner size="md" centered />;`
  );

  // DropOffChargeModal
  content = content.replace(
    /<p className="text-\[12px\] text-gray-400 font-lato text-center py-2">Loading locations & vehicles...<\/p>/g,
    `<Spinner size="sm" centered />`
  );

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

filesToUpdate.forEach(fixFile);
