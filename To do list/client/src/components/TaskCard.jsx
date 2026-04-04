import React from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

export default function TaskCard({ task, onToggle, onDelete, onEdit }){
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`glass-row flex items-start justify-between ${task.status==='completed'?'opacity-60':''}`}
    >
      <div className="flex items-start gap-4">
        <button onClick={()=>onToggle(task)} className="icon-btn" aria-label="toggle complete">
          {task.status==='completed' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
        <div>
          <h4 className="font-semibold">{task.title}</h4>
          <div className="text-sm text-muted">{task.priority} • {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'No due date'}</div>
          {task.description && <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{task.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=>onEdit(task)} className="icon-btn" aria-label="edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={()=>onDelete(task._id)} className="icon-btn" aria-label="delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </motion.div>
  )
}
