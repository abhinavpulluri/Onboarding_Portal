import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit } from 'lucide-react';

interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  role: string;
  department: string;
  level: string;
  estimatedTime: number;
}

const AdminPanel: React.FC = () => {
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<TaskTemplate>>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    role: '',
    department: '',
    level: '',
    estimatedTime: 30
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const task: TaskTemplate = {
        id: `task_${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        category: newTask.category || 'General',
        priority: newTask.priority || 'medium',
        role: newTask.role || 'any',
        department: newTask.department || 'any',
        level: newTask.level || 'any',
        estimatedTime: newTask.estimatedTime || 30
      };
      
      setTemplates([...templates, task]);
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        role: '',
        department: '',
        level: '',
        estimatedTime: 30
      });
      setIsAddingTask(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTemplates(templates.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <Button 
            onClick={() => setIsAddingTask(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task Template</span>
          </Button>
        </div>

        {/* Add Task Form */}
        {isAddingTask && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Task Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    placeholder="e.g., Setup, Learning, Meetings"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value as 'high' | 'medium' | 'low'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newTask.role} onValueChange={(value) => setNewTask({...newTask, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Role</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="worker">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={newTask.department} onValueChange={(value) => setNewTask({...newTask, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Department</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={newTask.level} onValueChange={(value) => setNewTask({...newTask, level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({...newTask, estimatedTime: parseInt(e.target.value)})}
                  placeholder="30"
                  min="1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task Templates List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Templates ({templates.length})</h2>
          
          {templates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No task templates yet. Add your first task template to get started!</p>
              </CardContent>
            </Card>
          ) : (
            templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{template.title}</h3>
                        <Badge className={getPriorityColor(template.priority)}>
                          {template.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge variant="outline">Role: {template.role}</Badge>
                        <Badge variant="outline">Dept: {template.department}</Badge>
                        <Badge variant="outline">Level: {template.level}</Badge>
                        <Badge variant="outline">{template.estimatedTime} min</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteTask(template.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
