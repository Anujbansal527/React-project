import axios from "axios"


//fetching pan details
export const ValidatePan = async(pan) =>{
    const URL = "https://lab.pixel6.co/api/verify-pan.php"
    try {
        const data = { "panNumber":pan }
        console.log(data)
        const resp = await axios.post(URL,data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}

//fetching postcode details

export const GetPostCode = async(code) =>{
    const URL = "https://lab.pixel6.co/api/get-postcode-details.php"
    try {
        const data = { "postcode":code }
        console.log(data)
        const resp = await axios.post(URL,data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}