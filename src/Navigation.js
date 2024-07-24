import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import MyJournal from './components/UI/Journal/MyJournal';
import MyMap from './components/UI/MyMap/MyMap.jsx'

import "./App/modules.App.css";
import getMap from "./components/UI/MyMap/map.js";
import MyModal from './components/UI/Modal/MyModal.jsx';

import {getKey, searchIndex} from './components/UI/Journal/MyJournal.jsx' 

const arrBidJS = [
    {
        address: "Пушкина",
        coords: [39.693155, 47.220394],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -26,
    },
    {
        address: "Гоголя",
        coords: [39.711486, 47.238037],
        crashType: "Колонка уличная",
        priority: "4 - Низкий",
        reporter: "Дмитрий",
        phoneNumber: "845",
        id: -24,
    },
    {
        address: "Пирожков",
        coords: [39.726777, 47.228487],
        crashType: "Закупорка",
        priority: "2 - Высокий",
        reporter: "Александр",
        phoneNumber: "151",
        id: -6,
    },
    {
        address: "Некрасова",
        coords: [39.703255, 47.3003],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -100,
    },
    {
        address: "Штерна",
        coords: [39.693355, 47.19354],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -101,
    },
    {
        address: "Фрунзе",
        coords: [39.714155, 47.251394],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -102,
    },
    {
        address: "Гончарова",
        coords: [39.673159, 47.240494],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -103,
    },
    {
        address: "Толстого",
        coords: [39.653655, 47.220354],
        crashType: "Утечка",
        priority: "3 - Средний",
        reporter: "Виктор",
        phoneNumber: "456",
        id: -104,
    },
]; // массив заявок
function addBid(index = arrBidJS.length, newBid) {
    arrBidJS[index] = newBid;
}

const Navigation = () => {

    const data = arrBidJS.map( (bid) => {
        const path = '/statement/' + bid.id;
        return <Route key={bid.id} path={path} element={<MyModal
                                            getKey={getKey}
                                            callbackFn={addBid}
                                            index = {searchIndex(bid.id, arrBidJS)}
                                            defaultInputValue={arrBidJS[searchIndex(bid.id, arrBidJS)]}
                                            addMap = {getMap}
                                        />} 
        /> 
    });
    console.log(arrBidJS.length)
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
            <Route path="statement" element={<MyJournal
                                        journalItems={arrBidJS}
                                        add={addBid}
                                        addMap={getMap}
                                    />} 
            >
                <Route path='/statement/add' element={<MyModal/>} />

                {data}
            </Route>

            <Route path="map" element={<MyMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
    );
};

export default Navigation;
export {arrBidJS};