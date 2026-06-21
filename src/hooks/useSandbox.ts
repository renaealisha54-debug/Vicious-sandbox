import { useState, useCallback, useRef, MutableRefObject } from 'react';
import { SandboxMessage } from '../types/sandbox';
import { WebViewSandboxRef } from '../components/WebViewSandbox';

export type SandboxStatus = 'idle' | 'running' | 'error' | 'success';

export type LogEntry = {
  type: 'LOG' | 'WARN' | 'ERROR' | 'SUCCESS';
  data: string;
};

export type SandboxState = {
  output: LogEntry[];
  status: SandboxStatus;
};

export const useSandbox = () => {
  const [state, setState] = useState<SandboxState>({
    output: [],
    status: 'idle',
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runCode = useCallback((sandboxRef: MutableRefObject<WebViewSandboxRef | null>, code: string) => {
    setState({ output: [], status: 'running' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sandboxRef.current?.reset();
      setState(prev => ({
        output: [
          ...prev.output,
          { type: 'ERROR', data: 'Execution timed out after 10 seconds. Sandbox was reset.' },
        ],
        status: 'error',
      }));
    }, 10000);

    sandboxRef.current?.runCode(code);
  }, []);

  const handleMessage = useCallback((message: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const parsed: SandboxMessage = JSON.parse(message);
      setState(prev => ({
        output: [...prev.output, { type: parsed.type, data: parsed.data }],
        status: parsed.type === 'ERROR' ? 'error' : 'success',
      }));
    } catch {
      setState(prev => ({
        output: [
          ...prev.output,
          { type: 'ERROR', data: 'Failed to parse output.' },
        ],
        status: 'error',
      }));
    }
  }, []);

  const clearOutput = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({ output: [], status: 'idle' });
  }, []);

  return { state, runCode, handleMessage, clearOutput };
};
