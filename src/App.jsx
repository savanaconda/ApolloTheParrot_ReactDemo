
import defaultParrot from './images/default-parrot.svg';
import leaningParrot from './images/leaning-parrot.svg';
import rock1 from './images/rock1.png';
import rock2 from './images/rock2.png';
import shrek1 from './images/shrek1.png';
import metal1 from './images/metal1.png';
import glass1 from './images/glass1.png';
import glass2 from './images/glass2.png';
import './App.css';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

function App() {

  const imageAnswersMap = new Map([
    [rock1, 'ROCK'],
    [rock2, 'ROCK'],
    [shrek1, 'SHREK'],
    [metal1, 'METAL'],
    [glass1, 'GLASS'],
    [glass2, 'GLASS'],
  ]);

  const draggableRock1 = (
    <Draggable id="rock1">
      <Icon imageSource={rock1} imageName="rock1" />
    </Draggable>
  );
  const draggableRock2 = (
    <Draggable id="rock2">
      <Icon imageSource={rock2} imageName="rock2" />
    </Draggable>
  );
  const draggableShrek1 = (
    <Draggable id="shrek1">
      <Icon imageSource={shrek1} imageName="shrek1" />
    </Draggable>
  );
  const draggableGlass1 = (
    <Draggable id="glass1">
      <Icon imageSource={glass1} imageName="glass1" />
    </Draggable>
  );
  const draggableGlass2 = (
    <Draggable id="glass2">
      <Icon imageSource={glass2} imageName="glass2" />
    </Draggable>
  );
  const draggableMetal1 = (
    <Draggable id="metal1">
      <Icon imageSource={metal1} imageName="metal1" />
    </Draggable>
  );

  const [parent, setParent] = useState(null);
  const [apolloPhoto, setApolloPhoto] = useState(defaultParrot);
  const [answer, setAnswer] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <header className="App-header">
          <h2>
            Give Apollo an item to identify<br />
          </h2>
        </header>
        <section className="Apollo-section">
          <img src={apolloPhoto} className="Apollo-photo" alt="parrot" />
          <Droppable id="droppable">
            {parent === "droppable" ? currentItem : 'Drop here'}
          </Droppable>
          <div className="Apollo-answer">{answer}</div>
        </section>
        <section>
          <h3> Items:</h3>
          <section className="Items-section">
            {!parent ? draggableRock1 : null}
            {!parent ? draggableRock2 : null}
            {!parent ? draggableShrek1 : null}
            {!parent ? draggableGlass1 : null}
            {!parent ? draggableGlass2 : null}
            {!parent ? draggableMetal1 : null}
          </section>
        </section>

        <header className="App-header">
          <a
            className="App-link"
            href="https://apolloandfrens.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn about Apollo on his website
          </a>
        </header>
      </div >
    </DndContext>
  );

  function handleDragEnd({ active, over }) {
    // setCurrentItem(active ? active : null);
    setParent(over ? over.id : null);
    setTimeout(function () {
      setApolloPhoto(over ? leaningParrot : defaultParrot);
    }, 1000);
    setAnswer(over ? imageAnswersMap.get(over.id) : '');
  }

  function Icon(props) {
    return <img src={props.imageSource} className="Item" alt={props.imageName} />;
  }
}

export default App;



