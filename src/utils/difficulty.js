export const DIFFICULTY_LEVELS = [
    { value: "Easy", weight: 0.75 },
    { value: "Medium", weight: 1 },
    { value: "Hard", weight: 1.5 }
];

export const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

export function difficultyWeight(difficulty) {

    const found = DIFFICULTY_LEVELS.find((d) => d.value === difficulty);

    return found ? found.weight : 1;

}

export function weightedHours(hours, difficulty) {
    return hours * difficultyWeight(difficulty);
}

export function difficultyClass(difficulty) {

    if (difficulty === "Hard") return "difficulty-hard";
    if (difficulty === "Easy") return "difficulty-easy";

    return "difficulty-medium";

}

export function statusClass(status) {

    if (status === "Done") return "status-done";
    if (status === "In Progress") return "status-progress";

    return "status-todo";

}
