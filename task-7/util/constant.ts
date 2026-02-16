
export const MODULES_NAMES = {
    auth: 'AUTH',
    user: 'USER',
    course: 'COURSE'
} as const;

export type ModuleNameType = typeof MODULES_NAMES[keyof typeof MODULES_NAMES];

export const ROLES_NAMES = {
    admin: "ADMIN",
    coach: "COACH",
    student: "STUDENT"
} as const
export type RolesNamesType = typeof ROLES_NAMES[keyof typeof ROLES_NAMES]








