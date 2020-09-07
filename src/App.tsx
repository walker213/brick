import React from 'react';
import Button from './components/Button';
import Menu from './components/Menu';

function App() {
  return (
    <div>
      <section>
        <h1>Button</h1>
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
        <Button btnType="link">百度無連接</Button>
        <Button btnType="link" href="https://www.baidu.com" disabled>
          disabled link
        </Button>
      </section>
      <section>
        <h1>Menu</h1>
        <Menu />
      </section>
    </div>
  );
}

export default App;
