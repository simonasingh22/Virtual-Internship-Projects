import React, { useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export default function DarkModeToggle(){
  const [dark, setDark] = useLocalStorage('dark-mode', false)
  useEffect(()=>{
    const root = document.documentElement;
    if(dark) root.classList.add('dark'); else root.classList.remove('dark')
  },[dark])

  return (
    <button
      onClick={()=>setDark(!dark)}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span className="text-lg">{dark ? '🌙' : '☀️'}</span>
    </button>
  )
}
