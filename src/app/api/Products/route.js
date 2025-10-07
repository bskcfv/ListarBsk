import { getList, postList } from "@/services/list.service";

export async function GET() {
    try {
        //Servicio de Obtener datos de Lista
        const result = await getList()
        //Retornar
        return new Response(JSON.stringify(result),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}

export async function POST(req) {
    try {
        //Cuerpo
        const {name, description, price, stock} = await req.json();
        //Servicio de Insertar Datos en Lista
        const result = await postList(name, description, price, stock);
        //retornar
        return new Response(JSON.stringify({result}),{status:200})    
    } catch (error) {
        return new Response(JSON.stringify({error:error.message}))
    }
}