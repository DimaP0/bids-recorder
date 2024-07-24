import React, { useRef } from "react";
import "./MyModal.modules.css";
import MySelect from "../MySelect/MySelect";
import crashTypeList from "./data/crashType";
import priorityTypeList from "./data/priority";

const MyModal = ({ callbackFn, index, defaultInputValue, setModalFn, addMap, getKey, props }) => {
    const modalAddress = useRef();
    const modalCoords = useRef();
    const modalCrashType = useRef();
    const modalPriority = useRef();
    const modalReporter = useRef();
    const modalPhoneNumber = useRef();

    //console.log(addMap)

    function modalFn() {
        
        const coords = modalCoords.current.attributes.value.value.split(',');
/*
        if (!modalAddress.current.value) modalAddress.current.value = defaultInputValue.address;
        if (!modalReporter.current.value) modalReporter.current.value = defaultInputValue.reporter;
        if (!modalPhoneNumber.current.value) modalPhoneNumber.current.value = defaultInputValue.phoneNumber;
*/
        if (   
                (!Number(coords[0]) && !defaultInputValue.coords)
            || (!Number(coords[1]) && !defaultInputValue.coords)
            || (!modalCrashType.current.value && !defaultInputValue.modalCrashType)
            || (!modalPriority.current.value && !defaultInputValue.modalPriority)
          
        ) {

            console.log(
                [modalAddress.current.value,
                [Number(coords[0]), Number(coords[1])],
                modalCrashType.current.value,
                modalPriority.current.value,
                modalReporter.current.value,
                modalPhoneNumber.current.value]
            )
            alert("Пожалуйста, введите все данные");
            return;
        }    

        if (!modalAddress.current.value) modalAddress.current.value = defaultInputValue.address;
        if (!modalReporter.current.value) modalReporter.current.value = defaultInputValue.reporter;
        if (!modalPhoneNumber.current.value) modalPhoneNumber.current.value = defaultInputValue.phoneNumber;

        callbackFn(index, {
            address: modalAddress.current.value,
            coords: [Number(coords[0]), Number(coords[1])],
            crashType: modalCrashType.current.value,
            priority: modalPriority.current.value,
            reporter: modalReporter.current.value,
            phoneNumber: modalPhoneNumber.current.value,
            id: getKey(),
        });
        setModalFn(""); // закрытие модального окна
    }
    /*
    if (!defaultInputValue.address) defaultInputValue.address = 'Адрес:';
    if (!defaultInputValue.crashType) defaultInputValue.crashType = 'Тип Аварии:';
    if (!defaultInputValue.priority) defaultInputValue.priority = 'Приоритет:';
    if (!defaultInputValue.reporter) defaultInputValue.reporter = 'Сообщил:';
    if (!defaultInputValue.phoneNumber) defaultInputValue.phoneNumber = 'Номер телефона:';
    */
    return (
        <div className="modalItem">
            <div className="modalItemChild">
                <h2>Введите новые данные</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <input
                                    ref={modalAddress}
                                    placeholder={defaultInputValue.address ? defaultInputValue.address : 'Адрес: '}
                                ></input>
                                <input
                                    ref={modalReporter}
                                    placeholder={defaultInputValue.reporter ? defaultInputValue.reporter : 'Сообщил: ' }
                                ></input>
                                <input
                                    ref={modalPhoneNumber}
                                    placeholder={defaultInputValue.phoneNumber ? defaultInputValue.phoneNumber : 'Номер телефона: '}
                                ></input>
                            </th>
                            <th>
                                <MySelect
                                    contentItems={crashTypeList}
                                    getKey={getKey}
                                    ref={modalCrashType}
                                    value={defaultInputValue.crashType}
                                />
                            </th>
                            <th>
                                <MySelect
                                    contentItems={priorityTypeList}
                                    getKey={getKey}
                                    ref={modalPriority}
                                    value={defaultInputValue.priority}
                                />
                            </th>
                            <th>
                                <div value={defaultInputValue.coords} ref={modalCoords} id='modalMap'></div>
                                <button onClick={(e)=> {
                                    //modalCoords.current.attributes.value.value = addMap('modalMap', [defaultInputValue]);
                                    addMap('modalMap', [defaultInputValue], true);
                                    e.currentTarget.remove();
                                }
                                }>Показать карту</button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <button onClick={modalFn}>Готово</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyModal;

// address: "1", coords: "12", crashType: "1", priority: "3", reporter: "6", phoneNumber: "456"
