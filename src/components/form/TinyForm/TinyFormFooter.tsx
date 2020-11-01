import styled from '@emotion/styled';
import { Colors } from '../../../constants/styles';

const TinyFormFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  a {
    font-size: 13px;
    color: ${Colors.primary};
    &:hover {
      text-decoration: none;
    }
  }
`;

export default TinyFormFooter;
