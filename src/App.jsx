import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import MemberCards from "./components/MemberCards";
import AddMember from "./components/AddMember";
import ContributionForm from "./components/ContributionForm";
import ContributionTable from "./components/ContributionTable";
import Analytics from "./components/Analytics";
import { useLocalStorage } from "./hooks/useLocalStorage";

import "./App.css";

function App() {

    const [members, setMembers] = useLocalStorage("tcl_members", []);

    const [contributions, setContributions] = useLocalStorage("tcl_contributions", []);

    const addMember = (name) => {
        setMembers([...members, { id: crypto.randomUUID(), name }]);
    };

    const removeMember = (id) => {
        setMembers(members.filter((m) => m.id !== id));
        setContributions(contributions.filter((c) => c.memberId !== id));
    };

    const addContribution = (data) => {
        setContributions([...contributions, { id: crypto.randomUUID(), ...data }]);
    };

    const removeContribution = (id) => {
        setContributions(contributions.filter((c) => c.id !== id));
    };

    const updateContribution = (id, updates) => {
        setContributions(
            contributions.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
    };

    return (
        <div className="app">

            <Header />

            <main className="container">

                <Dashboard
                    members={members}
                    contributions={contributions}
                />

                <MemberCards
                    members={members}
                    contributions={contributions}
                    removeMember={removeMember}
                />

                <section className="forms">

                    <AddMember
                        addMember={addMember}
                        existingNames={members.map((m) => m.name)}
                    />

                    <ContributionForm
                        members={members}
                        addContribution={addContribution}
                    />

                </section>

                <Analytics
                    contributions={contributions}
                    members={members}
                />

                <ContributionTable
                    contributions={contributions}
                    removeContribution={removeContribution}
                    updateContribution={updateContribution}
                />

            </main>

        </div>
    );
}

export default App;
