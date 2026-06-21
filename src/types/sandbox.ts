export interface SandboxMessage {
  type: 'SUCCESS' | 'ERROR' | 'LOG' | 'WARN';
  data: string;
}
