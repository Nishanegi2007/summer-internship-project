function Dashboard({ members, contributions }) {

    const totalHours = contributions.reduce(
        (sum, item) => sum + item.hours,
        0
    );

    return (

        <div className="dashboard">

            <div className="card">

                <h3>Members</h3>

                <h1>{members.length}</h1>

            </div>

            <div className="card">

                <h3>Total Hours</h3>

                <h1>{totalHours}</h1>

            </div>

            <div className="card">

                <h3>Tasks</h3>

                <h1>{contributions.length}</h1>

            </div>

        </div>

    );

}

export default Dashboard;