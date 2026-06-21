import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SandboxStatus, LogEntry } from '../hooks/useSandbox';

interface OutputPanelProps {
  logs: LogEntry[];
  status: SandboxStatus;
}

const LOG_COLORS: Record<LogEntry['type'], string> = {
  LOG:     '#cdd6f4',  // white — normal output
  SUCCESS: '#a6e3a1',  // green — return value
  WARN:    '#f9e2af',  // yellow — warnings
  ERROR:   '#f38ba8',  // red — errors
};

const LOG_PREFIXES: Record<LogEntry['type'], string> = {
  LOG:     '> ',
  SUCCESS: '→ ',
  WARN:    '⚠ ',
  ERROR:   '✖ ',
};

const getStatusColor = (status: SandboxStatus) => {
  if (status === 'error')   return '#f38ba8';
  if (status === 'success') return '#a6e3a1';
  if (status === 'running') return '#f9e2af';
  return '#585b70';
};

export const OutputPanel = ({ logs, status }: OutputPanelProps) => {
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new logs come in
  useEffect(() => {
    if (logs.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [logs]);

  const statusColor = getStatusColor(status);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Output</Text>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {status.toUpperCase()}
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {logs.length === 0 ? (
          <Text style={styles.placeholder}>Run code to see output...</Text>
        ) : (
          logs.map((entry, index) => (
            <Text
              key={index}
              style={[styles.logLine, { color: LOG_COLORS[entry.type] }]}
            >
              {LOG_PREFIXES[entry.type]}{entry.data}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    borderTopWidth: 1,
    borderTopColor: '#313244',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#181825',
    borderBottomWidth: 1,
    borderBottomColor: '#313244',
  },
  headerText: {
    color: '#cdd6f4',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  placeholder: {
    color: '#585b70',
    fontFamily: 'monospace',
    fontSize: 13,
    fontStyle: 'italic',
  },
  logLine: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
  },
});
