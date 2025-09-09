export default function Home() {
  const produtos = [
    { id: 1, nome: "Telemóvel Samsung", preco: "50.000 AKZ", imagem: "https://via.placeholder.com/200" },
    { id: 2, nome: "Laptop HP Usado", preco: "250.000 AKZ", imagem: "https://via.placeholder.com/200" },
    { id: 3, nome: "Geladeira LG", preco: "180.000 AKZ", imagem: "https://via.placeholder.com/200" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        OXL Vendas Angola
      </header>

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white rounded-lg shadow p-4">
            <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{produto.nome}</h2>
            <p className="text-gray-700">{produto.preco}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Comprar
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
