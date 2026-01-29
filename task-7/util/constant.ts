export const ROLES_NAMES = {
    admin: "ADMIN",
    coach: "COACH",
    student: "STUDENT"
} as const

export type RolesNamesType = typeof ROLES_NAMES[keyof typeof ROLES_NAMES]