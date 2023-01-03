const dateAndTime = ()=>{
    let currentdate = new Date(); 
    let date = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear(); 
    let time =   currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
          
                    return({date,time})
}
module.exports = dateAndTime