import React from 'react';
import getMap from './map';
import { arrBidJS } from '../../../Navigation';

const MyMap = () => {

    if (!document.getElementById('map')) {
        let divMap = document.createElement('div');
        divMap.id = 'map'
        document.body.appendChild(divMap)
    }
    if (document.getElementById('map')){
        if (!document.getElementById('map').children.length){
            getMap("map", arrBidJS);
        }
    }
    return (
        <></>
    );
};

export default MyMap;