"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Value } from "platejs"
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from "@platejs/basic-nodes/react"
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
import { EditorContentSkeleton } from "@/components/settings/editor-content-skeleton"

const initialContent: Value = [
    {
        type: "p",
        children: [
            {
                text: "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.",
            },
        ],
    },
    {
        type: "p",
        children: [{ text: "" }],
    },
    {
        type: "p",
        children: [
            {
                text: "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.",
            },
        ],
    },
]

export default function AboutUsPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [value, setValue] = useState<Value>(initialContent)

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
        value: value,
    })

    // Simulate fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            // In a real app, you'd fetch "value" here
            setIsLoading(false)
        }, 1200)
        return () => clearTimeout(timer)
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        const content = editor.children
        // TODO: Replace with actual API call
        console.log("Saving content:", JSON.stringify(content))
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        setIsEditing(false)
        toast.success("About Us content updated successfully")
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/settings" className="hover:bg-muted p-2 rounded-full transition-colors group">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">About Us</h1>
                </div>
            </div>

            {isLoading ? (
                <EditorContentSkeleton />
            ) : (
                <>
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
                                    placeholder="Write your About Us content here..."
                                    readOnly={!isEditing}
                                    className="px-8 py-6 text-base leading-relaxed"
                                />
                            </EditorContainer>
                        </Plate>
                    </div>

                    {/* Action Button */}
                    <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        disabled={isSaving}
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
                    >
                        {isSaving ? "Saving..." : isEditing ? "Save" : "Edit"}
                    </Button>
                </>
            )}
        </div>
    )
}
