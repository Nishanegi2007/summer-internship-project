import { useState } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AddMember from "./components/AddMember";
import ContributionForm from "./components/ContributionForm";
import ContributionTable from "./components/ContributionTable";
import Analytics from "./components/Analytics";

import "./App.css";

function App() {

    const [members, setMembers] = useState([]);

    const [contributions, setContributions] = useState([]);

    const addMember = (name) => {
        setMembers([...members, name]);
    };

    const addContribution = (data) => {
        setContributions([...contributions, data]);
    };

    return (
        <div>

            <Header />

            <Dashboard
                members={members}
                contributions={contributions}
            />

            <div className="forms">

                <AddMember addMember={addMember} />

                <ContributionForm
                    members={members}
                    addContribution={addContribution}
                />

            </div>

            <ContributionTable contributions={contributions} />

            <Analytics contributions={contributions} />

        </div>
    );
}

export default App;