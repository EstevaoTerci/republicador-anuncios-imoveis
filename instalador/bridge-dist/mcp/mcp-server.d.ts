import { Server } from '@modelcontextprotocol/sdk/server/index.js';
export declare let mcpServer: Server | null;
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
export declare const createMcpServer: () => Server;
export declare const getMcpServer: () => Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
        progressToken?: string | number | undefined;
        "io.modelcontextprotocol/related-task"?: {
            taskId: string;
        } | undefined;
    } | undefined;
}>;
