import React from 'react';

const NameSearch = (props) => {
    return (
        <div className="container">
            <h2>Поиск</h2>
            <input type="text" placeholder="Поиск по имени" value={props.value} onChange={props.onChange} />
        </div>
    );
};

export default NameSearch;