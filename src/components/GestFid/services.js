class AuthService{
    saveUserInfo = (username) => {
        sessionStorage.setItem("utente",username);
    }
    clearUserInfo = () => {
        sessionStorage.removeItem("utente");
    }
    getUserInfo = () => sessionStorage.getItem("utente");
    isLogged = () => { 
        const u=this.getUserInfo();
        if (u === null){
            return false;
        }else{
            return true;
        }
    };
}
export default new AuthService()