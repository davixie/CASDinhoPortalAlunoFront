export const StudentAuthenticated = () => {
    if (localStorage.getItem('StudentId') != null && localStorage.getItem('StudentId') != undefined){
        return true
    }
    else{
        return false
    }
}