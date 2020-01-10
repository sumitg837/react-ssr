import React from 'react'
import Loadable from 'react-loadable';
import Title from '../containers/title'
import AddTask from '../containers/addTask'
import Board from '../components/board'
import {todoAction} from '../actions'



 const AboutAsync = Loadable({
    loader: () => import(/* webpackChunkName: "about" */'../components/about'),
    loading() {
        return <div>Loading...</div>
    }
});

const HOME = () => {
    return (
        <div>
            <Title />
            <AddTask />
            <Board />
        </div>
    )
}
const TitleAsync = () =>{
    return (
        <div>hi</div>
    )
}


const Routes = [
    {
        path: '/',
        exact: true,
        component: HOME,
        loadData: (path = '') => todoAction({ type: 'FETCH_TASK'})
    },
    {
        path: '/todo/:id',
        exact: true,
        component: TitleAsync
    },
    {
        path: '/about',
        exact: true,
        component: AboutAsync
    }
 
    /* {
        path: '/popular/:id',
        component: Grid,
        loadData: (path = '') => loadData(path.split('/').pop()),
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop()) 
    } */
];


export default Routes;