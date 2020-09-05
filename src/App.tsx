import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div>
      <Button type="primary">primary</Button>
      <Button type="danger">danger</Button>
      <Button type="default" size="lg">
        default && lg
      </Button>
      <Button disabled size="sm">
        disabled && sm
      </Button>
      <Button type="link" href="https://www.baidu.com">
        百度
      </Button>
      <Button type="link" href="https://www.baidu.com" disabled>
        disabled link
      </Button>
    </div>
  );
}

export default App;
