class Validation
{
    /**
     * Check if it is an empty string
     * @param {string} value 
     * @param {function} setFunction 
     * @returns {boolean} : If there is a setFunction
     * @returns {array}   : If there is no setFunction
     */
    checkNotEmpty(value, setFunction) {
        if(value === "") {
            setFunction("入力してください");
            return false;
        } else {
            setFunction("");
            return true;
        }
    }

    /**
     * 
     */
    checkSpecifiedNumberOfCharacters(chara, min, max, setFunction) {
        const charaCount = chara.length;

        if(min <= charaCount && charaCount <= max) {
            setFunction("");
            return true;
        } else {
            setFunction(`${min}文字以上、${max}文字以下で入力してください`);
            return false;
        }
    }
}

export default new Validation();
