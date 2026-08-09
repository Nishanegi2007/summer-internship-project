export const AVATAR_COLORS = ["#45635c", "#5b6f8c", "#8a6d52", "#6f6a8f", "#547a6b", "#7a5f5f"];

export function getInitials(name) {

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

}

export function avatarColor(name) {

    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];

}
