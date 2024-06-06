import { useSearchParams } from "react-router-dom";

import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
export default function Filter({ urlParamName, options }) {
  const [searchParams, setSearchParams] = useSearchParams(); // save to url

  const currentFilter = searchParams.get(urlParamName) || options.at(0).value;

  function handleClickFilter(value) {
    searchParams.set(urlParamName, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((data) => (
        <FilterButton
          key={data.value}
          onClick={() => handleClickFilter(data.value)}
          $active={data.value === currentFilter}
          disabled={data.value === currentFilter}
        >
          {data.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
