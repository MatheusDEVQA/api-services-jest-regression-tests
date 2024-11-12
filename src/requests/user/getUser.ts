
interface User {
    name: string
    age: number
    address: string
}
async function getUser(id:string): Promise<User> {
    const response = await get()
}