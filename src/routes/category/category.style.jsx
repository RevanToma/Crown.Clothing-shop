import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media (max-width: 610px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 25px;
  text-align: center;
`;
