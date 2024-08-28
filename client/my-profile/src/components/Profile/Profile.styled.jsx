import { styled } from "styled-components";

export const ProfileCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  width: 600px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #f6f9fb;
`;

export const UserName = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

export const UserEmail = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
`;

export const ProfileImageEditButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DetailsEditButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
