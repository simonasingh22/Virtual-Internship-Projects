import React, { useState } from 'react'

export default function TaskForm({ onSubmit, initial = {} }){
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low', dueDate: '', ...initial })
  const [submitting, setSubmitting] = useState(false)
  const submit = async (e) => {
    e.preventDefault();
    if(!form.title) return;
    try{
      setSubmitting(true)
      await onSubmit(form)
      setForm({ title: '', description: '', priority: 'Low', dueDate: '' })
    } finally { setSubmitting(false) }
  }
  return (
    <form onSubmit={submit} className="space-y-3 p-4 border rounded bg-card shadow-sm">
      <input placeholder="Task title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-3 border rounded focus:shadow-outline" />
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full p-3 border rounded h-24 resize-none" />
        <div className="flex gap-2 items-center">
        <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} className="p-2 border rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="date" value={form.dueDate ? form.dueDate.split('T')[0] : ''} onChange={e=>setForm({...form,dueDate:e.target.value})} className="p-2 border rounded" />
        <button disabled={submitting} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-60">
          {submitting ? <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> : null }
          <span>{submitting ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </form>
  )
}
