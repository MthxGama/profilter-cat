'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../src/lib/supabase';

export default function AdminCadastro() {
  // Estado para os campos de texto
  const [produto, setProduto] = useState({
    title: '',
    description: '',
    procod: '',
    applications: '',
    codvar: '',
  });

  // Estado para o arquivo da imagem física
  const [foto, setFoto] = useState<File | null>(null);
  
  // Estado para o visual do botão (loading)
  const [salvando, setSalvando] = useState(false);

  const router = useRouter();

useEffect(() => {
  const verificarAcesso = async () => {
    // Pergunta ao Supabase se tem alguém logado agora
    const { data: { session } } = await supabase.auth.getSession();

    // Se não tiver sessão, manda o invasor para a tela de login
    if (!session) {
      router.push('/login');
    }
  };

  verificarAcesso();
}, [router]);

  // Atualiza os textos conforme o usuário digita
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza a foto quando o usuário escolhe um arquivo
  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFoto(e.target.files[0]);
    }
  };

  // O motor que envia tudo para o Supabase
  const handleSalvar = async (e: FormEvent) => {
    e.preventDefault();
    setSalvando(true); // Muda o botão para "Salvando..."

    try {
      let urlDaImagemGerada = '';

      // PASSO 1: Se o usuário escolheu uma foto, vamos subir ela primeiro
      if (foto) {
        // Cria um nome único para não substituir outra foto com o mesmo nome
        const extensao = foto.name.split('.').pop();
        const nomeUnico = `${Date.now()}-${Math.random()}.${extensao}`;

        // Faz o upload para o bucket chamado 'produtos'
        const { error: uploadError } = await supabase.storage
          .from('produtos')
          .upload(nomeUnico, foto);

        if (uploadError) {
          throw new Error('Erro ao fazer upload da imagem: ' + uploadError.message);
        }

        // Pega o link público da imagem que acabou de subir
        const { data: publicUrlData } = supabase.storage
          .from('produtos')
          .getPublicUrl(nomeUnico);

        urlDaImagemGerada = publicUrlData.publicUrl;
      }

      // PASSO 2: Salva os textos + o link da imagem na tabela 'products'
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          {
            title: produto.title,
            description: produto.description,
            procod: produto.procod,
            applications: produto.applications,
            codvar: produto.codvar,
            img_url: urlDaImagemGerada,
          },
        ]);

      if (insertError) {
        throw new Error('Erro ao salvar no banco: ' + insertError.message);
      }

      // PASSO 3: Sucesso! Limpa o formulário e avisa o usuário
      alert('Produto cadastrado com sucesso!');
      setProduto({ title: '', description: '', procod: '', applications: '', codvar: '' });
      setFoto(null);
      // Limpa o input de arquivo (hackzinho de DOM)
      (document.getElementById('input-foto') as HTMLInputElement).value = '';

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Ocorreu um erro inesperado.');
    } finally {
      setSalvando(false); // Volta o botão ao normal
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Produto</h1>
          <p className="text-gray-500 text-sm mt-1">Preencha os dados técnicos e a imagem do item.</p>
        </div>

        <form onSubmit={handleSalvar} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Título do Produto</label>
              <input
                type="text" name="title" value={produto.title} onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Código (procod)</label>
              <input
                type="text" name="procod" value={produto.procod} onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Variação (codvar)</label>
            <input
              type="text" name="codvar" value={produto.codvar} onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Aplicações</label>
            <input
              type="text" name="applications" value={produto.applications} onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Descrição Detalhada</label>
            <textarea
              name="description" value={produto.description} onChange={handleChange} rows={4}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* O CAMPO DE IMAGEM */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Foto do Produto</label>
            <input
              id="input-foto"
              type="file" 
              accept="image/*" // Aceita apenas imagens
              onChange={handleFotoChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 px-4 py-3 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors mt-4 text-white
              ${salvando ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {salvando ? 'Salvando imagem e dados...' : 'Salvar Produto'}
          </button>

        </form>
      </div>
    </div>
  );
}