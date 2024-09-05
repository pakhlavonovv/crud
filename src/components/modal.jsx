import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { nanoid } from "nanoid/non-secure"
import axios from 'axios'
const GlobalModal = (props) => {
    const { open, toggle , data, setData, edit} = props
    const [form, setForm] = useState({})
    console.log(data);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (edit.id) {
            axios.put(`http://localhost:3000/users/${edit.id}`, form)
                .then((res) => {
                    setData(prevData => prevData.map(item => item.id === edit.id ? res.data : item));
                });
        } else {
            let payload = { ...form, id: nanoid() };
            axios.post('http://localhost:3000/users', payload)
                .then((res) => {
                    setData(prevData => [...prevData, res.data]);
                });
        }
    
        toggle();
    };

    return (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <h2 className='text-center'>Add product</h2>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} id="form">
                    <input type="text" defaultValue={edit.name} onChange={handleChange} placeholder="Name" name="name" className="form-control my-2" />
                    <input type="text"defaultValue={edit.color} onChange={handleChange} placeholder="Color" name="color" className="form-control my-2" />
                    <input type="text" defaultValue={edit.price} onChange={handleChange} placeholder="Price" name="price" className="form-control my-2" />
                    <input type="text" defaultValue={edit.number} onChange={handleChange} placeholder="Number" name="number" className="form-control my-2" />
                </form>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-success' type='submit' form='form'>Save</button>
            </ModalFooter>
        </Modal>
    )
}

export default GlobalModal
