const { exec } = require('child_process');
const os = require('os');

// Obtener la IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const results = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // Priorizar IPs de redes locales comunes (192.168.x.x)
        if (iface.address.startsWith('192.168.')) {
          results.push({ name, address: iface.address, priority: 1 });
        } else if (!name.toLowerCase().includes('vethernet') &&
                   !name.toLowerCase().includes('vmware') &&
                   !name.toLowerCase().includes('virtualbox') &&
                   !name.toLowerCase().includes('docker') &&
                   !name.toLowerCase().includes('wsl')) {
          results.push({ name, address: iface.address, priority: 2 });
        }
      }
    }
  }
  
  // Si no hay resultados, buscar cualquier IP que no sea localhost
  if (results.length === 0) {
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          results.push({ name, address: iface.address });
        }
      }
    }
  }
  
  // Ordenar por prioridad y buscar la mejor opción
  results.sort((a, b) => (a.priority || 999) - (b.priority || 999));
  
  // Priorizar IPs 192.168.x.x
  const localNetwork = results.find(r => r.address.startsWith('192.168.'));
  if (localNetwork) return localNetwork.address;
  
  // Si no, buscar WiFi o Ethernet
  const preferred = results.find(r => 
    r.name.toLowerCase().includes('wi-fi') || 
    r.name.toLowerCase().includes('wifi') ||
    r.name.toLowerCase().includes('ethernet') ||
    r.name.toLowerCase().includes('eth')
  );
  
  return preferred ? preferred.address : (results[0]?.address || 'localhost');
}

const localIP = getLocalIP();
const port = process.env.PORT || 3000;

console.log('\n🚀 Iniciando servidor de desarrollo...\n');
console.log(`📱 Para acceder desde tu teléfono:`);
console.log(`   http://${localIP}:${port}`);
console.log(`\n💻 Acceso local:`);
console.log(`   http://localhost:${port}\n`);

// Ejecutar next dev
const child = exec('next dev --turbopack -H 0.0.0.0', (error) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
});

// Pasar la salida del comando
child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});