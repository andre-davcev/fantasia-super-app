// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from './nx-welcome';

import { Button } from '@shadcn/components';

export function App() {
  return (
    <div>
      <Button variant="destructive">
        Primary Button
      </Button>
      <NxWelcome title="xrpl-course-react" />
    </div>
  );
}

export default App;
