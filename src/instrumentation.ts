/**
 * Next.js Instrumentation Hook
 * This runs ONCE when the server starts, BEFORE any modules are imported for request handling.
 * This is the ONLY reliable place to inject globalThis polyfills on Node.js server.
 *
 * @supabase/realtime-js throws "native WebSocket not found" on Node.js < 22.
 * EdgeOne Pages runs Node.js 20. This polyfill prevents that crash.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (typeof (globalThis as any).WebSocket === 'undefined') {
      (globalThis as any).WebSocket = class DummyWebSocket {
        static CONNECTING = 0;
        static OPEN = 1;
        static CLOSING = 2;
        static CLOSED = 3;
        readyState = 0;
        url = '';
        protocol = '';
        extensions = '';
        bufferedAmount = 0;
        binaryType = 'blob';
        onopen: any = null;
        onclose: any = null;
        onerror: any = null;
        onmessage: any = null;
        constructor(_url?: string, _protocols?: string | string[]) {}
        addEventListener() {}
        removeEventListener() {}
        dispatchEvent() { return false; }
        close() {}
        send() {}
      };
      console.log('[instrumentation] WebSocket polyfill injected for Node.js 20 compatibility.');
    }
  }
}
