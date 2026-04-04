import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useToast } from '../context/ToastContext'

export default function ResetPassword(){
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const { success, error } = useToast()
  const navigate = useNavigate()
  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/auth/reset/${token}`, { password })
      success('Password reset successful')
      navigate('/login')
    } catch (err) { error(err.response?.data?.message || 'Failed') }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handle} className="bg-card p-6 rounded shadow w-full max-w-md">
        <h3 className="mb-3 font-semibold">Reset Password</h3>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" className="w-full p-2 border rounded mb-3" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Reset</button>
      </form>
    </div>
  )
}
