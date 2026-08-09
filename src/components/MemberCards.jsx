import { getInitials, avatarColor } from "../utils/colors";
import { difficultyClass, statusClass } from "../utils/difficulty";

function MemberCards({ members, contributions, removeMember }) {

    if (members.length === 0) {

        return (

            <section className="member-section">

                <h2>Team Overview</h2>

                <div className="empty-state">
                    No members yet — add your first teammate below to start tracking contributions.
                </div>

            </section>

        );

    }

    const totalTeamHours = contributions.reduce((sum, c) => sum + c.hours, 0);

    const avgHours = totalTeamHours / members.length;

    return (

        <section className="member-section">

            <h2>Team Overview</h2>

            <div className="member-grid">

                {members.map((member) => {

                    const memberContributions = contributions.filter(
                        (c) => c.memberId === member.id
                    );

                    const totalHours = memberContributions.reduce(
                        (sum, c) => sum + c.hours,
                        0
                    );

                    let status = "balanced";

                    if (avgHours > 0) {
                        if (totalHours < avgHours * 0.6) status = "below";
                        else if (totalHours > avgHours * 1.4) status = "above";
                    }

                    return (

                        <div className="card member-card" key={member.id}>

                            <div className="member-card-head">

                                <div
                                    className="avatar"
                                    style={{ background: avatarColor(member.name) }}
                                >
                                    {getInitials(member.name)}
                                </div>

                                <div>
                                    <h3>{member.name}</h3>
                                    <span className={`badge badge-${status}`}>
                                        {status === "below" && "Below average"}
                                        {status === "above" && "Above average"}
                                        {status === "balanced" && "On track"}
                                    </span>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeMember(member.id)}
                                    aria-label={`Remove ${member.name}`}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="member-stats">

                                <div>
                                    <span className="stat-value-small">{totalHours}</span>
                                    <span className="stat-label-small">hours</span>
                                </div>

                                <div>
                                    <span className="stat-value-small">{memberContributions.length}</span>
                                    <span className="stat-label-small">tasks</span>
                                </div>

                            </div>

                            {memberContributions.length > 0 ? (

                                <ul className="task-list">

                                    {memberContributions
                                        .slice(-3)
                                        .reverse()
                                        .map((c) => (

                                            <li key={c.id}>
                                                <div className="task-info">
                                                    <span className="task-name">{c.task}</span>
                                                    <span className="badges-row">
                                                        <span className={`tag ${difficultyClass(c.difficulty)}`}>
                                                            {c.difficulty || "Medium"}
                                                        </span>
                                                        <span className={`tag ${statusClass(c.status)}`}>
                                                            {c.status || "Done"}
                                                        </span>
                                                    </span>
                                                </div>
                                                <span className="task-hours">{c.hours}h</span>
                                            </li>

                                        ))}

                                </ul>

                            ) : (

                                <p className="no-tasks">No contributions logged yet.</p>

                            )}

                        </div>

                    );

                })}

            </div>

        </section>

    );

}

export default MemberCards;
