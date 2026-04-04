import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handle} className="w-full max-w-md bg-card p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <label className="block mb-2">Email
          <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1 p-2 border rounded" />
        </label>
        <label className="block mb-4">Password
          <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mt-1 p-2 border rounded" />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
