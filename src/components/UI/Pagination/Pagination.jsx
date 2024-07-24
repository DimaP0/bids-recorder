import React, { useState, useMemo } from 'react';
import classes from "../Journal/MyJournal.module.css";
import { searchIndex } from '../Journal/MyJournal';
import MyModal from '../Modal/MyModal';
import { navigate } from '../../../App';


/**@param {any[]} arrData */
const Pagination = ({arrData, setModal, getKey, addMap, add, searchValue},  props) => {
    const pageSize = 3;
    const [pageNum, setPageNum] = useState(0);
    console.log(arrData);

    function increment() {
        if (pageNum < (arrData.length / pageSize) - 1){
            setPageNum(pageNum + 1);
        }
    }
    function decrement() {
        if (pageNum > 0){
            setPageNum(pageNum - 1)
        }
    }

    const fn = useMemo( () => {
        setPageNum(0);
        console.log('num: ' + pageNum)
        return ;
    }, [searchValue]);

    let min = pageSize * pageNum;
    let max = min + (pageSize);
    if (max > arrData.length) max = min + (arrData.length % pageSize);  

    let pageData = arrData.slice(min, max);
    
    // данные: search(journalItems, searchValue)

    return (
        <div {...props}>
            {pageData.map((ch) => (
                <div 
                    key={ch.id}
                    className={classes.journalItemClass}
                    onClick={(e) => {setModal(<MyModal 
                                                    setModalFn={setModal}
                                                    getKey={getKey}
                                                    callbackFn={add}
                                                    index = {searchIndex(e.currentTarget.attributes.value.value, arrData)}
                                                    defaultInputValue={arrData[searchIndex(e.currentTarget.attributes.value.value, arrData)]}
                                                    addMap = {addMap}
                                        />);
                                        if (ch.id < 0){
                                            /* 
                                            routing работает корректно только со значениями по умолчанию (у каждого из них id < 0),
                                            Для которых есть путь в route с корректным адресом в path (файл Navigation.js),
                                            по этой причине введены ограничения
                                            иначе не получится сопоставить адрес с компонентом и отрисовать компонент  
                                            */
                                            const path = '/statement/' + ch.id;
                                            navigate(path, {replace: true})
                                        }                                            
                                    }
                    }
                    value = {ch.id}
                >
                    <table value={ch.id}>
                        <tbody>
                            <tr>
                                <th>
                                    <h4>{"Адрес: " + ch.address}</h4>
                                </th>
                                <th>
                                    <h4>{"coords: " + ch.coords}</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h4>{"Сообщил: " + ch.reporter}</h4>
                                </th>
                                <th>
                                    <h4>{"Приоритет: " + ch.priority}</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h4>{"Телефон: " + ch.phoneNumber}</h4>
                                </th>
                                <th>
                                    <h4>{"Тип аварии: " + ch.crashType}</h4>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            
            <span onClick={() => increment()}>Следующая→</span>
            <span>Страница:{pageNum + 1}</span>
            <span onClick={() => decrement()}>←Предыдущая</span>
            
        </div>
    );
};

export default Pagination;