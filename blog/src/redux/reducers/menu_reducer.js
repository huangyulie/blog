import { SAVE_MEUE_INFO } from "../action_type";

let init = '';

export default function save(pre = init,action){
    const {type,data} = action;
    switch (type){
        case SAVE_MEUE_INFO:
            return data;
        default:
            return pre;
    }
}