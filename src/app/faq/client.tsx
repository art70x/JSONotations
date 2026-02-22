'use client'

import { Icon } from '@iconify/react'
import { Sidebar } from 'components/sidebar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion'
import { motion } from 'framer-motion'

export const FAQPageClient = () => {
  const faqs = [
    {
      category: 'General & Editor',
      questions: [
        {
          q: 'Is my JSON data sent to a server?',
          a: 'No. JSONotations is a client-side application. All processing, formatting, and validation happen entirely within your browser. We do not store or transmit your data to any external server.',
        },
        {
          q: 'What keyboard shortcuts are available?',
          a: 'You can use Alt + 1-5 to switch tabs, Shift + Alt + F to format your JSON, and Ctrl + S to download the current file. These shortcuts help you work faster without leaving the keyboard.',
        },
        {
          q: 'Does the editor support drag-and-drop?',
          a: 'Yes! You can drag any .json file from your local system and drop it directly onto the editor window to upload and parse it immediately.',
        },
      ],
    },
    {
      category: 'Tree View',
      questions: [
        {
          q: 'How do I expand or collapse nodes in Tree View?',
          a: 'Click on the arrows next to object or array keys to toggle individual nodes. The Tree View is designed for easy navigation of deeply nested structures.',
        },
        {
          q: 'Can I search for specific keys within the Tree View?',
          a: 'Yes, you can use the global search bar at the top. It will filter the Tree View in real-time to show only matching keys and their parent paths.',
        },
        {
          q: 'Is it possible to copy individual values from the Tree View?',
          a: 'Currently, you can view values directly. For full manipulation, we recommend using the main Editor tab, which syncs instantly with the Tree View.',
        },
      ],
    },
    {
      category: 'Table View',
      questions: [
        {
          q: 'Why is my Table View empty or showing an error?',
          a: 'The Table View requires a specific data structure: an array of objects. For example, [{"id": 1}, {"id": 2}]. If your JSON is just a single object or a simple array of strings, it cannot be rendered as a table.',
        },
        {
          q: 'How do I export my data from the Table View?',
          a: "Click on the 'Export Options' button in the Table View tab. You can download your data as a CSV for spreadsheets or a PDF for documentation.",
        },
        {
          q: 'Can I customize the columns in the Table View?',
          a: 'The table automatically detects all unique keys across all objects in your array and uses them as columns. This ensures you see all available data without manual configuration.',
        },
      ],
    },
    {
      category: 'Compare (Diff) View',
      questions: [
        {
          q: 'How does the Side-by-Side comparison work?',
          a: 'The Compare tab provides two panels. Paste your original JSON on the left and the modified version on the right. The tool will highlight additions in green and deletions in red.',
        },
        {
          q: 'Can I edit JSON while in Diff mode?',
          a: 'The Diff view is primarily for visualization. We suggest making edits in the main Editor tab and then returning to Compare to see the resulting differences.',
        },
        {
          q: 'What happens if the JSON is invalid in the Compare tab?',
          a: 'The diff engine requires valid JSON to calculate differences. If the input is invalid, you will see an error message indicating where the syntax needs to be fixed.',
        },
      ],
    },
    {
      category: 'Schema Preview',
      questions: [
        {
          q: 'What exactly is Schema Inference?',
          a: "Schema Inference analyzes your data structure to generate a visual map of types (e.g., 'number', 'string', 'boolean'). It helps you understand the 'shape' of your data without looking at the raw values.",
        },
        {
          q: 'Can I use the inferred schema for validation?',
          a: 'The current version provides a visual preview. Future updates will allow you to export this as a formal JSON Schema for use in other validation tools.',
        },
        {
          q: 'Does it support complex nested structures?',
          a: 'Yes, the schema tool traverses your entire JSON object, no matter how deep, to extract the type of every property and element in the hierarchy.',
        },
      ],
    },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar activeTab="help" setActiveTab={() => {}} />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-auto bg-background shadow-inner">
        <div className="pointer-events-none absolute top-0 left-0 h-96 w-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-full bg-blue-500/5 blur-[120px]" />
        <div className="relative z-10 mx-auto w-full max-w-4xl space-y-16 p-8 py-24">
          <header className="space-y-6 text-center">
            <div className="flex size-8 items-center justify-center rounded-lg shadow-lg shadow-primary/30 transition-transform primary-gradient group-hover:scale-105">
              <Icon icon="hugeicons:message-question" className="size-8 text-foreground" />
            </div>
            <h1 className="bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-5xl font-black tracking-tighter text-transparent md:text-7xl">
              Help & <br />
              Questions.
            </h1>
            <p className="mx-auto max-w-lg text-lg/relaxed font-medium text-muted-foreground">
              Everything you need to know about the professional JSON workspace.
            </p>
          </header>

          <div className="space-y-12 pt-8">
            {faqs.map((section, sIndex) => (
              <motion.section
                key={sIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sIndex * 0.1 }}
                className="space-y-6"
              >
                <h2 className="border-b border-border pb-2 text-2xl font-bold text-primary">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${sIndex}-${index}`}
                      className="rounded-xl border border-border bg-secondary/5 px-6"
                    >
                      <AccordionTrigger className="py-6 text-left text-lg font-medium hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-base/relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
