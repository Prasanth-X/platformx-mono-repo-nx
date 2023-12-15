export type UserSession = {
    userInfo: any;
    role: string;
    permissions: Permission[];
    isActive?: boolean;
};
export interface UserInfo {
    name: string;
    email: string;
    username: string;
    selected_site: string;
    first_name: string;
    last_name: string;
    user_id: string;
    firstName: string;
    lastName: string;
    preferred_sites_languages: string[];
}
export interface Permission {
    site: string;
    category: string;
    sub_category: string;
    actions: string[];
}