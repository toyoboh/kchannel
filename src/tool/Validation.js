class Validation
{
    /**
     * Check if it is an empty string
     * @param {string} value 
     * @param {function} setFunction 
     * @returns {boolean} : If there is a setFunction
     * @returns {array}   : If there is no setFunction
     */
    checkNotEmpty(value, setFunction = null) {
        if(setFunction === null) {
            if(value === "") {
                return {
                    success: false,
                    message: "入力してください"
                }
            } else {
                return {
                    success: true,
                    message: ""
                }
            }
        } else {
            if(value === "") {
                setFunction("入力してください");
                return false;
            } else {
                setFunction("");
                return true;
            }
        }
    }
}

export default new Validation();
