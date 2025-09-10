import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function NewProduct() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const currentSession = supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSession(data.session)
      else router.push('/auth')
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) return

    const { data, error } = await supabase.from('products').insert([
      {
        title,
        description,
        price,
        image,
        user_id: session.user.id,
      },
    ])

    if (error) setMessage('Erro: ' + error.message)
    else {
      setMessage('Produto cadastrado com sucesso!')
      setTitle('')
      setDescription('')
      setPrice('')
      setImage('')
    }
  }

  if (!session) return <p>Carregando...</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Produto</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Título do produto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Preço (Kz)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Cadastrar Produto
        </button>
      </form>
    </div>
  )
}
