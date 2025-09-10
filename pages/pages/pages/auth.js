import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) setMessage(error.message)
    else setMessage('Conta criada! Verifique seu email.')
  }

  const handleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setMessage(error.message)
    else setMessage('Login realizado com sucesso!')
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Login / Registro</h1>
      {message && <p className="mb-4">{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="flex gap-4">
        <button
          onClick={handleSignIn}
          className="bg-green-500 text-white p-2 rounded flex-1"
        >
          Entrar
        </button>
        <button
          onClick={handleSignUp}
          className="bg-blue-500 text-white p-2 rounded flex-1"
        >
          Registrar
        </button>
      </div>
    </div>
  )
}
