import { Column } from '../types';

export const columns: Column[] = [
    { id: 'not_started', title: 'Not started', color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 'in_progress', title: 'In progress', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { id: 'completed', title: 'Completed', color: 'text-green-500', bgColor: 'bg-green-50' }
];