import React from 'react';
import Mapa from './components/Mapa';
import Grafico from './components/Grafico';


export default props => (

  <div className='App'>
    <div className='grafico'>
      <p>Estatísticas</p>
      <Grafico></Grafico>
    </div>
    <Mapa></Mapa>
  </div>

);


