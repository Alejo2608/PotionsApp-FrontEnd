import React from "react";
import { useState } from "react";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import axios from "axios";

export default function CreatePotion(){
    const [error,setError]=useState('')
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [data, setData] = useState({
        imagen:null,
		nombre: "",
		descripcion: "",
        cantidad:"",
        categoria:[],
        precio:""
	});

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data)
	};
    function handleSelect(e){
        setData({
            ...data,
            categoria: e.target.value
        })
    }
    const handleImg = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.files[0] });
		// console.log(data)
	};


    const handleSubmit = async (e) => {
        if (data.imagen===null) {
            e.preventDefault()
            setError("Por favor ingresa la imagen de la Pocion")
        } else if (data.nombre,data.descripcion,data.cantidad,data.precio==="") {
            e.preventDefault()
            setError("Hay campos vacios, todos tienen que llenarse para crear una Pocion")
        }else if (data.categoria.length===0) {
            e.preventDefault()
            setError("Por favor agrega las categoria de tu Pocion")
        }else{
            e.preventDefault();
        console.log(data);
        let body = new FormData()
        data.imagen = data.imagen !== null && (body.append('imagen', data.imagen))
        data.nombre = data.nombre !== '' && (body.append('nombre', data.nombre))
        data.descripcion = data.descripcion !== '' && (body.append('descripcion', data.descripcion))
        data.cantidad = data.cantidad !== '' && (body.append('cantidad', data.cantidad))
        data.categoria = data.categoria.length !== 0 && (body.append('categoria', data.categoria))
        data.precio = data.precio !== '' && (body.append('precio', data.precio))

		try {
            console.log(body)
			const url = "http://localhost:3000/create-potions"
			const { data: res } = await axios.post(url, body);
            console.log(res)
            openAlert()
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 404 &&
				error.response.status <= 500
			) {
				setError(error.response.data.messageError);
			}
		}
        }
        
	};
    return(
        <div className="flex justify-center m-10 w-98 ...">
                <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                    <h2>POCION CREADA CORRECTAMENTE</h2>
                </Modal>
        <form className="flex flex-col min-w-[70%] bg-slate-200 p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 ...">
                <h1 className="text-xl font-semibold ...">CREA TU POCION</h1>
            </div>
            <div className="items-center justify-center">
                <input 
                type="file" 
                name="imagen"
                onChange={handleImg}
                className="m-4"
                />
            </div>
            <input
                type="text"
                placeholder="Nombre de la Pocion"
                name="nombre"
                onChange={handleChange}
                value={data.nombre}
                className="h-10 mb-4 bg-slate-100 rounded-lg ..."
            />
            <input
                type="text"
                placeholder="Descripcion..."
                name="descripcion"
                onChange={handleChange}
                value={data.descripcion}   
                className="h-10 col-span-2 mb-4 bg-slate-100 rounded-lg ..."
            />
            <div className="ml-2 flex flex-basic">
                <label className="m-2"> Categoria:</label>
                <br />
                <select onChange={(e)=>handleSelect(e)} name="categoria" value={data.categoria} >   
                    <option value="Velocidad">Velocidad</option>
                    <option value="Vida">Vida</option>
                    <option value="Magia">Magia</option>
                    <option value="Muerte">Muerte</option>
                    <option value="Escudo">Escudo</option>
                    <option value="Fuerza">Fuerza</option>
                    <option value="Fuerza">Tiro</option>
                </select>
            </div>
            <input
                type="text"
                placeholder="Cantidad"
                name="cantidad"
                onChange={handleChange}
                value={data.cantidad}
                
                className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
            />
            <input
                type="text"
                placeholder="Precio"
                name="precio"
                onChange={handleChange}
                value={data.precio}
                className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
            />
            {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center text-center'>{error}</div>}
            <button type="submit" className="m-4 bg-green-400 h-10 rounded-full text-white font-semibold text-white-500 ...">
                Crear
            </button>
        </form>
    </div>
    )
}