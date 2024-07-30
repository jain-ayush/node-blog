
class context{
    static getTokenFromHeader = (req) => {
        const {authorization} = req.headers
        let token;
        if( authorization && authorization.split(" ")[0] === "Bearer"){
                
            token = authorization.split(" ")[1];
            return token;                
        }
        else{
            console.log('token is not available');
        }
    }

    static set = (key, data, {locals}) => {
        locals[key] = data;
    }

    static get = (key, {locals}) => {
        if(key in locals){
            return locals[key]
        }
        return null
    }
    
}



export default context;