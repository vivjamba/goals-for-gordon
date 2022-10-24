export async function getAllData(){
    const resp = await fetch('localhost:5000/dbtest');
    return await resp.json();
}
