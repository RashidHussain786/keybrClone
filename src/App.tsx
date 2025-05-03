import { LayoutGroup } from './components/LayoutGroup';
import { TypingTest } from './components/TypingTest';

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300 flex flex-col">
      <LayoutGroup />
      <TypingTest />
    </div>
  );
}

export default App;