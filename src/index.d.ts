import { LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
    title:  string;
    href:   string;
}

export interface NavGroup {
    title:  string;
    items:  NavItem[];
}

export interface NavItem {
    title:      string;
    href:       string;
    isActive?:  boolean;
    icon?:      LucideIcon | null;
}
