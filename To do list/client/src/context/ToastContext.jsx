import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const add = (type, message) => {
    const id = Date.now()
    setToasts(t => [...t, { id, type, message }])
    setTimeout(()=> setToasts(t => t.filter(x=>x.id!==id)), 4000)
  }
  const success = (msg)=>add('success', msg)
  const error = (msg)=>add('error', msg)

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map(t=> (
            <motion.div key={t.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ type: 'spring' }}>
              <div className={`p-3 rounded shadow ${t.type==='success'?'bg-green-500 text-white':'bg-red-500 text-white'}`}>
                {t.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
