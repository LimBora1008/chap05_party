import logo from './logo.svg';
import './App.css';
import GitHubReposearch from './component/GitHubRepoSearch';
import GitHubRepoDataGrid from './component/GitHubRepoDataGrid';

function App() {
  return (
    <div className="App">
      <GitHubReposearch />

      <GitHubRepoDataGrid />
    </div>
  );
}

export default App;
