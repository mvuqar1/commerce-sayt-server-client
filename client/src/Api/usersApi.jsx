const fetchUrl="http://localhost:5001"

export const RegisterUser=async(payload)=>{
    console.log(payload)
    try {
        const request=await fetch(`${fetchUrl}/api/user/register`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)

        })
        const data= await request.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const LoginUser=async(payload)=>{
    console.log(payload)
    try {
        const request=await fetch(`${fetchUrl}/api/user/login`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)

        })
        const data= await request.json()
        return data
    } catch (error) {
        return error.message
    }
}