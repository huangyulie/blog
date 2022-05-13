var oneEditAway = function(first, second) {
    if(first === second)return true;
    else if(first.length === second.length){
        let count = 0;
        for(let i = 0;i < first.length;++i){
            if(first[i]!=second[i]){
                count++;
            }
            if(count>1){
                return false;
            }
        }
        return true;
    }
    else if(first.length+1 === second.length){
        let flag;
        for(let i = 0;i<first.length+1;++i){
            if(first[i]!==second[i]){
                flag = i;
                break;
            }
        }
        second = second.substring(0,flag)+second.substring(flag+1,second.length);
        // console.log(first,second);
        if(first === second){
            return true;
        }else{
            return false;
        }
    }
    else if(first.length === second.length+1){
        let flag;
        for(let i = 0;i<second.length+1;++i){
            if(first[i]!==second[i]){
                flag = i;
                break;
            }
        }
        first = first.substring(0,flag)+first.substring(flag+1,first.length);
        console.log(first,second);
        if(first === second){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
};

let a = oneEditAway("ple","pale");
console.log(a);