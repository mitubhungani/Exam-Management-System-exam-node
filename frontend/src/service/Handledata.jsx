import axios from "axios";

let api = new axios.create({
    baceURL:"http://localhost:8090/"
})

export default api;