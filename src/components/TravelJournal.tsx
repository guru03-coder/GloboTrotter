import { useState } from "react";
import { Book, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
}

export function TravelJournal() {
    const [notes, setNotes] = useState<Note[]>([
        { id: 1, title: "Kerala Dreams", content: "Must visit Alleppey for the houseboats. Heard the seafood is amazing.", date: "2024-03-15" }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newNote, setNewNote] = useState({ title: "", content: "" });

    const addNote = () => {
        if (!newNote.title || !newNote.content) return;
        const note: Note = {
            id: Date.now(),
            title: newNote.title,
            content: newNote.content,
            date: new Date().toISOString().split('T')[0]
        };
        setNotes([note, ...notes]);
        setNewNote({ title: "", content: "" });
        setIsAdding(false);
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <Card className="glass border-primary/20 h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Book size={18} className="text-primary" />
                        Travel Journal
                    </CardTitle>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsAdding(!isAdding)}>
                        <Plus size={18} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
                {isAdding && (
                    <div className="p-4 space-y-3 bg-accent/5 border-b border-border/50 animate-slide-down">
                        <Input
                            placeholder="Title"
                            className="bg-background/80"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        />
                        <Textarea
                            placeholder="Write your thoughts..."
                            className="bg-background/80 min-h-[80px]"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        />
                        <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button size="sm" onClick={addNote}>Save Note</Button>
                        </div>
                    </div>
                )}
                <ScrollArea className="flex-1 rounded-md p-4">
                    <div className="space-y-4">
                        {notes.length === 0 && !isAdding && (
                            <div className="text-center text-muted-foreground py-8 text-sm">
                                No notes yet. Start writing your memories!
                            </div>
                        )}
                        {notes.map((note) => (
                            <div key={note.id} className="group relative bg-background/40 hover:bg-background/60 border border-border/50 rounded-lg p-3 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-sm">{note.title}</h4>
                                    <span className="text-[10px] text-muted-foreground">{note.date}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-3">{note.content}</p>
                                <button
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                                    onClick={() => deleteNote(note.id)}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
