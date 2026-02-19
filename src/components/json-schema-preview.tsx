import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import type { JSX } from 'react'

interface JSONObject {
  [key: string]: JSONValue
}

/* JSON SCHEMA TYPES (Draft-07 Compatible) */

interface BaseSchema {
  title?: string
  description?: string
}

interface StringSchema extends BaseSchema {
  type: 'string'
}

interface NumberSchema extends BaseSchema {
  type: 'number'
}

interface BooleanSchema extends BaseSchema {
  type: 'boolean'
}

interface NullSchema extends BaseSchema {
  type: 'null'
}

interface ObjectSchema extends BaseSchema {
  type: 'object'
  properties: Record<string, JSONSchema>
  required: string[]
  additionalProperties: false
}

interface ArraySchema extends BaseSchema {
  type: 'array'
  items: JSONSchema
}

interface UnionSchema extends BaseSchema {
  oneOf: JSONSchema[]
}

type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema
  | ObjectSchema
  | ArraySchema
  | UnionSchema

/* TYPE GUARDS */

function isObject(value: JSONValue): value is JSONObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isObjectSchema(schema: JSONSchema): schema is ObjectSchema {
  return 'type' in schema && schema.type === 'object'
}

function isArraySchema(schema: JSONSchema): schema is ArraySchema {
  return 'type' in schema && schema.type === 'array'
}

function isUnionSchema(schema: JSONSchema): schema is UnionSchema {
  return 'oneOf' in schema
}

/* PRIMITIVE INFERENCE */

function inferPrimitive(value: JSONPrimitive): JSONSchema {
  if (value === null) return { type: 'null' }

  switch (typeof value) {
    case 'string': {
      return { type: 'string' }
    }
    case 'number': {
      return { type: 'number' }
    }
    case 'boolean': {
      return { type: 'boolean' }
    }
    default: {
      throw new Error('Unsupported primitive')
    }
  }
}

/* MAIN INFERENCE */

function inferSchema(value: JSONValue): JSONSchema {
  if (Array.isArray(value)) return inferArray(value)
  if (isObject(value)) return inferObject(value)
  return inferPrimitive(value)
}

function inferArray(array: JSONValue[]): ArraySchema {
  if (array.length === 0) {
    return {
      type: 'array',
      items: { type: 'null' },
    }
  }

  let merged = inferSchema(array[0])

  for (let index = 1; index < array.length; index++) {
    const next = inferSchema(array[index])
    merged = mergeSchemas(merged, next)
  }

  return {
    type: 'array',
    items: merged,
  }
}

function inferObject(object: JSONObject): ObjectSchema {
  const properties: Record<string, JSONSchema> = {}

  for (const key of Object.keys(object)) {
    properties[key] = inferSchema(object[key])
  }

  return {
    type: 'object',
    properties,
    required: Object.keys(properties),
    additionalProperties: false,
  }
}

/* MERGE ENGINE (Associative + Idempotent) */

function mergeSchemas(a: JSONSchema, b: JSONSchema): JSONSchema {
  if (deepEqual(a, b)) return a

  if (isObjectSchema(a) && isObjectSchema(b)) {
    const keys = new Set([...Object.keys(a.properties), ...Object.keys(b.properties)])

    const properties: Record<string, JSONSchema> = {}
    const required: string[] = []

    for (const key of keys) {
      const aProperty = a.properties[key]
      const bProperty = b.properties[key]

      if (aProperty && bProperty) {
        properties[key] = mergeSchemas(aProperty, bProperty)

        if (a.required.includes(key) && b.required.includes(key)) {
          required.push(key)
        }
      } else {
        properties[key] = aProperty ?? bProperty!
      }
    }

    return {
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    }
  }

  if (isArraySchema(a) && isArraySchema(b)) {
    return {
      type: 'array',
      items: mergeSchemas(a.items, b.items),
    }
  }

  if ('type' in a && 'type' in b && a.type === b.type) {
    return a
  }

  return normalizeUnion(a, b)
}

/* UNION NORMALIZATION */

function normalizeUnion(a: JSONSchema, b: JSONSchema): UnionSchema {
  const flatten = (schema: JSONSchema): JSONSchema[] =>
    isUnionSchema(schema) ? schema.oneOf : [schema]

  const variants = [...flatten(a), ...flatten(b)]

  const unique: JSONSchema[] = []

  for (const variant of variants) {
    const exists = unique.some((s) => deepEqual(s, variant))
    if (!exists) unique.push(variant)
  }

  return { oneOf: unique }
}

/* STRUCTURAL EQUALITY (Simple Deep Equal) */

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

/* =========================================
   REACT PREVIEW COMPONENT
========================================= */

interface JSONSchemaPreviewProperties {
  data: JSONValue
}

export function JSONSchemaPreview({ data }: JSONSchemaPreviewProperties) {
  const schema = useMemo(() => {
    if (!data) return null
    return inferSchema(data)
  }, [data])

  function renderNode(node: JSONSchema, name?: string): JSX.Element {
    const label = 'type' in node ? node.type : 'oneOf'

    return (
      <div className="ml-4 space-y-2 border-l border-border/50 py-2 pl-4">
        <div className="flex items-center gap-2">
          {name && <span className="font-mono text-sm text-foreground/80">{name}:</span>}
          <Badge className="text-[10px] uppercase">
            {Array.isArray(label) ? label.join(' | ') : label}
          </Badge>
        </div>

        {isObjectSchema(node) && (
          <div className="space-y-1">
            {Object.entries(node.properties).map(([key, value]) => (
              <div key={key}>{renderNode(value, key)}</div>
            ))}
          </div>
        )}

        {isArraySchema(node) && (
          <div>
            <span className="ml-4 text-xs text-muted-foreground italic">items:</span>
            {renderNode(node.items)}
          </div>
        )}

        {isUnionSchema(node) && (
          <div className="space-y-2">
            {node.oneOf.map((variant, index) => (
              <div key={index}>{renderNode(variant)}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!schema) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No valid JSON data to infer schema from.
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6">
      <Card className="border-border bg-secondary/10 shadow-none">
        <CardHeader className="border-b border-border/50 px-6 py-4">
          <CardTitle>Inferred Schema</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="-ml-4">{renderNode(schema)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
