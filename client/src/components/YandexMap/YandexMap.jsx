import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

function YandexMap () { 

  const mapData = {
    center: [59.943683, 30.360164],
    zoom: 15,
  };

  const coordinates = [
    [59.943683, 30.360164] // добавить координаты пользователя?
  ];


  
  
  return (
    <YMaps>
      <div>
        <Map defaultState={{ width:'1000px', height: '500px', center: mapData.center, zoom: mapData.zoom,  }} width={'100%'}  height={'520px'}>
        {coordinates.map(coordinate => <Placemark key={uuidv4()} geometry={coordinate} />)}
        </Map>
      </div>
    </YMaps>
  );
}

export default YandexMap;
