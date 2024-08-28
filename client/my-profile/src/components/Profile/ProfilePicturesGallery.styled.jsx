import { styled } from "styled-components";

export const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  padding: 32px 16px;
`;

export const PhotoCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 16px;
  text-align: center;
`;

export const PhotoInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
