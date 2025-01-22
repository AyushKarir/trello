export interface Task {
    id: string;
    title: string;
    status: 'not_started' | 'in_progress' | 'completed';
    description?: string;
}

export interface Column {
    id: 'not_started' | 'in_progress' | 'completed';
    title: string;
    color: string;
    bgColor: string;
}