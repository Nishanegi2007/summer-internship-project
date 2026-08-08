import { useState } from "react";

function ContributionForm({ members, addContribution }) {

    const [member, setMember] = useState("");

    const [task, setTask] = useState("");

    const [hours, setHours] = useState("");

    const submit = () => {

        if (!member || !task || !hours) return;

        addContribution({

            member,
            task,
            hours: Number(hours)

        });

        setTask("");

        setHours("");

    };

    return (

        <div className="card">

            <h2>Log Contribution</h2>

            <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
            >

                <option value="">Select Member</option>

                {members.map((m) => (

                    <option key={m}>{m}</option>

                ))}

            </select>

            <input
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <input
                type="number"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
            />

            <button onClick={submit}>
                Save
            </button>

        </div>

    );

}

export default ContributionForm;