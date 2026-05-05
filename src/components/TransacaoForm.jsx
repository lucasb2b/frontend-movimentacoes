import { useState } from 'react'
import { realizarTransacao } from '../services/api'

const TIPOS = ['DEPOSITO', 'SAQUE', 'TRANSFERENCIA']

function TransacaoForm({ idConta, onTransacaoRealizada }) {
  const [tipo, setTipo] = useState('DEPOSITO')
  const [valor, setValor] = useState('')
  const [idAccountDestination, setIdAccountDestination] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [loading, setLoading] = useState(false)

  const precisaOrigem = tipo === 'SAQUE' || tipo === 'TRANSFERENCIA'
  const precisaDestino = tipo === 'DEPOSITO' || tipo === 'TRANSFERENCIA'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')
    if (!valor || Number(valor) <= 0) {
      setErro('Informe um valor positivo.')
      return
    }
    if (precisaDestino && !idAccountDestination.trim()) {
      setErro('Informe o UUID da conta destino.')
      return
    }

    const transacao = {
      transactionType: tipo,
      amount: Number(valor),
      description: descricao || undefined
    }

    if (precisaOrigem) transacao.idAccountSource = idConta
    if (precisaDestino) transacao.idAccountDestination = idAccountDestination.trim()

    setLoading(true)

    console.log(transacao)

    try {
      await realizarTransacao(transacao)
      setSucesso(`${tipo} realizado com sucesso!`)
      setValor('')
      setIdAccountDestination('')
      setDescricao('')
      if (onTransacaoRealizada) onTransacaoRealizada()
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Nova Transação</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {precisaDestino && (
            <div className="mb-3">
              <label className="form-label">UUID Conta Destino</label>
              <input
                type="text"
                className="form-control"
                value={idAccountDestination}
                onChange={(e) => setIdAccountDestination(e.target.value)}
                placeholder="UUID da conta destino"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Descrição (opcional)</label>
            <input
              type="text"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Pagamento Internet"
            />
          </div>

          {erro && <div className="alert alert-danger py-2">{erro}</div>}
          {sucesso && <div className="alert alert-success py-2">{sucesso}</div>}

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Processando...' : 'Realizar Transação'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransacaoForm