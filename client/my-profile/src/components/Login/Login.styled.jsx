import { styled } from "styled-components";

export const LoginContainer = styled.div`
  background-image: url("hero.jpg");
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.35;
`;

export const Description = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: rgb(38, 38, 38);
  border-bottom: 1px solid rgb(240, 240, 240);
  padding-bottom: 24px;
`;
