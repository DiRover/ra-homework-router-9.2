import './App.css';
import Crud from './components/Crud';
import CrudProvider from '../src/context/CrudProvider';

function App() {
  return (
    <div className="page">
      <CrudProvider>
        <Crud />
      </CrudProvider>
    </div>
  );
}

export default App;
