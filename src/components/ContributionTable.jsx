import { useState } from "react";
import { DIFFICULTY_LEVELS, STATUS_OPTIONS, difficultyClass, statusClass } from "../utils/difficulty";

function ContributionTable({ contributions, removeContribution, updateContribution }) {

    const [editingId, setEditingId] = useState(null);

    const [draft, setDraft] = useState({ task: "", hours: "", difficulty: "Medium", status: "Done" });

    const startEdit = (c) => {
        setEditingId(c.id);
        setDraft({
            task: c.task,
            hours: c.hours,
            difficulty: c.difficulty || "Medium",
            status: c.status || "Done"
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setDraft({ task: "", hours: "", difficulty: "Medium", status: "Done" });
    };

    const saveEdit = (id) => {

        if (!draft.task.trim() || !draft.hours || Number(draft.hours) <= 0) return;

        updateContribution(id, {
            task: draft.task.trim(),
            hours: Number(draft.hours),
            difficulty: draft.difficulty,
            status: draft.status
        });

        setEditingId(null);

    };

    const onKeyDown = (e, id) => {
        if (e.key === "Enter") saveEdit(id);
        if (e.key === "Escape") cancelEdit();
    };

    return (

        <div className="card">

            <h2>Contribution Log</h2>

            {contributions.length === 0 ? (

                <p className="no-tasks">No contributions logged yet — entries will appear here.</p>

            ) : (

                <table>

                    <thead>

                        <tr>
                            <th>Member</th>
                            <th>Task</th>
                            <th>Hours</th>
                            <th>Date</th>
                            <th></th>
                        </tr>

                    </thead>

                    <tbody>

                        {contributions
                            .slice()
                            .reverse()
                            .map((c) => {

                                const isEditing = editingId === c.id;

                                return (

                                    <tr key={c.id}>

                                        <td>{c.member}</td>

                                        {isEditing ? (

                                            <>

                                                <td>

                                                    <input
                                                        className="edit-input"
                                                        value={draft.task}
                                                        onChange={(e) => setDraft({ ...draft, task: e.target.value })}
                                                        onKeyDown={(e) => onKeyDown(e, c.id)}
                                                        autoFocus
                                                    />

                                                    <div className="edit-select-row">

                                                        <select
                                                            className="edit-select"
                                                            value={draft.difficulty}
                                                            onChange={(e) => setDraft({ ...draft, difficulty: e.target.value })}
                                                        >
                                                            {DIFFICULTY_LEVELS.map((d) => (
                                                                <option key={d.value} value={d.value}>{d.value}</option>
                                                            ))}
                                                        </select>

                                                        <select
                                                            className="edit-select"
                                                            value={draft.status}
                                                            onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                                                        >
                                                            {STATUS_OPTIONS.map((s) => (
                                                                <option key={s} value={s}>{s}</option>
                                                            ))}
                                                        </select>

                                                    </div>

                                                </td>

                                                <td>
                                                    <input
                                                        className="edit-input"
                                                        type="number"
                                                        min="0"
                                                        step="0.5"
                                                        value={draft.hours}
                                                        onChange={(e) => setDraft({ ...draft, hours: e.target.value })}
                                                        onKeyDown={(e) => onKeyDown(e, c.id)}
                                                    />
                                                </td>

                                                <td>{c.date}</td>

                                                <td className="row-actions">
                                                    <button
                                                        className="icon-btn save-btn"
                                                        onClick={() => saveEdit(c.id)}
                                                        aria-label="Save changes"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="icon-btn cancel-btn"
                                                        onClick={cancelEdit}
                                                        aria-label="Cancel editing"
                                                    >
                                                        ×
                                                    </button>
                                                </td>

                                            </>

                                        ) : (

                                            <>

                                                <td>
                                                    <div className="task-cell">
                                                        <span>{c.task}</span>
                                                        <span className="badges-row">
                                                            <span className={`tag ${difficultyClass(c.difficulty)}`}>
                                                                {c.difficulty || "Medium"}
                                                            </span>
                                                            <span className={`tag ${statusClass(c.status)}`}>
                                                                {c.status || "Done"}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>{c.hours}</td>
                                                <td>{c.date}</td>

                                                <td className="row-actions">
                                                    <button
                                                        className="icon-btn edit-btn"
                                                        onClick={() => startEdit(c)}
                                                        aria-label={`Edit ${c.task}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="icon-btn remove-btn"
                                                        onClick={() => removeContribution(c.id)}
                                                        aria-label={`Remove ${c.task}`}
                                                    >
                                                        ×
                                                    </button>
                                                </td>

                                            </>

                                        )}

                                    </tr>

                                );

                            })}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default ContributionTable;
