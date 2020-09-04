import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div>
      <Button type="primary" size="lg">
        primary
      </Button>
      <Button type="danger">danger</Button>
      <Button type="link" href="https://www.baidu.com">
        百度
      </Button>
    </div>
  );
}

export default App;
