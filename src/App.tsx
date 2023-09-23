import { NumberBoard, ObjectBoard, StringBoard } from './components';

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <NumberBoard />
      <StringBoard />
      <ObjectBoard />
    </div>
  );
}
