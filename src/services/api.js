const BASE_URL = `${import.meta.env.VITE_API_URL}/v1`;

export const criarConta = async (idClient) => {
  const response = await fetch(`${BASE_URL}/contas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idClient })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao criar conta');
  }
  return response.json();
};

export const consultarConta = async (idConta) => {
  const response = await fetch(`${BASE_URL}/contas/${idConta}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Conta não encontrada');
  }
  return response.json();
};

export const realizarTransacao = async (transacao) => {
  const response = await fetch(`${BASE_URL}/transacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transacao)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro na transação');
  }
  return response.json();
};

export const consultarExtrato = async (idConta) => {
  const response = await fetch(`${BASE_URL}/contas/${idConta}/extrato`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao carregar extrato');
  }
  return response.json();
};