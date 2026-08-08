import { useState } from "react";

function AddMember({ addMember }) {

    const [name, setName] = useState("");

    const submit = () => {

        if (!name.trim()) return;

        addMember(name);

        setName("");

    };

    return (

        <div className="card">

            <h2>Add Member</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Member Name"
            />

            <button onClick={submit}>
                Add
            </button>

        </div>

    );

}

export default AddMember;