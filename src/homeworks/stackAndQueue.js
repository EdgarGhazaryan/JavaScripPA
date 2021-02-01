function createStack() {
    const arr = [];

    return {
        size: function () {
            return arr.length;
        },
        isEmpty: function () {
            return arr.length === 0;
        },
        push: function (element) {
            arr.push(element);
        },
        pop: function () {
            if (arr.length === 0) {
                return;
            }

            return arr.pop();
        },
        peek: function () {
            if (arr.length === 0) {
                return;
            }
            return arr[arr.length - 1];
        }
    };
}

function createQueue() {
    const stack1 = createStack();
    const stack2 = createStack();

    return {
        size: function () {
            return stack1.size() + stack2.size();
        },
        isEmpty: function () {
            return (stack1.size() + stack2.size()) === 0;
        },
        push: function (element) {
            stack1.push(element);
        },
        pop: function () {
            if(stack1.isEmpty() && stack2.isEmpty()) {
                return;
            }

            if(stack2.isEmpty()) {
                while(!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
                return stack2.pop();
            }
            return stack2.pop();
        },
        peek: function () {
            if(stack1.isEmpty() && stack2.isEmpty()) {
                return;
            }

            if(stack2.isEmpty()) {
                while(!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
                return stack2.peek();
            }
            return stack2.peek();
        }
    };
}