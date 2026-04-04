import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Profile(){
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({ name: '', email: '' })
  const { success, error } = useToast()

  useEffect(()=>{ if(user) setForm({ name: user.name, email: user.email }) }, [user])

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/api/auth/profile', form)
      success('Profile updated')
      // update auth context if available
      if(res.data.user && setUser) setUser(res.data.user)
    } catch (err) { error(err.response?.data?.message || 'Failed') }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-3">Profile</h2>
        <form onSubmit={handle} className="bg-card p-4 rounded shadow space-y-3">
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded" />
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </div>
  )
}
