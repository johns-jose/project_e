

const validation =(data)=>{
    let errors ={}

    if(!data.name && !data.email && !data.phone && !data.password && !data.confirmPassword){
        errors.main = ' all fields are mandatory !'
        
    }

    if(!data.name){
        errors.name='Name Required'
    }else if (data.name.length<5){
        errors.name ="Name must be more than 5 character"
    }
    if(!data.email){
        errors.email='Email Required'
    }


    return errors
}




export default validation