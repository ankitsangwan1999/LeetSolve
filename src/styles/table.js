import styled, { css } from "styled-components";
import { backgroundImageProperty } from "./constants";

export const TableContainer = styled.div`
    color: white;
    margin: 5px;
    padding: 10px;
`;

export const Table = styled.table`
    width: 100%;
    border-spacing: 15px 0.5em;
`;

export const THead = styled.thead`
    line-height: 30px;
`;

export const TBody = styled.tbody`
    border-spacing: 10em;
    tr {
        border-top: 10px solid transparent;
    }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
    background-image: ${backgroundImageProperty};
    padding: 5px;
`;

export const Td = styled.td`
    background-image: ${backgroundImageProperty};
    padding: 7px;
    text-align: center;
    a {
        color: white;
        text-decoration: none;
    }
    ,
    a :hover {
        color: #39ff14;
    }
`;
