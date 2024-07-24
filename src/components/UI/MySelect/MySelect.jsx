import React from 'react';

const MySelect = React.forwardRef(({contentItems, getKey, value, props}, ref) => {
    if(!contentItems || !getKey) return ;

    return (
        <select {...props} ref={ref} defaultValue={value}>
            <option key={getKey()} value="">Default</option>
            {contentItems.map((item) => <option key={getKey()} value={item.name}>{item.name}</option>)}
        </select>
    );
});

export default MySelect;