import { useState, useEffect } from 'react';
import type { Task, List } from '../types/types';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

export function useLocalStorage(){
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const allLists = localStorage.getItem('lists');
    if(allLists){
      setLists(JSON.parse(allLists));
    }
    else{
      const demoList: List[] = [
        {
          id: "list-1",
          title: 'Getting Started',
          tasks: [
            {id: "item-1", task: "Buy Milk", status: "pending"},
            {id: "item-2", task: "Buy Bread", status: "pending"},
            {id: "item-3", task: "Buy Butter", status: "pending"}
          ]
        }
      ]
      setLists(demoList);
      localStorage.setItem('lists', JSON.stringify(demoList));
    }
  },[]);

  function addList(title: string){
    const updatedLists: List[] = [
      ...lists,
      {
        id: uuidv4(),
        title: title,
        tasks: []
      }
    ];

    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  }

  function removeList(){

  }

  function addItem(idx: number, task: string){
    if(idx >= 0 && idx < lists.length){
      const updatedTasks: Task[] = [
        {
          id: nanoid(10),
          task: task,
          status: "pending"
        },
        ...lists[idx].tasks
      ];

      const updatedLists: List[] = lists.map((list, i) => {
        if(i === idx){
          return {
            id: list.id,
            title: list.title,
            tasks: updatedTasks
          }
        }
        else{
          return list;
        }
      });

      setLists(updatedLists);
      localStorage.setItem('lists', JSON.stringify(updatedLists));
    }
  }

  function removeItem(idx: number, taskId: string){
    if(idx >= 0 && idx < lists.length){
      const updatedTasks: Task[] = lists[idx].tasks.filter((item) => {return item.id !== taskId});

      const updatedLists: List[] = lists.map((list, i) => {
        if(i === idx){
          return {
            id: list.id,
            title: list.title,
            tasks: updatedTasks
          }
        }
        else{
          return list;
        }
      });

      setLists(updatedLists);
      localStorage.setItem('lists', JSON.stringify(updatedLists));
    }
  }

  function toggleItemStatus(idx: number, taskId: string){
    if(idx >= 0 && idx < lists.length){
      const updatedTasks: Task[] = lists[idx].tasks.map((item) => {
        if(item.id === taskId){
          return {
            id: item.id,
            task: item.task,
            status: item.status === 'pending' ? "completed" : "pending"
          }
        }
        else{
          return item;
        }
      });

      const updatedLists: List[] = lists.map((list, i) => {
        if(i === idx){
          return {
            id: list.id,
            title: list.title,
            tasks: updatedTasks
          }
        }
        else{
          return list;
        }
      });

      setLists(updatedLists);
      localStorage.setItem('lists', JSON.stringify(updatedLists));
    }
  }

  return { lists, addList, removeList, addItem, removeItem, toggleItemStatus };
}