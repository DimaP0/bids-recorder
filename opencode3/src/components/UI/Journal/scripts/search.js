/**
 * @param {[any]} arrItem  
 * @param {string} searchValue 
*/
function search(arrItem, searchValue){
    searchValue = searchValue.toLowerCase();
    return arrItem.filter((item) => item.address.toLowerCase().includes(searchValue) ||
                                            item.coords.toString().toLowerCase().includes(searchValue) ||
                                            item.crashType.toLowerCase().includes(searchValue) ||
                                            item.priority.toLowerCase().includes(searchValue) ||
                                            item.reporter.toLowerCase().includes(searchValue) ||
                                            item.phoneNumber.toLowerCase().includes(searchValue) 
                );
}
export default search;