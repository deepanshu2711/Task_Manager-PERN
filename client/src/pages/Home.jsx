import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import { currentUserTasks } from '../../redux/user/slice.js';


function Home(props) {
    
    const { currentUser,Alltasks } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const[newtask,setnewtask] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const result = fetch("http://localhost:3000/api/user/addtasks" ,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({task:newtask,email:currentUser.email}),
        });
        getTasks();
        setnewtask('');
    }

    function handleChange(e) {
        e.preventDefault();
        setnewtask(e.target.value);
    }

    async function getTasks(e) {
        
        const result  = await fetch("http://localhost:3000/api/user/tasks" ,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({id:currentUser.id}),
        });
        const data = await result.json();
        dispatch(currentUserTasks(data));
        
    }

    useEffect(()=>{
        getTasks()
    },[])

    function handlecheck(e) {
        const id =e.target.id;
        const result =fetch("http://localhost:3000/api/user/deletetask" ,{
            method:'delete',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({id:id}),
        });
        getTasks();
    }

    
    

    return (
        <>
        <Header />
        <h1 className='text-3xl text-blue-600 text-center'> Welcome! {currentUser.username}</h1>
        <div className='flex flex-col items-center justify-start mt-10'>
            <div className='bg-white w-96 h-auto'>
                <h1 className='text-center p-3 text-white font-semibold bg-gray-900'>TODAY TASKS</h1>
                <div className='p-3 border bg-white'>
                    <ol>
                    {Alltasks.map((task , index) => {
                        return (
                            <li key={task.id} className='p-3 m-1 bg-blue-100 flex justify-between'> {task.task}<input id={task.id} type='checkbox' onChange={handlecheck} /></li>
                        );
                    })}
                    </ol>
                </div>
                <div className='mt-5'>
                <form onSubmit={handleSubmit}>
                    <input value={newtask} onChange={handleChange} className='w-96 border p-2' type='text' placeholder='Add New Task' id='task' name='task' />
                    <button className="w-96 bg-gray-900 text-white p-2 font-semibold " >Add</button>
                </form>
                </div>

            </div>
        </div>
        </>
    );
}

export default Home;