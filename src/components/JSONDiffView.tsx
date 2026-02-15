import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface JSONDiffViewProps {
  currentJson: string;
}

export function JSONDiffView({ currentJson }: JSONDiffViewProps) {
  const [leftJson, setLeftJson] = useState(currentJson);
  const [rightJson, setRightJson] = useState(currentJson);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background gap-4 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold tracking-tight">Compare JSON</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "View Difference" : "Edit Comparison"}
        </Button>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-2">Original / Left</span>
            <Textarea 
              className="flex-1 font-mono text-sm resize-none bg-secondary/20 border-border focus:ring-0" 
              value={leftJson}
              onChange={(e) => setLeftJson(e.target.value)}
              placeholder="Paste original JSON here..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-2">Modified / Right</span>
            <Textarea 
              className="flex-1 font-mono text-sm resize-none bg-secondary/20 border-border focus:ring-0" 
              value={rightJson}
              onChange={(e) => setRightJson(e.target.value)}
              placeholder="Paste modified JSON here..."
            />
          </div>
        </div>
      ) : (
        <Card className="flex-1 overflow-hidden border-border bg-background shadow-none rounded-md">
          <CardContent className="p-0 h-full overflow-auto custom-scrollbar">
            <ReactDiffViewer
              oldValue={leftJson}
              newValue={rightJson}
              splitView={true}
              useDarkTheme={true}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: 'transparent',
                    diffViewerColor: '#fff',
                    addedBackground: 'rgba(45, 136, 45, 0.15)',
                    addedColor: '#acf2bd',
                    removedBackground: 'rgba(233, 73, 73, 0.15)',
                    removedColor: '#ffd8d8',
                    wordAddedBackground: 'rgba(45, 136, 45, 0.35)',
                    wordRemovedBackground: 'rgba(233, 73, 73, 0.35)',
                    emptyLineBackground: 'transparent',
                    gutterBackground: 'rgba(255, 255, 255, 0.05)',
                    gutterColor: '#888',
                    diffViewerTitleBackground: 'rgba(255, 255, 255, 0.05)',
                    diffViewerTitleColor: '#ccc',
                  }
                },
                contentText: {
                  fontSize: '13px',
                  fontFamily: 'monospace',
                }
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
