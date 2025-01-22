import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { columns } from '../constants';
import { Task } from '../types';

export const ProjectBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Card 1', status: 'not_started' },
        { id: '2', title: 'Card 2', status: 'in_progress' },
        { id: '3', title: 'Card 3', status: 'completed' },
        { id: '4', title: 'Card 4', status: 'not_started' },
        { id: '5', title: 'Card 5', status: 'not_started' }
    ]);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const addTask = (status: Task['status']) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: `Card ${tasks.length + 1}`,
            status
        };
        setTasks([...tasks, newTask]);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent, status: Task['status']) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        ));
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleSaveTask = (updatedTask: Task) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setSelectedTask(null);
    };

    return (
        <div className="p-6">
            <div className="flex gap-4">
                {columns.map(column => (
                    <div
                        key={column.id}
                        className="flex-1"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, column.id)}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`px-2 py-1 rounded ${column.bgColor} ${column.color}`}>
                                {column.title} {tasks.filter(t => t.status === column.id).length}
                            </div>
                            <button className="ml-auto text-gray-400">...</button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {tasks
                                .filter(task => task.status === column.id)
                                .map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onTaskClick={handleTaskClick}
                                    />
                                ))}
                            <button
                                onClick={() => addTask(column.id)}
                                className="text-gray-500 text-left px-3 py-2 hover:bg-gray-50"
                            >
                                + New
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={handleSaveTask}
                    onDelete={handleDeleteTask}
                />
            )}
        </div>
    );
};

export default ProjectBoard;