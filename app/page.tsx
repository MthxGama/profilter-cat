import { supabase } from '../src/lib/supabase';
import Link from 'next/link';

// Força a página a buscar dados atualizados sempre (ignora o cache)
export const dynamic = 'force-dynamic';

export default async function Home() {
  /// Busca todos os produtos do Supabase
  const { data: produtos } = await supabase.from('products').select('*');

  // Limitando cada sessão para exibir apenas 5 produtos
  const produtosMaisVendidos = produtos?.slice(0, 5) || [];
  const produtosCombustivel = produtos.filter(produto =>  const tituloLower = produto.title.toLowerCase();
  const produtosOleo = produtos?.filter(p => p.title.toLowerCase().includes('óleo')).slice(0, 5) || [];


  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen">
      
      {/* CABEÇALHO */}
      <header className="bg-brand-yellow py-5 w-full">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <h1 className="m-0 p-0 flex items-center">
            <Link href="/" title="Página Inicial - Profilter" className="block">
              <img src="/img/logo.png" alt="Logotipo Profilter" className="h-10 w-auto block" />
            </Link>
          </h1>
          
          <button className="bg-[#2D2D2D] text-brand-yellow border-none py-3 px-10 font-extrabold text-base cursor-pointer uppercase transition-all duration-200 hover:scale-105 hover:brightness-110 rounded-t-lg rounded-bl-lg [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)]">
            FALE CONOSCO
          </button>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="w-full block bg-brand-yellow">
        <img src="/img/banner_hero.png" alt="A Segurança que seus clientes exigem" className="w-full h-auto block m-0" />
      </section>

      {/* NAVEGAÇÃO DE CATEGORIAS */}
      <nav className="bg-transparent py-8 w-full" aria-label="Navegação de Categorias">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <Link href="/catalogo?filtro=óleo" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro <br></br>de Óleo
            </Link>

            <Link href="/catalogo?filtro=combustível" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro de<br></br> Combustível
            </Link>

            <Link href="/catalogo?filtro=ar" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro<br></br> de Ar
            </Link>

            <Link href="/catalogo?filtro=cabine" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro<br></br> de Cabine
            </Link>

            <Link href="/catalogo?filtro=kit" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Kit Troca<br></br> Completa
            </Link>

          </div>
        </div>
      </nav>

      <main>
        {/* SEÇÃO: MAIS VENDIDOS */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTRO DE AR</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">

            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full md:justify-center">
              {/* Loop dos Produtos do Supabase */}
              {produtosMaisVendidos.map((produto) => (
                <Link href={`/produto/${produto.procod}`} key={produto.procod} className="bg-white border border-[#ccc] rounded-lg p-5 min-w-[240px] max-w-[240px] text-center snap-center hover:-translate-y-2 transition-all duration-300 block">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img 
                      src={Array.isArray(produto.img_url) ? produto.img_url[0] : (produto.img_url || '/img/produto-placeholder.png')} 
                      alt={produto.title} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <h3 className="text-[1.1rem] font-bold mb-1 truncate text-gray-900">{produto.title}</h3>
                  <p className="text-[0.9rem] text-[#666] mb-4 font-semibold">Cód: {produto.procod}</p>
                  <div className="bg-brand-yellow text-dark border-none py-2.5 px-4 rounded font-bold cursor-pointer w-full text-[0.85rem] transition-all hover:brightness-90 uppercase">VER DETALHES</div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* SEÇÃO: SOBRE */}
        <section className="py-20">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-center">
            <div className="w-full lg:flex-[0_0_45%]">
              <div className="bg-brand-dark h-[320px] w-full rounded-t-2xl rounded-bl-2xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%)]"></div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-[1.8rem] lg:text-[2.2rem] font-black mb-6 text-black uppercase leading-[1.1]">SOBRE A PROFILTER</h2>
              <p className="text-[1.1rem] leading-[1.7] text-[#444] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO: BENEFÍCIOS */}
        <section className="pt-5 pb-15">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Envio Imediato e Frete Grátis</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Chega de prateleira vazia. Entregamos seu pedido em até<br className="hidden lg:block" />24 horas sem custo adicional de frete.</p>
            </article>
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Faturamento Estendido</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Condições de pagamento pensadas para o fluxo de<br className="hidden lg:block" />caixa da sua loja.</p>
            </article>
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Foco em Alto Giro</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Uma seleção estratégica de produtos, focando<br className="hidden lg:block" />exclusivamente nos filtros de linha leve com<br className="hidden lg:block" />maior giro no seu estoque</p>
            </article>
          </div>
        </section>

        {/* SEÇÃO: FILTROS DE COMBUSTÍVEL */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTROS DE COMBUSTÍVEL</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full md:justify-center">
              
              {produtosCombustivel.map((produto) => (
                <Link href={`/produto/${produto.procod}`} key={produto.procod} className="bg-white border border-[#ccc] rounded-lg p-5 min-w-[240px] max-w-[240px] text-center snap-center hover:-translate-y-2 transition-all duration-300 block">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img 
                      src={Array.isArray(produto.img_url) ? produto.img_url[0] : (produto.img_url || '/img/produto-placeholder.png')} 
                      alt={produto.title} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <h3 className="text-[1.1rem] font-bold mb-1 truncate text-gray-900">{produto.title}</h3>
                  <p className="text-[0.9rem] text-[#666] mb-4 font-semibold">Cód: {produto.procod}</p>
                  <div className="bg-brand-yellow text-dark border-none py-2.5 px-4 rounded font-bold cursor-pointer w-full text-[0.85rem] transition-all hover:brightness-90 uppercase">VER DETALHES</div>
                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* SEÇÃO: BANNERS PROMOCIONAIS */}
        <section className="py-10">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <Link href="#" className="block transition-all duration-200 hover:-translate-y-1 hover:brightness-95">
              <img src="/img/banner-mid.png" alt="Promoção focada em alto giro" loading="lazy" className="w-full h-auto block" />
            </Link>
            <Link href="#" className="block transition-all duration-200 hover:-translate-y-1 hover:brightness-95">
              <img src="/img/banner-mid.png" alt="Condições de faturamento" loading="lazy" className="w-full h-auto block" />
            </Link>
          </div>
        </section>

        {/* SEÇÃO: FILTROS DE ÓLEO */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTROS DE ÓLEO</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full md:justify-center">
              {produtosOleo.map((produto) => (
                <Link href={`/produto/${produto.procod}`} key={produto.procod} className="bg-white border border-[#ccc] rounded-lg p-5 min-w-[240px] max-w-[240px] text-center snap-center hover:-translate-y-2 transition-all duration-300 block">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img 
                      src={Array.isArray(produto.img_url) ? produto.img_url[0] : (produto.img_url || '/img/produto-placeholder.png')} 
                      alt={produto.title} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <h3 className="text-[1.1rem] font-bold mb-1 truncate text-gray-900">{produto.title}</h3>
                  <p className="text-[0.9rem] text-[#666] mb-4 font-semibold">Cód: {produto.procod}</p>
                  <div className="bg-brand-yellow text-dark border-none py-2.5 px-4 rounded font-bold cursor-pointer w-full text-[0.85rem] transition-all hover:brightness-90 uppercase">VER DETALHES</div>
                </Link>
              ))}

            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-brand-dark text-white py-[60px] w-full mt-10 border-t-[15px] border-brand-yellow">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1fr] gap-10 text-[0.9rem]">
          
          {/* Coluna 1 */}
          <div>
            <img src="/img/logo-branca.png" alt="Profilter Logo" loading="lazy" className="max-w-[180px] mb-5 block" />
            <p className="text-[#ccc] leading-[1.5] mb-6 pr-5 text-[0.95rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook"><img src="/img/icon-fb.png" alt="Facebook" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
              <a href="#" aria-label="Instagram"><img src="/img/icon-ig.png" alt="Instagram" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
              <a href="#" aria-label="LinkedIn"><img src="/img/icon-in.png" alt="LinkedIn" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
            </div>
          </div>

          {/* Coluna 2 */}
          <nav aria-label="Navegação Institucional">
            <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">INSTITUCIONAL</h4>
            <ul className="list-none">
              <li className="mb-4"><Link href="/politica-de-entrega" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Política de entrega</Link></li>
              <li className="mb-4"><Link href="/politica-de-privacidade" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Política de Privacidade</Link></li>
              <li className="mb-4"><Link href="/duvidas-frequentes" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Dúvidas Frequentes</Link></li>
              <li className="mb-4"><Link href="/trocas-e-devolucoes" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Trocas e devoluções</Link></li>
              <li className="mb-4"><Link href="/fale-conosco" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Fale Conosco</Link></li>
            </ul>
          </nav>

          {/* Coluna 3 */}
          <address className="not-italic">
            <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">ATENDIMENTO</h4>
            <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
              <img src="/img/icon-phone.png" alt="Telefone" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
              <div className="flex flex-col">
                <span className="text-[#999] text-[0.85rem] mb-0.5">Compre por telefone</span>
                <strong className="text-white text-base font-bold">(41) 0000-0000</strong>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
              <img src="/img/icon-wpp-yellow.png" alt="WhatsApp" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
              <div className="flex flex-col">
                <span className="text-[#999] text-[0.85rem] mb-0.5">Fale no WhatsApp</span>
                <span className="text-[#999] text-[0.75rem] mb-0.5">PROFILTER</span>
                <strong className="text-white text-base font-bold">(41) 99268-1533</strong>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
              <img src="/img/icon-mail.png" alt="E-mail" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
              <div className="flex flex-col">
                <span className="text-[#999] text-[0.85rem] mb-0.5">Envie um e-mail</span>
                <strong className="text-white text-base font-bold">contato@profilter.com.br</strong>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img src="/img/icon-pin.png" alt="Localização" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
              <div className="flex flex-col">
                <span className="text-[#999] text-[0.85rem] mb-0.5">Onde estamos</span>
              </div>
            </div>
          </address>

          {/* Coluna 4 */}
          <div>
            <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">FORMAS DE PAGAMENTO</h4>
            <img src="/img/pagamentos.png" alt="Cartões e Pix" loading="lazy" className="max-w-full mb-8 block" />
            
            <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base mt-5">SELOS DE SEGURANÇA</h4>
            <div className="flex flex-col gap-4">
              <img src="/img/selo-google.png" alt="Google Safe Browsing" loading="lazy" className="max-h-[30px] object-contain block" />
              <img src="/img/selo-loja.png" alt="Loja Protegida" loading="lazy" className="max-h-[30px] object-contain block" />
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÃO WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5541992681533" className="fixed bottom-5 right-5 lg:bottom-[30px] lg:right-[30px] w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] bg-brand-wpp rounded-full flex items-center justify-center shadow-[2px_4px_15px_rgba(0,0,0,0.2)] z-[50] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.3)] animate-[pulse-whatsapp_2s_infinite] hover:animate-none" target="_blank" rel="noopener noreferrer" aria-label="Atendimento via WhatsApp">
        <img src="/img/icon-whatsapp.png" alt="WhatsApp" loading="lazy" className="w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] object-contain block" />
      </a>

    </div>
  );
}
