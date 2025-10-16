// sysMonitor.js
const os = require("os");
const readline = require("readline");

function formatBytes(bytes) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function getCpuLoad() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach(cpu => {
    for (const type in cpu.times) totalTick += cpu.times[type];
    totalIdle += cpu.times.idle;
  });

  return 1 - totalIdle / totalTick;
}

function renderStats() {
  const freeMem = formatBytes(os.freemem());
  const totalMem = formatBytes(os.totalmem());
  const usedMem = os.totalmem() - os.freemem();
  const cpuLoad = (getCpuLoad() * 100).toFixed(2);
  const uptime = (os.uptime() / 60).toFixed(1);

  console.clear();
  console.log("🖥️  System Resource Monitor (Node.js)");
  console.log("====================================");
  console.log(`🧠 Memory: ${formatBytes(usedMem)} / ${totalMem}`);
  console.log(`⚙️  CPU Load: ${cpuLoad}%`);
  console.log(`⏱️  Uptime: ${uptime} minutes`);
  console.log(`💻 Platform: ${os.platform()} (${os.arch()})`);
  console.log(`📦 Node Version: ${process.version}`);
  console.log("====================================");
  console.log("Press Ctrl+C to exit.");
}

setInterval(renderStats, 2000);
renderStats();
