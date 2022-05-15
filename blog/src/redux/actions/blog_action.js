import {SAVE_BLOG_INFO} from '../action_type';
export const createSaveBlogAction = (value)=>{
    return {type:SAVE_BLOG_INFO,data:value};
}
