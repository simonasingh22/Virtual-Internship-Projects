import React, { useState } from 'react'
import api from '../api/axios'
import { useToast } from '../context/ToastContext'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const { success, error } = useToast()
  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/forgot', { email })
      success('Reset token generated. Check response for demo.')
      console.log(res.data)
    } catch (err) { error(err.response?.data?.message || 'Failed') }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handle} className="bg-card p-6 rounded shadow w-full max-w-md">
        <h3 className="mb-3 font-semibold">Forgot Password</h3>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-3" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Send reset token</button>
      </form>
    </div>
  )
}
