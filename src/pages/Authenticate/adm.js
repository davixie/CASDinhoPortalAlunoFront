export const AdmAuthenticated = () => {
    if (localStorage.getItem('Token') != null && localStorage.getItem('Token') != undefined){
        return true
    }
    else{
        return false
    }
}