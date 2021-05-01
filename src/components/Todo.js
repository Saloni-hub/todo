import React, { useState,useEffect } from 'react'
import logo from '../image/logo.jpg'
// to set from local storage
const getLocalItem = () => {
    let lists = localStorage.getItem('list');
    console.log(lists);
    if(lists){
        return JSON.parse(localStorage.getItem('list'));
    } else
    {
        return [];
    }
}
const Todo = () => {
    const [InputData, SetInputData] = useState('');
    const [Items,SetItems] = useState(getLocalItem());
    const [togglesubmit,SetToggleSumbit] = useState(true);
    const [editItem,SetEditItem] = useState(null);
    const addItem = () => {
        if(!InputData){
            alert('Please fill data')
        }else if(InputData && !togglesubmit) {
            SetItems(
                Items.map((elem) => {
                    if(elem.id === editItem){
                        return {...elem,name:InputData}
                    }
                    return elem;
                })
            )
        SetToggleSumbit(true);
        SetInputData(' ');
        SetEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(),name:InputData}
            SetItems([...Items,allInputData])
            SetInputData(' ');
        }
        }
    const EditItem = (id) => {
        let newEditItem = Items.find((elem)=>{
            return elem.id === id
        });
        SetToggleSumbit(false);
        SetInputData(newEditItem.name);
        SetEditItem(id);
        console.log(newEditItem)
    }
    const DeleteItem = (index) => {
        const update = Items.filter((elem) => {
            return index !== elem.id;
        });
        SetItems(update);
    }
    const removeAll = () => {
        SetItems([]);
    }
    // add data to local storage
    useEffect(() => {
        localStorage.setItem('list',JSON.stringify(Items))
    }, [Items])

    return (
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={logo} alt="todologo"/>
                    <figcaption>Add Your List Here 👉</figcaption>
                </figure>
                <div className="add-item">
                    <input type="text" placeholder="✍️  Add Item.."
                      value={InputData} onChange={(e)=>SetInputData(e.target.value)}
                    />
                    {
                        togglesubmit ? <i className="fa fa-plus add-btn" title="update Item" onClick={addItem}></i> :
                         <i className="fa fa-edit add-btn" title="Edit Item" onClick={addItem}></i>
                    }
                    
                </div>
                <div className="showItems">
                    {
                        Items.map((elem) => {
                            return (
                                <div className="eachItem" key={elem.id}>
                                   <h3>{ elem.name }</h3>
                                   <div className="todo-btn">
                                            <i className="fa fa-edit add-btn" title="Edit Item" onClick={()=>EditItem(elem.id)}></i>
                                            <i className="fa fa-trash-alt add-btn" title="Delete Item" onClick={()=>DeleteItem(elem.id)}></i>
                                    </div>
                                 </div>
                            )
                        })
                    }
                    
                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    )
}
export default Todo;