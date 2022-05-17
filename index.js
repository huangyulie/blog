/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
    let res = [];
    let up = 0,down = matrix.length,right = 0,left = matrix[0].length;
    let sum = down*left;
    let count = 1;
    while(count<=sum){
        for(let i = right; i < left; ++i){res.push(matrix[up][i]);count++;}up++;
        if(count > sum)return res;
        for(let i = up ; i < down ;++i){res.push(matrix[i][left-1]);count++;}left--;
        if(count > sum)return res;
        for(let i = left-1; i >= right ; --i){res.push(matrix[down-1][i]);count++;}down--;
        if(count > sum)return res;
        for(let i = down-1; i >= up; --i){res.push(matrix[i][right]);count++;}right++;
        if(count > sum)return res;
    }
    return res;
};


let a = spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]);
console.log(a);