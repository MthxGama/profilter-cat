import { supabase } from '../../src/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    filtro?: string;
  }>;
}

export default async function Catalogo({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const filtroUrl = resolvedParams.filtro || 'Todos';

  // Busca os produtos diretamente no servidor do Supabase
  const { data: produtosData } = await supabase.from('products').select('*');
  const produtos = produtosData || [];

  const filtroAtivo = filtroUrl;

  const produtosFiltrados = produtos.filter(produto => {
    if (filtroAtivo === 'Todos') return true;
    
    const tituloLower = produto.title.toLowerCase();

    if (filtroAtivo !== 'kit' && tituloLower.includes('kit')) {
      return false;
    }
    
    if (filtroAtivo === 'ar') {
      return tituloLower.includes(' de ar');
    }
    
    return tituloLower.includes(filtroAtivo);
  });

  const categorias = [
    { nome: 'Todos os Produtos', keyword: 'Todos' },
    { nome: 'Filtros de Óleo', keyword: 'óleo' },
    { nome: 'Filtros de Combustível', keyword: 'combustível' },
    { nome: 'Filtros de Ar', keyword: 'ar' },
    { nome: 'Filtros de Cabine', keyword: 'cabine' },
    { nome: 'Kit Troca Completa', keyword: 'kit' },
  ];

  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen flex flex-col">
      
      <header className="bg-brand-yellow py-5 w-full shrink-0 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <h1 className="m-0 p-0 flex items-center">
            <Link href="/" title="Voltar para a Página Inicial" className="block transition-transform hover:scale-105">
              <img src="/img/logo.png" alt="Logotipo Profilter" className="h-10 w-auto block" />
            </Link>
          </h1>
          
          <div className="flex gap-4">
            <Link href="/" className="bg-transparent border-2 border-[#2D2D2D] text-[#2D2D2D] py-2 px-6 font-extrabold text-[0.9rem] cursor-pointer uppercase transition-all duration-200 hover:bg-[#2D2D2D] hover:text-brand-yellow rounded-lg flex items-center">
              VOLTAR PARA HOME
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow py-10">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%]">
          
          <div className="mb-10 border-b-4 border-brand-yellow pb-4">
            <h2 className="text-[2.2rem] font-black uppercase text-black leading-tight">CATÁLOGO COMPLETO</h2>
            <p className="text-[#444] font-medium text-lg mt-1">Nossa linha completa de filtros com alto giro para o seu negócio.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="w-full lg:w-[260px] shrink-0">
              <div className="bg-white p-5 rounded-xl border border-[#ccc] shadow-sm sticky top-5">
                <h3 className="font-extrabold text-lg mb-4 text-brand-dark uppercase border-b border-gray-100 pb-2">Categorias</h3>
                
                <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 scrollbar-hide">
                  {categorias.map((cat) => {
                    const isAtivo = filtroAtivo === cat.keyword;
                    return (
                      <li key={cat.keyword} className="shrink-0 lg:w-full">
                        <Link
                          href={`/catalogo?filtro=${cat.keyword}`}
                          className={`w-full block text-left px-4 py-3 rounded-lg font-bold text-[0.95rem] transition-all duration-200 uppercase tracking-wide ${
                            isAtivo 
                              ? 'bg-brand-yellow text-black shadow-md border-transparent' 
                              : 'bg-transparent text-gray-600 border border-gray-200 hover:border-brand-yellow hover:text-black'
                          }`}
                        >
                          {cat.nome}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="flex-1">
              
              <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border border-[#ccc] shadow-sm">
                <span className="font-bold text-gray-600 uppercase text-sm tracking-wide">
                  Exibindo: <span className="text-black">{categorias.find(c => c.keyword === filtroAtivo)?.nome || 'Todos'}</span>
                </span>
                <span className="text-sm font-bold text-white bg-brand-dark py-1.5 px-4 rounded-full">
                  {produtosFiltrados.length} produtos
                </span>
              </div>

              {produtosFiltrados.length === 0 ? (
                <div className="w-full py-20 text-center bg-white rounded-lg border border-[#ccc]">
                  <p className="text-lg font-bold text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {produtosFiltrados.map((produto) => (
                    <Link href={`/produto/${produto.procod}`} key={produto.procod} className="bg-white border border-[#ccc] rounded-lg p-5 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                      
                      <div className="w-full h-40 flex items-center justify-center mb-4 p-2 bg-white rounded-md">
                        <img 
                          src={Array.isArray(produto.img_url) ? produto.img_url[0] : (produto.img_url || '/img/produto-placeholder.png')} 
                          alt={produto.title} 
                          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110" 
                        />
                      </div>
                      
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-[1.1rem] font-bold mb-1 line-clamp-2 text-gray-900 leading-tight">{produto.title}</h3>
                        <p className="text-[0.9rem] text-[#666] mb-4 font-semibold mt-auto pt-2">Cód: {produto.procod}</p>
                      </div>

                      <div className="bg-brand-wpp text-white border-none py-2.5 px-4 rounded font-bold cursor-pointer w-full text-[0.85rem] transition-all hover:brightness-90 uppercase mt-auto">
                        VER DETALHES
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>

      <footer className="bg-brand-dark text-white py-10 w-full mt-10 border-t-[15px] border-brand-yellow">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/img/logo-branca.png" alt="Profilter Logo" loading="lazy" className="max-w-[150px] block" />
          <p className="text-[#999] text-sm text-center md:text-left">© 2026 Profilter. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}