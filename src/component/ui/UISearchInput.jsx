import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

function UISearchInput({ value, placeholder, clickFunction, changeFunction }) {
    console.log(value)
    return(
        <Container>
            <Input
                type="text"
                defaultValue={ value }
                placeholder={ placeholder }
                onChange={ e => changeFunction(e.target.value) }
            />
            <Button onClick={ clickFunction }>
                <Icon />
            </Button>
        </Container>
    )
}

const Container = styled.div`
    background-color: var(--black-9);
    border: 1px solid var(--black-6);
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 4px 12px;
`;

const Input = styled.input`
    color: var(--black-2);
    flex: 1;
    font-size: 16px;
    margin: 0px;
    padding: 0px;

    &::placeholder {
        color: var(--black-5);
    }

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`


    &&& .MuiSvgIcon-root {
        color: var(--black-5);
    }
`;

const Icon = styled(SearchIcon)`

`;

export default UISearchInput;
