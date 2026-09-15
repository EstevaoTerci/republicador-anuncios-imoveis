"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMcpServer = exports.createMcpServer = exports.mcpServer = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const register_tools_1 = require("./register-tools");
exports.mcpServer = null;
/**
 * Cria uma nova instancia de Server MCP. NAO singleton.
 *
 * Por que nao singleton: o MCP SDK Server.connect(transport) so pode ser
 * chamado UMA vez por instancia. Reusar singleton entre sessoes HTTP
 * Streamable causa "Already connected to a transport" no segundo cliente
 * que tenta initialize, mesmo apos o primeiro ter desconectado.
 *
 * Cada nova sessao HTTP deve criar seu proprio Server via createMcpServer().
 * Stdio mantem singleton (1 cliente unico) via getMcpServer() abaixo.
 */
const createMcpServer = () => {
    const server = new index_js_1.Server({
        name: 'ChromeMcpServer',
        version: '1.0.0',
    }, {
        capabilities: {
            tools: {},
        },
    });
    (0, register_tools_1.setupTools)(server);
    return server;
};
exports.createMcpServer = createMcpServer;
const getMcpServer = () => {
    if (exports.mcpServer) {
        return exports.mcpServer;
    }
    exports.mcpServer = (0, exports.createMcpServer)();
    return exports.mcpServer;
};
exports.getMcpServer = getMcpServer;
//# sourceMappingURL=mcp-server.js.map