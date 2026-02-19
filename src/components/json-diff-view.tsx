import ReactDiffViewer from 'react-diff-viewer-continued'
import { Button } from 'components/ui/button'
import { Textarea } from 'components/ui/textarea'
import { Card, CardContent } from 'components/ui/card'

interface JSONDiffViewProperties {
  currentJson: string
}

export function JSONDiffView({ currentJson }: JSONDiffViewProperties) {
  const [leftJson, setLeftJson] = useState(currentJson)
  const [rightJson, setRightJson] = useState(currentJson)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex h-full flex-col gap-4 bg-background p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Compare JSON</h2>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'View Difference' : 'Edit Comparison'}
        </Button>
      </div>

      {isEditing ? (
        <div className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="px-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Original / Left
            </span>
            <Textarea
              className="flex-1 resize-none border-border bg-secondary/20 font-mono text-sm focus:ring-0"
              value={leftJson}
              onChange={(event) => setLeftJson(event.target.value)}
              placeholder="Paste original JSON here..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="px-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Modified / Right
            </span>
            <Textarea
              className="flex-1 resize-none border-border bg-secondary/20 font-mono text-sm focus:ring-0"
              value={rightJson}
              onChange={(event) => setRightJson(event.target.value)}
              placeholder="Paste modified JSON here..."
            />
          </div>
        </div>
      ) : (
        <Card className="flex-1 overflow-hidden rounded-md border-border bg-background shadow-none">
          <CardContent className="h-full overflow-auto p-0">
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
                  },
                },
                contentText: {
                  fontSize: '13px',
                  fontFamily: 'monospace',
                },
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
