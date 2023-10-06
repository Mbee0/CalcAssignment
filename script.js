let view = "";
let justEqualed = false;

function inPress(entry) {
    if (justEqualed && !isNaN(parseInt(entry))) {
        shouldClear();
        justEqualed = false;
    } else if (justEqualed) {
        justEqualed = false;
    }
    view += entry;
    document.getElementById("stoopid").textContent = view;
}

function equals() {
    expression = view;
    // let result;
    const nums = [];
    const as = [];
    let wasNum = false;
    for (let i = 0; i < expression.length; i++) {
        //if(typeof expression.charAt(i) === "number")
        if (!isNaN(expression.charAt(i))) {
            if (wasNum) {
                let holder = (nums[nums.length - 1] * 10) + parseInt(expression.charAt(i));
                nums[nums.length - 1] = holder;
            } else {
                nums[nums.length] = parseInt(expression.charAt(i));
            }
            wasNum = true;
        } else if (expression.charAt(i) == '/' || expression.charAt(i) == 'x') {
            first = nums[nums.length - 1];
            let second = parseInt(expression.charAt(i + 1));
            // let counter = 1;
            // for (let j = (i + 1); j < expression.length; j++) {
            //     if (j == (i + 1)) {
            //         second = parseInt(expression.charAt(j));
            //     } else {
            //         if (!isNaN(expression.charAt(i))) {
            //             let holder = (second * 10) + parseInt(expression.charAt(j))
            //             second = (second * 10) + parseInt(expression.charAt(j));
            //             counter++;
            //         } else {
            //             j = nums.length;
            //         }
            //     }
            // }
            if (expression.charAt(i) == '/') {
                nums[nums.length - 1] = first / second;
            } else {
                nums[nums.length - 1] = first * second;
            }
            i++;
            wasNum = false;
            console.log("nums: " + nums);
        } else {
            if (expression.charAt(i) == '+') {
                as[as.length] = true;
            } else {
                as[as.length] = false;
            }
            wasNum = false;
        }
    }
    console.log("anything? " + as);
    for (let i = 0; i < as.length; i++) {
        if (as[i]) {
            nums[i + 1] += nums[i];
        } else {
            nums[i + 1] = nums[i] - nums[i + 1];
        }
    }
    console.log("before if: " + as);
    if (nums[nums.length - 1].toString().length > 8) {
        let string = nums[nums.length - 1].toString();
        string = string.slice(0, 9);
        nums[nums.length - 1] = string;
    }
    console.log(nums);
    document.getElementById("stoopid").textContent = nums[nums.length - 1];
    view = nums[nums.length - 1];
    justEqualed = true;
}

function shouldClear() {
    view = "";
    document.getElementById("stoopid").textContent = view;
}