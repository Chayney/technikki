import { ContentEditorProps, ContentBlock } from "../types/post";
import { v4 as uuidv4 } from "uuid";

export const ContentEditor: React.FC<ContentEditorProps> = ({ value, onChange }) => {
    const updateBlock = (id: string, content: string) => {
        onChange(
            value.map(block =>
                block.id === id ? { ...block, content } : block
            )
        );
    };

    const addBlock = (type: ContentBlock["type"]) => {
        onChange([
            ...value,
            { id: uuidv4(), type, content: "" }
        ]);
    };

    const removeBlock = (id: string) => {
        onChange(value.filter(block => block.id !== id));
    };

    return (
        <div>
            {value.map(block => (
                <div key={block.id} style={{ marginBottom: "1.5em" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        {block.type === "heading1" && (
                            <input
                                placeholder="大見出し（h2）"
                                value={block.content}
                                onChange={e => updateBlock(block.id, e.target.value)}
                                style={{ fontSize: "1.5em", fontWeight: "bold" }}
                            />
                        )}
                        {block.type === "heading2" && (
                            <input
                                placeholder="小見出し（h3）"
                                value={block.content}
                                onChange={e => updateBlock(block.id, e.target.value)}
                                style={{ fontSize: "1.2em", fontWeight: "bold" }}
                            />
                        )}
                        {block.type === "paragraph" && (
                            <textarea
                                placeholder="本文"
                                value={block.content}
                                onChange={e => updateBlock(block.id, e.target.value)}
                                rows={4}
                            />
                        )}
                        <button type="button" onClick={() => removeBlock(block.id)}>削除</button>
                    </div>
                </div>
            ))}

            <div style={{ marginTop: "1em" }}>
                <button type="button" onClick={() => addBlock("heading1")}>大見出しを追加</button>
                <button type="button" onClick={() => addBlock("heading2")}>小見出しを追加</button>
                <button type="button" onClick={() => addBlock("paragraph")}>本文を追加</button>
            </div>
        </div>
    );
};
