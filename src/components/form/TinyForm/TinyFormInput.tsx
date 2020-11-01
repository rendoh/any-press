import styled from '@emotion/styled';
import { Colors } from '../../../constants/styles';

type InputProps = { invalid?: boolean };
const TinyFormInput = styled.input<InputProps>`
  width: 100%;
  background: ${({ invalid }) => (invalid ? `${Colors.error}22` : '#fff')};
  padding: 10px;
`;

export default TinyFormInput;
