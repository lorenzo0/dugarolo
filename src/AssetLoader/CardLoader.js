import React, {Component} from 'react';
import TodayCard from '../components/cards/Today/ItemTodayTab'
import {List} from '@material-ui/core';

class CardLoader extends Component{

    constructor(props){
        super(props);
        this.name = props.name;
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    //se è già stato fatto, non lo rifaccio
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( res => res.json())
            .then( json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            } );
    }

    render(){
        var {isLoaded, items} = this.state;

        if(!isLoaded)
            return <div> Loading... </div>;
        else{
            if(this.name == "Today"){
                return(
                    <div>
                        <List className='list'>
                                {items.map(item => (
                                    <li key={item.id}>
                                        <TodayCard name={item.name} farm_name={item.username} irrigation_time={item.email} canal_name={item.address.street} duration_time={item.address.suite}/>
                                    </li>
                                ))}
                        </List>
                    </div>
                );
            }else{
                return(
                    <div>
                        <List className='list'>
                                {items.map(item => (
                                    <li>
                                        
                                    </li>
                                ))}
                        </List>
                    </div>
                );
            }
        }
    }

}

export default CardLoader;
