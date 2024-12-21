import { atom } from "recoil";

const authScreenAtom = atom({
    key:"authScreenAtom",
    default:"Signin"
})

export default authScreenAtom;