import styled from 'styled-components';


// ! this will take hieght and width as this.props
const Input = styled.input`
  height: ${ props => props.height || "100%"};
  width: ${ props => props.width || "100%"};
  margin: 15px;
  display: block;
  border-radius: 2px;
  box-sizing: border-box;
  text-indent: 10px;
  font-size: 24px;
`;

export default Input;
