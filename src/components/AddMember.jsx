import { useState } from "react";

function AddMember({ addMember, existingNames }) {

    const [name, setName] = useState("");

    const [error, setError] = useState("");

    const submit = () => {

        const trimmed = name.trim();

        if (!trimmed) {
            setError("Enter a name before adding.");
            return;
        }

        if (existingNames.some((n) => n.toLowerCase() === trimmed.toLowerCase())) {
            setError("That member already exists.");
            return;
        }

        addMember(trimmed);

        setName("");

        setError("");

    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") submit();
    };

    return (

        <div className="card">

            <h2>Add Member</h2>

            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                }}
                onKeyDown={onKeyDown}
                placeholder="Member name"
                className={error ? "input-error" : ""}
            />

            {error && <p className="error-text">{error}</p>}

            <button onClick={submit}>
                Add Member
            </button>

        </div>

    );

}

export default AddMember;
