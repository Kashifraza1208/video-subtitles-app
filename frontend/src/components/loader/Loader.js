import ClipLoader from "react-spinners/ClipLoader";

function App() {
  return (
    <div className="sweet-loading">
      <ClipLoader size={16} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}

export default App;
