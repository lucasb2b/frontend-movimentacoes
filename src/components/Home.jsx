import CriarConta from './CriarConta'
import AcessarConta from './AcessarConta'

function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4 mb-4">
        <CriarConta />
      </div>
      <div className="col-md-6 col-lg-5 mb-4">
        <AcessarConta />
      </div>
    </div>
  )
}

export default Home