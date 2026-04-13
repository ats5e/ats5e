import { spawn } from "node:child_process";
import readline from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const processConfigs = [
  {
    name: "web",
    color: "\u001b[36m",
    command: npmCommand,
    args: ["run", "dev:web"],
    cwd: repoRoot,
  },
  {
    name: "api",
    color: "\u001b[35m",
    command: npmCommand,
    args: ["run", "dev:backend"],
    cwd: repoRoot,
  },
];

const children = [];
let shuttingDown = false;

function forwardOutput(stream, label, color, destination) {
  if (!stream) return;

  const interfaceHandle = readline.createInterface({ input: stream });
  interfaceHandle.on("line", (line) => {
    destination.write(`${color}[${label}]\u001b[0m ${line}\n`);
  });
}

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) {
        child.kill("SIGKILL");
      }
    }
    process.exit(exitCode);
  }, 2000).unref();
}

for (const config of processConfigs) {
  const child = spawn(config.command, config.args, {
    cwd: config.cwd,
    env: { ...process.env, FORCE_COLOR: "1" },
    stdio: ["inherit", "pipe", "pipe"],
  });

  children.push(child);
  forwardOutput(child.stdout, config.name, config.color, process.stdout);
  forwardOutput(child.stderr, config.name, config.color, process.stderr);

  child.on("exit", (code) => {
    if (shuttingDown) return;
    shutdown(code ?? 0);
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
