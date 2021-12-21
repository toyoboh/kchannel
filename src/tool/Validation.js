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

    /**
     * 
     */
    checkSpecifiedNumberOfCharacters(chara, min, max, setFunction = null) {
        const charaCount = chara.length;
        
        if(setFunction === null) {
            if(min <= charaCount && charaCount <= max) {
                return {
                    success: true,
                    message: ""
                }
            } else {
                return {
                    success: false,
                    message: `${min}文字以上、${max}文字以下で入力してください`
                }
            }
        } else {
            if(min <= charaCount && charaCount <= max) {
                setFunction("");
                return true;
            } else {
                setFunction(`${min}文字以上、${max}文字以下で入力してください`);
                return false;
            }
        }
    }
}

export default new Validation();
