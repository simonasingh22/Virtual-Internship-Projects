import React from 'react'
import { motion } from 'framer-motion'

export default function EmptyState({ title='No items', message='Add your first task to get started.' }){
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center glass-card">
      <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m1-5H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z"></path></svg>
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted">{message}</p>
    </motion.div>
  )
}
