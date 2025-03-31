import { LucideIcon } from "lucide-react";

export type EventCategory = "sensor" | "alert" | "maintenance" | "harvest" | "planting" | "system" | "others";

export type EventSeverity = "info" | "success" | "warning" | "error";

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

export interface Event {
    id: string,
    timestamp: Date,
    category: EventCategory
    title: string
    description: string
    severity: EventSeverity
    sensor?: string
    location?: string
    value?: number
    unit?: string
    user?: string
    resolved?: boolean
    resolvedAt?: Date
    resolvedBy?: string
}
