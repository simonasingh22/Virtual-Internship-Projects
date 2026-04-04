import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import { useTasks, TaskProvider } from '../context/TaskContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import EmptyState from '../components/EmptyState'

function InnerDashboard(){
  const { tasks, loading, createTask, updateTask, deleteTask, fetch, reorderTasks } = useTasks()
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const handleCreate = async (payload) => {
    await createTask(payload)
  }

  const handleToggle = async (task) => {
    await updateTask(task._id, { status: task.status==='completed' ? 'pending' : 'completed' })
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
  }

  const handleEdit = (task) => setEditing(task)

  const applyFilter = async () => {
    const params = {}
    if (filter !== 'all') params.filter = filter
    if (search) params.search = search
    await fetch(params)
  }

  return (
    <div className="min-h-screen app-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-4 glass-card">
          <TaskForm onSubmit={editing ? async (v)=>{ await updateTask(editing._id, v); setEditing(null) } : handleCreate} initial={editing || {}} />
        </div>
        <div className="flex gap-2 mb-4">
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 border rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 rounded flex-1" />
          <button onClick={applyFilter} className="bg-gray-200 p-2 rounded">Apply</button>
        </div>
        {loading ? <div className="p-8 text-center">Loading...</div> : (
          tasks.length === 0 ? <EmptyState title="No tasks yet" message="You have no tasks. Create one using the form above." /> : (
            <DragDropContext onDragEnd={async (result)=>{
              if(!result.destination) return;
              const newOrder = Array.from(tasks);
              const [moved] = newOrder.splice(result.source.index,1);
              newOrder.splice(result.destination.index,0,moved);
              const orderedIds = newOrder.map(t=>t._id);
              await reorderTasks(orderedIds);
            }}>
              <Droppable droppableId="task-list">
                {(provided)=> (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="grid gap-3">
                    {tasks.map((t, idx)=> (
                      <Draggable key={t._id} draggableId={t._id} index={idx}>
                        {(prov)=>(
                          <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                            <TaskCard task={t} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )
        )}
      </div>
    </div>
  )
}

export default function Dashboard(){
  return (
    <TaskProvider>
      <InnerDashboard />
    </TaskProvider>
  )
}
