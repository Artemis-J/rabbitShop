// 回溯算法（Backtracking）
export default function bwPowerSet(nums) {
    const result = [];
    function backtrack(start, path) {
        result.push([...path]); // 记录当前子集
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);  // 选择当前元素
            backtrack(i + 1, path); // 递归继续选择下一个
            path.pop();  // 撤销选择
        }
    }
    backtrack(0, []);
    return result;
}

