import React,{Component} from 'react';
import Topbar from './topbar/Topbar'

import '../../css/topbar.css'
import Sidebar from './sidebar/Sidebar';

export default class Layout extends Component{
    render(){
        return (
            <div className="">
                <Topbar />
                <Sidebar />
            </div>
        )
    }
}