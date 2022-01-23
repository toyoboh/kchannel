import styled from "styled-components";

const UIInput = styled.input`
    border: 1px solid var(--black-6);
    border-radius: 4px;
    caret-color: var(--black-2);
    color: var(--black-2);
    font-size: 16px;
    padding: 6px 12px;
    width: 100%;

    &::placeholder {
        color: var(--black-5);
    }

    &:focus {
        outline: none;
    }
`;

export default UIInput;
