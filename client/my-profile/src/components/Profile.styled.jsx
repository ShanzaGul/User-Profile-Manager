import { styled } from "styled-components";

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  width: 600px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

export const UserName = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 56px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

export const UserEmail = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 32px;
  color: rgba(0, 0, 0, 0.85);
`;
