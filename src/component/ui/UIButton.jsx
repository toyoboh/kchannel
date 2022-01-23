import styled from "styled-components";

const colorkind = {
    light: {
        red: {
            base: {
                color: "var(--red-2)",
                backgroundColor: "var(--red-8)",
                borderColor: "var(--red-5)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--red-2)",
                borderColor: "var(--red-2)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--red-1)",
                borderColor: "var(--red-1)"
            }
        },
        blue: {
            base: {
                color: "var(--blue-2)",
                backgroundColor: "var(--blue-8)",
                borderColor: "var(--blue-5)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--blue-2)",
                borderColor: "var(--blue-2)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--blue-1)",
                borderColor: "var(--blue-1)"
            }
        },
        green: {
            base: {
                color: "var(--green-2)",
                backgroundColor: "var(--green-8)",
                borderColor: "var(--green-5)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--green-2)",
                borderColor: "var(--green-2)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--green-1)",
                borderColor: "var(--green-1)"
            }
        }
    },
    dark: {
        red: {
            base: {
                color: "white",
                backgroundColor: "var(--red-2)",
                borderColor: "var(--red-2)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--red-3)",
                borderColor: "var(--red-3)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--red-1)",
                borderColor: "var(--red-1)"
            }
        },
        blue: {
            base: {
                color: "white",
                backgroundColor: "var(--blue-2)",
                borderColor: "var(--blue-2)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--blue-3)",
                borderColor: "var(--blue-3)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--blue-1)",
                borderColor: "var(--blue-1)"
            }
        },
        green: {
            base: {
                color: "white",
                backgroundColor: "var(--green-2)",
                borderColor: "var(--green-2)"
            },
            hover: {
                color: "white",
                backgroundColor: "var(--green-3)",
                borderColor: "var(--green-3)"
            },
            click: {
                color: "white",
                backgroundColor: "var(--green-1)",
                borderColor: "var(--green-1)"
            }
        }
    }
}

const sizekind = {
    small: {
        fontSize: "12px",
        padding: "4px 8px"
    },
    normal: {
        fontSize: "16px",
        padding: "6px 12px",
    },
    big: {
        fontSize: "20px",
        padding: "8px 16px"
    }
}

const UIButton = styled.button`
    background-color: ${props => getBackgroundColor(props.type, props.colorkind, "base")};
    border: 1px solid ${props => getBorderColor(props.type, props.colorkind, "base")};
    border-radius: 4px;
    color: ${props => getColor(props.type, props.colorkind, "base")};
    font-size: ${props => getFontSize(props.sizekind)};
    margin: 0px;
    padding: ${props => getPadding(props.sizekind)};

    &:hover {
        background-color: ${props => getBackgroundColor(props.type, props.colorkind, "hover")};
        border: 1px solid ${props => getBorderColor(props.type, props.colorkind, "hover")};
        color: ${props => getColor(props.type, props.colorkind, "hover")};
        transition: .1s;
    }

    &:active {
        background-color: ${props => getBackgroundColor(props.type, props.colorkind, "click")};
        border: 1px solid ${props => getBorderColor(props.type, props.colorkind, "click")};
        color: ${props => getColor(props.type, props.colorkind, "click")};
    }

    // 子要素に対する設定
    // アイコンが設定されていない場合も対応できるように
    & .MuiSvgIcon-root {
        font-size: ${props => getFontSize(props.sizekind)} !important;
        margin-right: 4px;
    }
`;

const getFontSize = (size = "normal") => {
    return sizekind[size]["fontSize"];
}

const getPadding = (size = "normal") => {
    return sizekind[size]["padding"];
}

const getColor = (type = "dark", color = "red", situation = "base") => {
    return colorkind[type][color][situation]["color"];
}

const getBackgroundColor = (type = "dark", color = "red", situation = "base") => {
    return colorkind[type][color][situation]["backgroundColor"];
}

const getBorderColor = (type = "dark", color = "red", situation = "base") => {
    return colorkind[type][color][situation]["borderColor"];
}


export default UIButton;
