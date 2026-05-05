import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { consultarConta } from '../services/api'
import TransacaoForm from './TransacaoForm'
import Extrato from './Extrato'

function PainelConta() {
  const { idConta } = useParams()
  const [conta, setConta] = useState(null)
  const [erro, setErro] = useState('')
  const [mostrarExtrato, setMostrarExtrato] = useState(false)

  const carregarConta = async () => {
    try {
      const dados = await consultarConta(idConta)
      setConta(dados)
    } catch (err) {
      setErro(err.message)
    }
  }

  useEffect(() => {
    carregarConta()
  }, [idConta])

  if (erro) return <div className="alert alert-danger">{erro}</div>
  if (!conta) return <div className="text-center mt-5">Carregando conta...</div>

  return (
    <div>
      <Link to="/" className="btn btn-outline-secondary mb-3">← Nova conta</Link>

      <div className="card mb-4">
        <div className="card-body">
          <h4>Conta {conta.accountNumber}</h4>
          <p><strong>Agência:</strong> {conta.agencyNumber}</p>
          <p><strong>Saldo:</strong> R$ {Number(conta.balance).toFixed(2)}</p>
          <p className="text-muted small">ID: {conta.idAccount}</p>
        </div>
      </div>

      <TransacaoForm idConta={idConta} onTransacaoRealizada={carregarConta} />

      <div className="mt-3">
        <button
          className="btn btn-info"
          onClick={() => setMostrarExtrato(!mostrarExtrato)}
        >
          {mostrarExtrato ? 'Ocultar Extrato' : 'Ver Extrato'}
        </button>
      </div>

      {mostrarExtrato && <Extrato idConta={idConta} />}
    </div>
  )
}

export default PainelConta