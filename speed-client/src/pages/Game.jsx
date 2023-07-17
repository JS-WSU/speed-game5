import io from 'socket.io-client';
import { useEffect, useState } from 'react';

export default function Game() {
    const [messageRecieved, setMessageRecieved] = useState([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:4001/game');

        function messageReceivedHandler(data){
            console.log(data);
            const dataParsed = JSON.parse(data);
            console.log(dataParsed);
            setMessageRecieved(dataParsed);
        }
        socket.on('receive_message', messageReceivedHandler);
        return () => {
            socket.off('receive_message', messageReceivedHandler);
        };
    },[]);
    
    return (
        <div>
            <div>Message: {messageRecieved && messageRecieved.map((value, index) => {
                return(
                    <pre>{JSON.stringify(value)}</pre>
                );
            })}
            </div>
        </div>
    );
}