export type Task = {
  id: string;
  task: string;
  status: 'pending' | 'completed';
}

export type List = {
  id: string;
  title: string;
  tasks: Task[];
}