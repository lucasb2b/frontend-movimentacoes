import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AcessarConta() {
  const [idConta, setIdConta] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('')
    if (!idConta.trim()) {
      setErro('Informe o UUID da conta.')
      return
    }
    navigate(`/conta/${idConta.trim()}`)
  }

  return (
    <div className="card p-4">
      <h3 className="text-center mb-4">Acessar Conta</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idConta" className="form-label">UUID da Conta</label>
          <input
            type="text"
            className="form-control"
            id="idConta"
            placeholder="Ex: 679af7c9-3d1e-4197-9357-27d2fd740b15"
            value={idConta}
            onChange={(e) => setIdConta(e.target.value)}
          />
        </div>
        {erro && <div className="alert alert-danger py-2">{erro}</div>}
        <button type="submit" className="btn btn-outline-primary w-100">
          Acessar Conta
        </button>
      </form>
    </div>
  )
}

export default AcessarConta