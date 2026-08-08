function ContributionTable({ contributions }) {

    return (

        <div className="card">

            <h2>Contribution Log</h2>

            <table>

                <thead>

                    <tr>

                        <th>Member</th>

                        <th>Task</th>

                        <th>Hours</th>

                    </tr>

                </thead>

                <tbody>

                    {contributions.map((c, index) => (

                        <tr key={index}>

                            <td>{c.member}</td>

                            <td>{c.task}</td>

                            <td>{c.hours}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ContributionTable;