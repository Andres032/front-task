import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('task', event, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                event.id = body.tarea.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log( event );
                dispatch( eventAddNew( event ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}



const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });



export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`task/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});



export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'task' );
            const body = await resp.json();

            const events = prepareEvents( body.tareas );
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout =() => ({ type: types.eventLogout });