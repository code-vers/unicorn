const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/(auth)/forgot-password/page.tsx',
  'app/(auth)/login/page.tsx',
  'app/(auth)/register/page.tsx',
  'app/product-details/page.tsx',
  'app/product/page.tsx',
  'components/dashboard/admin/CustomersTable.tsx',
  'components/dashboard/admin/DriverModal.tsx',
  'components/dashboard/admin/DriversTable.tsx',
  'components/dashboard/admin/DropOffTable.tsx',
  'components/dashboard/admin/LocationsTable.tsx',
  'components/dashboard/admin/PricingForm.tsx',
  'components/dashboard/admin/SettingsForm.tsx',
  'components/dashboard/admin/VehicleModal.tsx',
  'components/dashboard/admin/VehiclesTable.tsx',
  'components/dashboard/client/ClientProfile.tsx',
  'components/home/AvailableVehiclesSection.tsx',
  'components/product/CarResultCard.tsx',
  'components/product/DriverDetailsForm.tsx'
];

const basePath = '/Users/khalid/Desktop/FB International/Projects/unicorn';

function fixFile(filePath) {
  const fullPath = path.join(basePath, filePath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Add import if not present and we need it
  const importStatement = `import { Spinner } from '@/components/ui/Spinner';\n`;
  if (!content.includes('import { Spinner }')) {
    // find last import and insert after it
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

  // Replacements
  
  // 1. Full page loaders (Suspense fallbacks)
  content = content.replace(
    /<div className="flex items-center justify-center min-h-\[calc\(100vh-200px\)\] bg-\[#F5F5F5\] w-full"><div className="w-10 h-10 border-4 border-\[#43A047\] border-t-transparent rounded-full animate-spin" \/><\/div>/g,
    `<Spinner size="lg" fullScreen className="bg-[#F5F5F5]" />`
  );
  content = content.replace(
    /<div className="flex items-center justify-center min-h-\[calc\(100vh-200px\)\] bg-white w-full"><div className="w-10 h-10 border-4 border-\[#43A047\] border-t-transparent rounded-full animate-spin" \/><\/div>/g,
    `<Spinner size="lg" fullScreen className="bg-white" />`
  );

  // 2. Medium div loaders centered in table/sections
  content = content.replace(
    /<div className='w-8 h-8 border-4 border-\[#3FA34D\] border-t-transparent rounded-full animate-spin'><\/div>/g,
    `<Spinner size="md" />`
  );
  content = content.replace(
    /<div className="w-8 h-8 border-4 border-\[#3FA34D\] border-t-transparent rounded-full animate-spin"><\/div>/g,
    `<Spinner size="md" />`
  );
  content = content.replace(
    /<div className="w-8 h-8 border-4 border-\[#3FA344\] border-t-transparent rounded-full animate-spin"><\/div>/g,
    `<Spinner size="md" />`
  );
  content = content.replace(
    /<div className="w-8 h-8 border-4 border-\[#3FA34D\] border-t-transparent rounded-full animate-spin" \/>/g,
    `<Spinner size="md" />`
  );
  content = content.replace(
    /<div className="w-10 h-10 border-4 border-\[#43A047\] border-t-transparent rounded-full animate-spin" \/>/g,
    `<Spinner size="lg" />`
  );

  // 3. Small inline white loaders (buttons)
  content = content.replace(
    /<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"><\/div>/g,
    `<Spinner size="sm" variant="white" />`
  );
  content = content.replace(
    /<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" \/>/g,
    `<Spinner size="sm" variant="white" />`
  );

  // 4. Loader2 icon replacements (assuming they were imported from lucide-react)
  content = content.replace(
    /<Loader2 className="w-5 h-5 animate-spin" \/>/g,
    `<Spinner size="sm" variant="white" />`
  );
  content = content.replace(
    /<Loader2 size=\{16\} className="animate-spin" \/>/g,
    `<Spinner size="sm" variant="primary" />`
  );
  content = content.replace(
    /<Loader2 className='animate-spin text-\[#3FA34D\] mx-auto' size=\{28\} \/>/g,
    `<Spinner size="md" centered />`
  );
  content = content.replace(
    /<Loader2 className="animate-spin text-\[#3FA34D\]" size=\{32\} \/>/g,
    `<Spinner size="md" />`
  );

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

filesToUpdate.forEach(fixFile);
