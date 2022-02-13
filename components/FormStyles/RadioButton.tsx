import styled from 'styled-components'

export const RadioButton = styled.input`
  opacity: 0;
  position: fixed;
  width: 160px;
  height: 54px;
  border-radius: 0;

  + label {
    background: white;
    border-width: 1px;
    border-color: #777777;
    border-style: solid;
    text-align: center;
    font-size: 24px;
    font-family: 'Source Sans Pro';
    display: inline-block;
    vertical-align: middle;
    border-radius: 6px;
    padding: 10px 20px;
    color: black;
    width: 140px;
    height: 54px;
    margin: 0 1em;
  }

  &:checked + label {
    border: none;
    background: #5064c7;
    color: white;
  }
`
