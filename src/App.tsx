import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div>
      <Button btnType="primary">primary</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="default" size="lg">
        default && lg
      </Button>
      <Button disabled size="sm">
        disabled && sm
      </Button>
      <Button btnType="link" href="https://www.baidu.com" target="_blank">
        百度
      </Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>
        disabled link
      </Button>
    </div>
  );
}

export default App;
