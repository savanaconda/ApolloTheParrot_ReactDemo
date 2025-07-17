
import defaultParrot from './images/default-parrot.svg';
import leaningParrot from './images/leaning-parrot.svg';
import rock1 from './images/rock1.png';
import rock2 from './images/rock2.png';
import shrek1 from './images/shrek1.png';
import metal1 from './images/metal1.png';
import glass1 from './images/glass1.png';
import glass2 from './images/glass2.png';
import rockAudio from './audio/rock.mp3';
import metalAudio from './audio/metal.mp3';
import glassAudio from './audio/glass.mp3';
import shrekAudio from './audio/shrek.mp3';
import './App.css';
import { use, useState } from 'react';
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

function App() {

  const rock1Name = 'rock1';
  const rock2Name = 'rock2';
  const shrek1Name = 'shrek1';
  const metal1Name = 'metal1';
  const glass1Name = 'glass1';
  const glass2Name = 'glass2';

  const imageAnswersMap = new Map([
    [rock1Name, 'ROCK'],
    [rock2Name, 'ROCK'],
    [shrek1Name, 'SHREK'],
    [metal1Name, 'METAL'],
    [glass1Name, 'GLASS'],
    [glass2Name, 'GLASS'],
  ]);

  const audioMap = new Map([
    [rock1Name, rockAudio],
    [rock2Name, rockAudio],
    [shrek1Name, shrekAudio],
    [metal1Name, metalAudio],
    [glass1Name, glassAudio],
    [glass2Name, glassAudio],
  ]);

  const DraggableItem = ({ id, imageSource, imageName }) => (
    <Draggable id={id}>
      <Icon imageSource={imageSource} imageName={imageName} />
    </Draggable>
  );

  const [objects, setObjects] = useState(new Map([
    [rock1Name, DraggableItem({ id: rock1Name, imageSource: rock1, imageName: rock1Name })],
    [rock2Name, DraggableItem({ id: rock2Name, imageSource: rock2, imageName: rock2Name })],
    [shrek1Name, DraggableItem({ id: shrek1Name, imageSource: shrek1, imageName: shrek1Name })],
    [glass1Name, DraggableItem({ id: glass1Name, imageSource: glass1, imageName: glass1Name })],
    [glass2Name, DraggableItem({ id: glass2Name, imageSource: glass2, imageName: glass2Name })],
    [metal1Name, DraggableItem({ id: metal1Name, imageSource: metal1, imageName: metal1Name })],
  ]));

  const [apolloPhoto, setApolloPhoto] = useState(defaultParrot);
  const [answerText, setAnswerText] = useState('');
  const [currentDroppedItemId, setCurrentDroppedItemId] = useState(null);


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
            {console.log(`Current dropped item ID: ${currentDroppedItemId}`)}
            {console.log(`Current dropped item ID: ${objects.get(currentDroppedItemId)}`)}
            {currentDroppedItemId === null ? 'Drop here' : objects.get(currentDroppedItemId)}
          </Droppable>
          <div className="Apollo-answer">{answerText}</div>
        </section>
        <section>
          <h3> Items:</h3>
          <section className="Items-section">
            {objects.values().map((object, index) => (
              < div key={index} className="object-box" >
                {object}
              </div>
            ))}
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
    </DndContext >
  );

  function handleDragEnd({ active, over }) {
    setAnswerText(''); // Clear previous answer
    setCurrentDroppedItemId(over ? active.id : null);

    setTimeout(function () {
      setApolloPhoto(over ? leaningParrot : defaultParrot);
      setTimeout(function () {
        setApolloPhoto(defaultParrot);
        setAnswerText(over ? imageAnswersMap.get(active.id) : '');
        if (over) {
          let audio = new Audio(audioMap.get(active.id));
          audio.play();
        }
      }, 1000);
    }, 1000);
  }

  function Icon(props) {
    return <img src={props.imageSource} className="Item" alt={props.imageName} />;
  }
}

export default App;



