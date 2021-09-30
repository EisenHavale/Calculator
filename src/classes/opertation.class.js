

export class Operation {

    constructor() {
        this.history = [];
        this.result = 0;
    }

    //Methods

    add(values) {
        let result = 0;
        for (const value of values) {
            result += value;
        }
        this.result=result;

    }

    substrack(values) {
        let result = 0;
        if (values.length == 2) {
            result = values[0] - values[1];
        } else {
            result=values[0];
            for(let i=1; i<values.length; i++){
                result-=values[i];
            }

        }
        this.result = result;

    }

    multiply(values) {
        let result = 1;
        for (const value of values) {
            result *= value;
        }
        this.result = result;

    }

    divide(values) {
        let result = values[0];
        for(let i=1; i<values.length; i++){
            result=result/values[i];
            // console.log(result, values[i]);
        }

        this.result = result;

    }

}