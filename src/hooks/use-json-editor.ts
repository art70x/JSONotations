import { useState, useCallback, useEffect, useMemo } from 'react';

export interface JSONError {
  message: string;
  line?: number;
}

export function useJSONEditor(initialValue: string = JSON.stringify({
  "project": "JSONotations",
  "version": "1.0.0",
  "status": "Production Ready",
  "metadata": {
    "author": "Nexus JSON Labs",
    "license": "MIT",
    "repository": "https://github.com/nexus-labs/jsonotations"
  },
  "features": [
    {
      "id": 1,
      "name": "Live Tree View",
      "complexity": "O(n)",
      "interactive": true
    },
    {
      "id": 2,
      "name": "Schema Inference",
      "type": "Automatic",
      "reliable": true
    },
    {
      "id": 3,
      "name": "Visual Diff",
      "precision": "High",
      "side_by_side": true
    },
    {
      "id": 4,
      "name": "Spreadsheet View",
      "supports_sorting": true,
      "exportable": true
    }
  ],
  "statistics": {
    "latency": "0ms",
    "privacy": "100%",
    "developers_loved": 9999
  }
}, null, 2)) {
  const [jsonString, setJsonString] = useState(initialValue);
  const [error, setError] = useState<JSONError | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonString);
      setParsedData(parsed);
      setError(null);
      // Auto-save to local storage
      localStorage.setItem('json-editor-content', jsonString);
    } catch (e: any) {
      setError({ message: e.message });
      setParsedData(null);
    }
  }, [jsonString]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('json-editor-content');
    if (saved) {
      setJsonString(saved);
    }
  }, []);

  const formatJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonString);
      setJsonString(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // Keep as is if invalid
    }
  }, [jsonString]);

  const minifyJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonString);
      setJsonString(JSON.stringify(parsed));
    } catch (e) {
      // Keep as is if invalid
    }
  }, [jsonString]);

  return {
    jsonString,
    setJsonString,
    parsedData,
    error,
    formatJSON,
    minifyJSON,
  };
}
