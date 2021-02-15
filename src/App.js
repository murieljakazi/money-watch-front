
import './App.css';
import AccountOverview from './components/AccountOverview/AccountOverview';
import TransactionInput from './components/TransactionInput/TransactionInput';
import TransactionDisplay from './components/TransactionDisplay/TransactionDisplay';

function App() {
  return (
    <div className="App">
      <h1>Money Watch</h1>
      <AccountOverview />
      <TransactionInput />
      <TransactionDisplay />
    </div>
  );
}

export default App;
