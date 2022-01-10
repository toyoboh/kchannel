import { Link } from "react-router-dom";
import styled from "styled-components";

const size = {
    small: {
        padding: "0px 4px",
        fontSize: "14px"
    },
    normal: {
        padding: "0px 4px",
        fontSize: "16px"
    },
    big: {
        padding: "0px 4px",
        fontSize: "18px"
    }
}

/**
 * The default color for Link is blue
 * props: color     -> index.css files color type
 *        fontsize  -> small, normal(default), big
 *        padding   -> small, normal(default), big
 *        underline -> "true", none(default)
 */
const UILink = styled(Link)`
    color: ${(props) => {
        if(props.colorkind) {
            return `var(--${props.colorkind})`;
        } else {
            return "var(--blue)";
        }
    }};
    font-size: ${(props) => {
        if(props.sizekind) {
            return size[props.sizekind].fontSize;
        } else {
            return size["normal"].fontSize;
        }
    }};
    padding: ${(props) => {
        if(props.sizekind) {
            return size[props.sizekind].padding;
        } else {
            return size["normal"].padding;
        }
    }};

    &:hover {
        border-bottom: ${props => {
            if(props.underline) {
                if(props.colorkind) {
                    return `1px solid var(--${props.colorkind})`;
                } else {
                    return "1px solid var(--blue)";
                }
            } else {
                return "none";
            }
        }};
    }
`;

export default UILink;
