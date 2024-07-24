import React, { useState } from "react";
import MyModal from "../Modal/MyModal";
import search from "./scripts/search";
import {navigate} from '../../../App'
import Pagination from "../Pagination/Pagination";


let key = 0;
function getKey() {
    return (key = key + 1);
}

function searchIndex(id,  journalItems){
    for (let i = 0; i < journalItems.length; i++){
        if (journalItems[i].id == id) {
            // сравнение с приведением типов
            return i;
        }
    }
}

const MyJournal = ({ journalItems, add, addMap, index, props }) => {
    const [modal, setModal] = useState('');
    const [searchValue, setSearch] = useState('');

    //console.log(addMap)   // good

    return (
        <nav>
            <div>
            {modal}
            <input 
                type="text" 
                placeholder="Поиск 🔎" 
                value={searchValue}
                onChange={e => setSearch(e.target.value)}
            />
            
            <button onClick={() => {setModal(<MyModal 
                                                setModalFn={setModal}
                                                getKey={getKey}
                                                callbackFn={add}
                                                index = {journalItems.length}
                                                defaultInputValue={{coords:0}}
                                                addMap = {addMap}
                                            />)
                                            navigate('/statement/add', {replace: false})
                                        }
                            }>
                        
                Добавить запись
            </button>

            <hr />
            <Pagination 
                arrData = {search(journalItems, searchValue)}
                setModal = {setModal}
                getKey = {getKey}
                addMap = {addMap}
                add = {add}
                searchValue = {searchValue}
            />
            
        </div>
        </nav>
    );
};

export default MyJournal;
export {searchIndex, getKey};

// key ~ coords подразумевается, что другая авария произойдет не в точно той же точке карты