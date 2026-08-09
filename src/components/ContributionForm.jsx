import { useState } from "react";
import { DIFFICULTY_LEVELS, STATUS_OPTIONS } from "../utils/difficulty";

function ContributionForm({ members, addContribution }) {

    const [memberId, setMemberId] = useState("");

    const [task, setTask] = useState("");

    const [hours, setHours] = useState("");

    const [difficulty, setDifficulty] = useState("Medium");

    const [status, setStatus] = useState("Done");

    const [error, setError] = useState("");

    const submit = () => {

        if (!memberId) {
            setError("Select who did the work.");
            return;
        }

        if (!task.trim()) {
            setError("Describe the task.");
            return;
        }

        if (!hours || Number(hours) <= 0) {
            setError("Enter a valid number of hours.");
            return;
        }

        const member = members.find((m) => m.id === memberId);

        addContribution({

            memberId,
            member: member.name,
            task: task.trim(),
            hours: Number(hours),
            difficulty,
            status,
            date: new Date().toISOString().split("T")[0]

        });

        setTask("");

        setHours("");

        setError("");

    };

    return (

        <div className="card">

            <h2>Log Contribution</h2>

            {members.length === 0 ? (

                <p className="no-tasks">Add a member first to log a contribution.</p>

            ) : (

                <>

                    <select
                        value={memberId}
                        onChange={(e) => {
                            setMemberId(e.target.value);
                            if (error) setError("");
                        }}
                    >

                        <option value="">Select Member</option>

                        {members.map((m) => (

                            <option key={m.id} value={m.id}>{m.name}</option>

                        ))}

                    </select>

                    <input
                        placeholder="Task"
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                            if (error) setError("");
                        }}
                    />

                    <input
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="Hours"
                        value={hours}
                        onChange={(e) => {
                            setHours(e.target.value);
                            if (error) setError("");
                        }}
                    />

                    <div className="field-row">

                        <div className="field-group">
                            <label className="field-label">Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                {DIFFICULTY_LEVELS.map((d) => (
                                    <option key={d.value} value={d.value}>{d.value}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label className="field-label">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <button onClick={submit}>
                        Save
                    </button>

                </>

            )}

        </div>

    );

}

export default ContributionForm;
