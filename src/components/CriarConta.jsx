import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarConta } from '../services/api'

function CriarConta() {
  const [idClient, setIdClient] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (!idClient.trim()) {
      setErro('Informe o UUID do cliente.')
      return
    }
    setLoading(true)
    try {
      const conta = await criarConta(idClient.trim())
      navigate(`/conta/${conta.idAccount}`)
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
        <div className="card p-4">
          <h3 className="text-center mb-4">Abrir Conta</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="idClient" className="form-label">UUID do Cliente</label>
              <input
                type="text"
                className="form-control"
                id="idClient"
                placeholder="Ex: 082f31a9-08cc-40ea-8739-cd33bcd81f21"
                value={idClient}
                onChange={(e) => setIdClient(e.target.value)}
              />
            </div>
            {erro && <div className="alert alert-danger py-2">{erro}</div>}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Conta'}
            </button>
          </form>
        </div>
    </div>
  )
}

export default CriarConta