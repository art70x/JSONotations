import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JSONSchemaPreviewProps {
  data: any;
}

export function JSONSchemaPreview({ data }: JSONSchemaPreviewProps) {
  const inferSchema = (val: any): any => {
    const type = Array.isArray(val) ? 'array' : typeof val;
    if (val === null) return { type: 'null' };
    if (type === 'object') {
      if (Array.isArray(val)) {
        return {
          type: 'array',
          items: val.length > 0 ? inferSchema(val[0]) : { type: 'any' }
        };
      } else {
        const properties: any = {};
        Object.entries(val).forEach(([key, v]) => {
          properties[key] = inferSchema(v);
        });
        return {
          type: 'object',
          properties
        };
      }
    }
    return { type };
  };

  const schema = useMemo(() => {
    if (!data) return null;
    return inferSchema(data);
  }, [data]);

  const renderSchemaNode = (node: any, name?: string) => {
    if (!node) return null;

    return (
      <div className="ml-4 border-l border-border/50 pl-4 py-2 space-y-2">
        <div className="flex items-center gap-2">
          {name && <span className="font-mono text-sm text-foreground/80">{name}:</span>}
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider h-5 font-bold">
            {node.type}
          </Badge>
        </div>
        {node.type === 'object' && node.properties && (
          <div className="space-y-1">
            {Object.entries(node.properties).map(([key, value]) => (
              <div key={key}>{renderSchemaNode(value, key)}</div>
            ))}
          </div>
        )}
        {node.type === 'array' && node.items && (
          <div>
            <span className="text-xs text-muted-foreground italic ml-4">items:</span>
            {renderSchemaNode(node.items)}
          </div>
        )}
      </div>
    );
  };

  if (!schema) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No valid JSON data to infer schema from.
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto custom-scrollbar">
      <Card className="bg-secondary/10 border-border shadow-none">
        <CardHeader className="border-b border-border/50 py-4 px-6">
          <CardTitle className="text-lg font-medium tracking-tight">Inferred Schema</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="-ml-4">
            {renderSchemaNode(schema)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
