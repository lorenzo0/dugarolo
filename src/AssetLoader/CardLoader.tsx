import React, {Component, useState, useEffect} from 'react';
import TodayCard from '../components/cards/Today/ItemTodayTab'
import {List} from '@material-ui/core';

interface ContainerProps {
    name: string;
}
  
const CardLoader:React.FC<ContainerProps> = ({ name }) => {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [jsonReq, setJsonReq] = React.useState<any[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then( res => res.json())
        .then( json => {setJsonReq(json);})
        .then(() => setIsLoaded(true))
        .then(() => console.log(isLoaded));
    }, [isLoaded]);
    

    const deleteEventToday = (id) => {
        const newList = jsonReq.filter((item) => item.id !== id);
        setJsonReq(newList);
    }

    return jsonReq && (
        <div>
            <List className='list'>
                {jsonReq.map(item => (
                    <TodayCard 
                        id={item.id} 
                        name={item.name} 
                        farm_name={item.username} 
                        irrigation_time={item.email} 
                        canal_name={item.address.street} 
                        duration_time={item.address.suite} 
                        active={false}
                        delEvent={() => deleteEventToday(item.id)}
                    />
                ))}
            </List>
        </div>
    )
}

export default CardLoader;