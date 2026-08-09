function Dashboard({ members, contributions }) {

    const totalHours = contributions.reduce(
        (sum, item) => sum + item.hours,
        0
    );

    const avgHours = members.length
        ? (totalHours / members.length).toFixed(1)
        : 0;

    return (

        <section className="dashboard">

            <div className="card stat-card">
                <span className="stat-label">Members</span>
                <span className="stat-value">{members.length}</span>
            </div>

            <div className="card stat-card">
                <span className="stat-label">Total Hours</span>
                <span className="stat-value">{totalHours}</span>
            </div>

            <div className="card stat-card">
                <span className="stat-label">Tasks Logged</span>
                <span className="stat-value">{contributions.length}</span>
            </div>

            <div className="card stat-card">
                <span className="stat-label">Avg Hours / Member</span>
                <span className="stat-value">{avgHours}</span>
            </div>

        </section>

    );

}

export default Dashboard;
