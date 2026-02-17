"use client"

import { useState } from "react"
import Link from "next/link"
import type { Value } from "platejs"
import { TextAlignPlugin } from "@platejs/basic-styles/react"
import { FontSizePlugin } from "@platejs/basic-styles/react"
import { IndentPlugin } from "@platejs/indent/react"
import { Plate, usePlateEditor } from "platejs/react"
import { Editor, EditorContainer } from "@/components/ui/editor"
import { FixedToolbar } from "@/components/ui/fixed-toolbar"
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button"
import { AlignToolbarButton } from "@/components/ui/align-toolbar-button"
import { FontSizeToolbarButton } from "@/components/ui/font-size-toolbar-button"
import { IndentToolbarButton, OutdentToolbarButton } from "@/components/ui/indent-toolbar-button"
import { ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { BasicNodesKit } from "@/components/basic-nodes-kit"

const initialValue: Value = [
    {
        type: "p",
        children: [
            {
                text: "Terms and Conditions content placeholder. Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis.",
            },
        ],
    },
]

export default function TermsConditionsPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const editor = usePlateEditor({
        plugins: [
            ...BasicNodesKit,
            TextAlignPlugin.configure({
                inject: {
                    targetPlugins: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
                },
            }),
            FontSizePlugin,
            IndentPlugin.configure({
                inject: {
                    targetPlugins: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
                },
            }),
        ],
        value: initialValue,
    })

    const handleSave = async () => {
        setIsLoading(true)
        const content = editor.children
        // TODO: Replace with actual API call
        // await api.put('/settings/terms-conditions', { content })
        console.log("Saving content:", JSON.stringify(content))
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsEditing(false)
        toast.success("Terms & Conditions updated successfully")
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/settings" className="hover:bg-muted p-2 rounded-full transition-colors group">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Terms & Condition</h1>
                </div>
            </div>

            {/* Editor Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                <Plate editor={editor}>
                    {/* Toolbar - show only when editing */}
                    {isEditing && (
                        <FixedToolbar className="justify-end gap-1 rounded-t-xl border-b border-border/40 bg-white px-4">
                            <ToolbarButton tooltip="Insert Image">
                                <ImageIcon className="size-4" />
                            </ToolbarButton>

                            <ToolbarSeparator />

                            <FontSizeToolbarButton />

                            <ToolbarSeparator />

                            <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
                                <span className="font-bold text-sm">B</span>
                            </MarkToolbarButton>
                            <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
                                <span className="italic text-sm">I</span>
                            </MarkToolbarButton>
                            <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
                                <span className="underline text-sm">U</span>
                            </MarkToolbarButton>

                            <ToolbarSeparator />

                            <AlignToolbarButton />

                            <ToolbarSeparator />

                            <IndentToolbarButton />
                            <OutdentToolbarButton />
                        </FixedToolbar>
                    )}

                    {/* Editor Content */}
                    <EditorContainer className="min-h-125">
                        <Editor
                            placeholder="Write your Terms and Conditions content here..."
                            readOnly={!isEditing}
                            className="px-8 py-6 text-base leading-relaxed"
                        />
                    </EditorContainer>
                </Plate>
            </div>

            {/* Action Button */}
            <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
            >
                {isLoading ? "Saving..." : isEditing ? "Save" : "Edit"}
            </Button>
        </div>
    )
}
