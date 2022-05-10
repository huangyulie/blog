import {SAVE_MEUE_INFO} from '../action_type';

export const createSaveTitleAction = (value)=>{
    return {type:SAVE_MEUE_INFO,data:value};
}