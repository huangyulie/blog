import { SAVE_BLOG_INFO } from "../action_type";

let init = [];

export default function save(pre = init,action){
    const {type,data} = action;
    switch (type){
        case SAVE_BLOG_INFO:
            return [...data];
        default:
            return pre;
    }
}