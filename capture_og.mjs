import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWsUrl(port = 9222) {
  for (let i = 0; i < 25; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const pages = await res.json();
        if (pages.length > 0 && pages[0].webSocketDebuggerUrl) {
          return pages[0].webSocketDebuggerUrl;
        }
      }
    } catch (e) {}
    await sleep(250);
  }
  throw new Error('Could not connect to Chrome debugging target');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const cb = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) cb.reject(msg.error);
        else cb.resolve(msg.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise(resolve => { this.ws.onopen = resolve; });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log('Capturing og-image.png at 1200x630...');
  const htmlPath = path.resolve('generate_og.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1200,630',
    'about:blank'
  ]);

  try {
    const wsUrl = await getWsUrl(9222);
    const client = new CDPClient(wsUrl);
    await client.ready();

    await client.send('Page.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1200,
      height: 630,
      deviceScaleFactor: 1,
      mobile: false
    });

    await client.send('Page.navigate', { url: fileUrl });
    await sleep(1500);

    // Ensure web fonts are completely loaded
    await client.send('Runtime.evaluate', {
      expression: 'document.fonts.ready',
      awaitPromise: true
    });
    await sleep(500);

    const screenshot = await client.send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630,
        scale: 1
      }
    });

    const buffer = Buffer.from(screenshot.data, 'base64');
    const outPath = path.resolve('public/og-image.png');
    fs.writeFileSync(outPath, buffer);

    const stats = fs.statSync(outPath);
    console.log(`Saved public/og-image.png (${(stats.size / 1024).toFixed(1)} KB)`);

    client.close();
    chrome.kill();
  } catch (err) {
    console.error('Capture error:', err);
    chrome.kill();
    process.exit(1);
  }
}

main();
