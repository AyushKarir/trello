import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onTaskClick: (task: Task) => void;
}

export const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('taskId', task.id);
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onClick={() => onTaskClick(task)}
            className="p-3 bg-white rounded shadow cursor-pointer hover:shadow-md"
        >
            {task.title}
        </div>
    );
};