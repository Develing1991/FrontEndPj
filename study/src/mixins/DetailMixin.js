export default{
    methods: {
        deepCopy(obj) {
            if (obj === null || typeof(obj) !== "object") {
                return obj;
            }
                
            let copy = {};
            for(let key in obj) {
                copy[key] = this.deepCopy(obj[key]);
            }
            return copy;
            }
    },
}