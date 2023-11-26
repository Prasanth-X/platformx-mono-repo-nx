
export interface Option {
    label: string;
    value: string;
}

export interface DropdownMenuProps {
    buttonLabel: string;
    options: Option[];
}