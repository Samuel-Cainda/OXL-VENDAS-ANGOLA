import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    let { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.log(error)
    else setProducts(data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="font-bold text-xl">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-semibold mt-2">Preço: {product.price} Kz</p>
          </div>
        ))}
      </div>
    </div>
  )
}
