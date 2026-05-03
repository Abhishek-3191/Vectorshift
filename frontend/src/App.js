import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
