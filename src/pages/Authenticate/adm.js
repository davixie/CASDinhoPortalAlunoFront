export const AdmAuthenticated = () => {
    if (localStorage.getItem('NomeADM') != null && localStorage.getItem('NomeADM') != undefined){
        return true
    }
    else{
        return false
    }
}