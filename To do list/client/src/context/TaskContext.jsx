import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetch = async (params = {}) => {
    setLoading(true)
    const res = await api.get('/api/tasks', { params })
    setTasks(res.data)
    setLoading(false)
  }

  const createTask = async (payload) => {
    const res = await api.post('/api/tasks', payload)
    setTasks(prev => [res.data, ...prev])
    return res.data
  }

  const updateTask = async (id, payload) => {
    const res = await api.put(`/api/tasks/${id}`, payload)
    setTasks(prev => prev.map(t => t._id === id ? res.data : t))
    return res.data
  }

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`)
    setTasks(prev => prev.filter(t => t._id !== id))
  }

  const reorderTasks = async (orderedIds) => {
    const orders = orderedIds.map((id, idx) => ({ id, order: idx }))
    await api.put('/api/tasks/reorder', { orders })
    setTasks(prev => {
      const map = prev.reduce((acc,t)=>{ acc[t._id]=t; return acc }, {})
      return orderedIds.map(id=>map[id]).filter(Boolean)
    })
  }

  useEffect(() => { fetch() }, [])

  return (
    <TaskContext.Provider value={{ tasks, loading, fetch, createTask, updateTask, deleteTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)
