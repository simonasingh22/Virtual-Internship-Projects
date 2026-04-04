import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Landing(){
  const [themeIndex, setThemeIndex] = useLocalStorage('landing-theme', 0)
  const [tasks, setTasks] = useLocalStorage('landing-tasks', [])
  const [history, setHistory] = useLocalStorage('task-history', [])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Low')
  const [dueDate, setDueDate] = useState('')
  const [historyOpen, setHistoryOpen] = useState(true)

  const themes = [
    { dot: '#0f172a', btnStart: '#ffd1dc', btnEnd: '#f4a6b7' },
    { dot: '#ffffff', btnStart: '#fff7e6', btnEnd: '#f7e7ce' },
    { dot: '#0b3a4b', btnStart: '#b8d7ff', btnEnd: '#7fb3ff' },
    { dot: '#d6c4a5', btnStart: '#f7ead2', btnEnd: '#e8d7b8' } // beige
  ]

  useEffect(()=>{
    applyTheme(themeIndex)
    // prune history older than 7 days on load
    const weekAgo = new Date(Date.now() - 7*24*60*60*1000)
    const pruned = history.filter(h => new Date(h.createdAt) >= weekAgo)
    if(pruned.length !== history.length) setHistory(pruned)
  }, [])

  function applyTheme(idx){
    const t = themes[idx] || themes[0]
    const root = document.documentElement
    root.style.setProperty('--btn-start', t.btnStart)
    root.style.setProperty('--btn-end', t.btnEnd)
    setThemeIndex(idx)
  }

  function addTask(){
    if(!title.trim()) return
    const now = new Date()
    const task = { id: Date.now(), title: title.trim(), createdAt: now.toISOString(), completed: false, priority, dueDate: dueDate || null }
    const next = [task, ...tasks]
    setTasks(next)

    // add to history and prune older than 7 days
    const weekAgo = new Date(Date.now() - 7*24*60*60*1000)
    const nextHist = [task, ...history].filter(h=> new Date(h.createdAt) >= weekAgo)
    setHistory(nextHist)

    setTitle('')
    setPriority('Low')
    setDueDate('')
  }

  function toggleComplete(id){
    const next = tasks.map(t=> t.id===id ? {...t, completed: !t.completed} : t)
    setTasks(next)
    // reflect in history too
    setHistory(history.map(h=> h.id===id ? {...h, completed: !h.completed} : h))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 landing-bg">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start relative">
        <div className="landing-hero text-center md:text-left">
          <div className="theme-circles" aria-hidden>
            {themes.map((t,i)=> (
              <button key={i} onClick={()=>applyTheme(i)} title={`Theme ${i+1}`} style={{background:t.dot}} className="theme-dot" />
            ))}
          </div>
          <h1 className="landing-title">Smart To-Do — Do more, stress less</h1>
          <p className="text-muted mb-6">A modern, minimal to-do app with priorities, due dates, and dark mode.</p>

          <form className="hero-form mx-auto md:mx-0" onSubmit={(e)=>{e.preventDefault(); addTask()}}>
            <input placeholder="Add a task." value={title} onChange={e=>setTitle(e.target.value)} className="hero-input" />
            <select value={priority} onChange={e=>setPriority(e.target.value)} className="hero-select">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="hero-date" />
            <button className="hero-btn btn-pill" type="submit">Add task</button>
          </form>

        </div>

        <div className="preview-card bg-card p-6 rounded shadow w-full">
          <h3 className="font-semibold mb-4">Tasks</h3>
          {tasks.length===0 ? (
            <div className="text-muted">No tasks yet — add one!</div>
          ) : (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr className="text-sm text-muted"><th style={{textAlign:'left',padding:'8px'}}>Task</th><th style={{padding:'8px'}}>Priority</th><th style={{padding:'8px'}}>Due</th><th style={{padding:'8px'}}>Added</th><th style={{padding:'8px'}}>Action</th></tr>
              </thead>
              <tbody>
                {tasks.map(t=> (
                  <motion.tr key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}} className="fade-up">
                    <td style={{padding:'10px'}}>
                      <span style={{textDecoration:t.completed?'line-through':'none',opacity:t.completed?0.6:1}}>{t.title}</span>
                    </td>
                    <td style={{padding:'10px'}} className="text-sm text-muted">{t.priority}</td>
                    <td style={{padding:'10px'}} className="text-sm text-muted">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</td>
                    <td style={{padding:'10px'}} className="text-sm text-muted">{new Date(t.createdAt).toLocaleString()}</td>
                    <td style={{padding:'10px'}}>
                      <button onClick={()=>toggleComplete(t.id)} className="pill-btn" title="Toggle complete">✔</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* history sidebar */}
        <aside className={`history-sidebar ${historyOpen ? 'open' : 'closed'}`}>
          <div className="history-header">
            <div className="font-semibold">History (7 days)</div>
            <div className="history-controls">
              <button className="pill-btn" onClick={()=>setHistoryOpen(!historyOpen)}>{historyOpen ? '⟨' : '»'}</button>
              <button className="pill-btn danger" onClick={()=>{ setHistory([]) }}>Clear</button>
            </div>
          </div>
          <div className="history-body">
          {history.length===0 ? <div className="text-sm text-muted">No recent activity</div> : (
            <ul style={{listStyle:'none',padding:0,margin:0}}>
              {history.map(h=> (
                <li key={h.id} style={{padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <div style={{fontSize:'0.95rem',color: h.completed? 'rgba(255,255,255,0.6)': '#fff'}}>{h.title}</div>
                  <div className="text-sm text-muted">{new Date(h.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
          </div>
        </aside>

      </div>
    </div>
  )
}
