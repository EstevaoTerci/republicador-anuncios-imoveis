// Helper de discovery: fala com o Chrome MCP Server (streamable-http) via JSON-RPC.
// Uso: node mcp.mjs '[{"method":"tools/list"},{"method":"tools/call","params":{"name":"chrome_navigate","arguments":{"url":"https://..."}}}]'
const ENDPOINT = process.env.MCP_URL || 'http://127.0.0.1:12306/mcp';
let sessionId = null;

function parseBody(ct, text) {
  const msgs = [];
  if ((ct || '').includes('text/event-stream')) {
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^data:\s?(.*)$/);
      if (m && m[1].trim()) { try { msgs.push(JSON.parse(m[1])); } catch {} }
    }
  } else if (text && text.trim()) {
    try { msgs.push(JSON.parse(text)); } catch {}
  }
  return msgs;
}

async function post(body) {
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream' };
  if (sessionId) headers['Mcp-Session-Id'] = sessionId;
  const res = await fetch(ENDPOINT, { method: 'POST', headers, body: JSON.stringify(body) });
  const sid = res.headers.get('mcp-session-id');
  if (sid) sessionId = sid;
  const ct = res.headers.get('content-type');
  const text = await res.text();
  return { status: res.status, msgs: parseBody(ct, text) };
}

(async () => {
  // 1) initialize
  await post({ jsonrpc: '2.0', id: 1, method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'claude-discovery', version: '1.0' } } });
  // 2) initialized notification
  await post({ jsonrpc: '2.0', method: 'notifications/initialized' });
  // 3) run requested calls
  const calls = JSON.parse(process.argv[2] || '[{"method":"tools/list"}]');
  let id = 2;
  const results = [];
  for (const c of calls) {
    const r = await post({ jsonrpc: '2.0', id: id++, method: c.method, params: c.params || {} });
    results.push(r.msgs.map(m => m.result ?? m.error ?? m));
  }
  console.log(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
})().catch(e => { console.error('ERR', e); process.exit(1); });
