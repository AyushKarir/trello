import { useState } from 'react';
import { Task } from '../types';

interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskModal = ({ task, onClose, onSave, onDelete }: TaskModalProps) => {
    const [editedTask, setEditedTask] = useState<Task>(task);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <input
                    className="w-full mb-4 p-2 border rounded"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />

                <select
                    className="w-full mb-4 p-2 border rounded"
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as Task['status'] })}
                >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <textarea
                    className="w-full h-32 mb-4 p-2 border rounded"
                    value={editedTask.description || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    placeholder="Add description..."
                />

                <div className="flex justify-between">
                    <button
                        onClick={() => onSave(editedTask)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};