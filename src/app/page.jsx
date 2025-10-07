"use client"
import { useEffect, useRef, useState } from "react";


export default function Home() {

  const [list, setList] = useState([]);


  const name = useRef();
  const price = useRef();
  const stock = useRef();
  const description = useRef();

  //Funcion de Cargar Datos provenientes del Endpoint.
  const onload = async() => {
    try {
      const res = await fetch("/api/Products")
      const data = await res.json()
      setList(data)
    } catch (error) {
      console.log(error)
    }
  }
  //Objetivo -> Cargar Datos Una Sola Vez Al renderizar la pagina
  useEffect(()=>{
    onload();
  },[]);

  const handlesubmit = async(e) =>{
    e.preventDefault()
    try {

      const nameV = name.current.value;
      const priceV = price.current.value;
      const stockV = stock.current.value;
      const descripV = description.current.value;

      const result = await fetch("/api/Products",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
          name:nameV,
          description:descripV,
          price:priceV,
          stock:stockV
        })
      })
      //Recargar Pagina Con Datos Actualizados
      onload();
      alert("Producto Registrado")

    } catch (error) {
      alert("Error")
    }
  }
  return (
    <div className="m-4 p-4 flex">
      <table className="m-4 p-4 flex flex-col justify-center items-center bg-gray-800 rounded-2xl ">
        <thead className="">
          <tr className="flex p-5  m-4 border w-222 justify-between">
            <th>Name</th>
            <th>Descrip</th>
            <th>Precio</th>
            <th className="pr-21">stock</th>
            <th className="">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((p) => (
              <tr key={p.id} className="flex space-x-24 p-5 m-4 justify-between border hover:bg-gray-700 transition duration-300 cursor-pointer">
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.created_at}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <form onSubmit={handlesubmit}
      className="m-4 p-4 bg-gray-800 rounded-2xl h-100 flex flex-col items-center">
          <h2 className="text-center mb-1">Insertar Producto</h2>
          <div className="m-4">
            <label htmlFor="">Nombre: </label>
            <input ref={name} type="text" className="p-2 bg-gray-900 rounded-2xl"/>
          </div>
          <div className="m-4">
            <label htmlFor="">Precio: </label>
            <input ref={price} type="number" step="any" className="p-2 bg-gray-900 rounded-2xl" />
          </div>
          <div className="m-4">
            <label htmlFor="">Stock: </label>
            <input ref={stock} type="number" className="p-2 bg-gray-900 rounded-2xl" />
          </div>
          <div className="m-4">
            <label htmlFor="">Descripcion: </label>
            <input ref={description} type="text" className="p-2 bg-gray-900 rounded-2xl"/>
          </div>
          <div>
            <button type="submit"
            className="m-2 p-2 bg-gray-900 cursor-pointer hover:bg-gray-500 transition duration-300 rounded-2xl"
            >Insertar</button>
          </div>
        </form>
    </div>
  );
}
