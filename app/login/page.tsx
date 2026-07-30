'use client';

import { useState } from 'react';
import { supabase } from '../../src/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleEntrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    // Chama o Supabase para validar o e-mail e a senha
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErro('E-mail ou senha incorretos.');
      setCarregando(false);
    } else {
      // Se deu certo, joga o usuário para a página de admin
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Acesso Restrito</h1>
        
        <form onSubmit={handleEntrar} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {erro && <p className="text-red-500 text-sm font-medium">{erro}</p>}

          <button
            type="submit" disabled={carregando}
            className={`w-full font-semibold py-3 px-4 rounded-lg mt-4 text-white transition-colors
              ${carregando ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {carregando ? 'Validando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}