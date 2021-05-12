import React, {Component, useState, useEffect} from 'react';
import TodayCard from '../components/cards/Today/ItemTodayTab'
import TomorrowCard from '../components/cards/Tomorrow/ItemTomorrowTab'
import DetailsTab from '../tabs/Details/DetailsTab'
import {List} from '@material-ui/core';

interface ContainerProps {
    name: string;
    map: any;
}
  
const CardLoader:React.FC<ContainerProps> = ({ name, map }) => {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [jsonReq, setJsonReq] = React.useState<any[]>([]);
    const [todayCardList, setTodayCardList] = React.useState<any[]>([]);
    const [tomorrowCardList, setTomorrowCardList] = React.useState<any[]>([]);
    const [detailsClicked, setDetailsClicked] = React.useState(false);
    const [itemDetails, setItemDetails] = useState<any>();

    /* isLoaded is not set false in the first time */
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then( res => res.json())
        .then( json => {setJsonReq(json);})
        .then(() => setIsLoaded(true))
        .then(() => loadToday())
        .then(() => loadTomorrow())
    }, [isLoaded]);

     

     /* 
        
            If it is just true or false
                .then((response) => response.ok);
           If we have to check for an answer
                /*.then((response) => response.json())
                then((jsonReply) => ....

            When we delete a record, we send a post request and, after it received an ok from the request
            (status 200), we fetch again the result in order to avoid the ghosting (another user at the same time delete a request).

            Otherwise, this works.

            const deleteEventToday = (id) => {
                const newList = jsonReq.filter((item) => item.id !== id);
                setJsonReq(newList);
            }

            We can not reload the page (so it would fetch again), otherwise we would reload the map again

        */ 

        /* Deleting event for today and tomorrow tab. We use 'name' in order to understand from where the method is called */
    const deleteEvent = (id, name) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({ 'message': "Accepted request", 'status': "Accepted" }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.ok)
        .then((ok) => {
            if(ok == true){

                setIsLoaded(false);
                setTodayCardList([]);

                if(name=="Today") refreshRequests("Today")
                else if(name=="Tomorrow") refreshRequests("Tomorrow");
            }
        })
        .then(() => console.log(id));
    }

    const onPressEvent = (item) => {
        setItemDetails(item);        
        setDetailsClicked(true);
        map({lat:14,long:45});
    }

    function goToDetails(){
        return <DetailsTab ObjectDetails = {itemDetails} BackEvent={() => backToList()}/>;
    }

    function backToList(){
        setDetailsClicked(false);
    }

    /* Accepting event for tomorrow tab */
    const acceptEventTomorrow = (id) => {

        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({ 'message': "Accepted request", 'status': "Accepted" }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.ok)
        .then((ok) => {
            if(ok == true){
                setTomorrowCardList([]);
                refreshRequests("Tomorrow");
            }
        })
        .then(() => console.log(id));
    }

    function refreshRequests(name){
        setIsLoaded(false);

        if(name="Today"){
            fetch('https://jsonplaceholder.typicode.com/users')
                .then( res => res.json())
                .then( json => {setJsonReq(json);})
                .then(() => setIsLoaded(true))
                .then(() => loadToday());
        }else if(name="Tomorrow"){
            fetch('https://jsonplaceholder.typicode.com/users')
                .then( res => res.json())
                .then( json => {setJsonReq(json);})
                .then(() => setIsLoaded(true))
                .then(() => loadTomorrow());
        }
    }

    function loadToday(){
        var initialTodayList = jsonReq.map(item => (
            item.status != "deleted" ?
                <TodayCard 
                    id={item.id} 
                    name={item.name} 
                    farm_name={item.username} 
                    irrigation_time={item.email} 
                    canal_name={item.address.street} 
                    duration_time={item.address.suite} 
                    active={false}
                    delEvent={() => deleteEvent(item.id, "Today")}
                    onPressEvent={() => onPressEvent(item)}
                />
            : <div></div>
        ));

        setTodayCardList(initialTodayList);
        setJsonReq([]);
    }

    function loadTomorrow(){
        var initialTomorrowList = jsonReq.map(item => (
            <TomorrowCard 
                id={item.id} 
                name={item.name} 
                farm_name={item.username} 
                irrigation_time={item.email} 
                canal_name={item.address.street} 
                duration_time={item.address.suite} 
                acceptEvent={() => acceptEventTomorrow(item.id)}
                delEvent={() => deleteEvent(item.id, "Tomorrow")}
            />
        ));

        setTomorrowCardList(initialTomorrowList);
        setJsonReq([]);
    }

    return jsonReq && (
        <div>
            {
                !detailsClicked ? (
                    <List className='list'>
                        { name == "Today" ? todayCardList 
                        : name == "Tomorrow"  ? tomorrowCardList : <div></div>
                        }
                    </List>
                ) : goToDetails()
            }
        </div>
    )
}

export default CardLoader;