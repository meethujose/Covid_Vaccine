import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #ffffff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  width: calc(100% - 170px);
  padding-left: 10px;
`;

export default CardWrapper;
