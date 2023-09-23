import { NumberBoard, ObjectBoard, StringBoard } from './components';

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridColumn: 3,
        gap: 2,
      }}
    >
      <NumberBoard />
      <StringBoard />
      <ObjectBoard />
    </div>
  );
}
