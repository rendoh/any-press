import styled from '@emotion/styled';
import { Colors } from '../../../constants/styles';

const TinyForm = styled.form`
  width: 500px;
  max-width: calc(100% - 40px);
  background: ${Colors.background};
  border-radius: 5px;
  padding: 20px;
  margin: auto;
`;

export default TinyForm;
