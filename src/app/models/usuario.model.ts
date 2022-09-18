export class Usuario {

    static fromFirebase( { email , nombre , uid} : {email: string , nombre: string , uid: string}){
        return new Usuario(uid,nombre,email);
    }


    constructor(
        public uid : string | any,
        public nombre : string | any,
        public email : string | any
    ){}


}