import styled from '@emotion/styled';
import { Colors } from '../../../constants/styles';

const TinyFormButton = styled.button`
  background: ${Colors.primary};
  width: 100%;
  padding: 10px;
  color: #fff;
  &:hover {
    background: ${Colors.primaryDark};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export default TinyFormButton;
