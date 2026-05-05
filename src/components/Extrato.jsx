import { useState, useEffect } from 'react'
import { consultarExtrato } from '../services/api'

function Extrato({ idConta }) {
  const [transacoes, setTransacoes] = useState([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await consultarExtrato(idConta)
        setTransacoes(dados.content)
      } catch (err) {
        setErro(err.message)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [idConta])

  if (loading) return <div className="text-center mt-3">Carregando extrato...</div>
  if (erro) return <div className="alert alert-danger mt-3">{erro}</div>

  if (transacoes.length === 0) {
    return <div className="alert alert-secondary mt-3">Nenhuma transação encontrada.</div>
  }

  return (
    <div className="mt-4">
      <h5>Extrato de Transações</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor (R$)</th>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>ID Transação</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.idTransaction}>
                <td><span className={`badge ${t.tipo === 'DEPOSITO' ? 'bg-success' : t.transactionType === 'SAQUE' ? 'bg-danger' : 'bg-primary'}`}>{t.transactionType}</span></td>
                <td>{Number(t.amount).toFixed(2)}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{t.transactionStatus}</td>
                <td className="text-truncate" style={{maxWidth: '150px'}} title={t.idTransaction}>{t.idTransaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Extrato