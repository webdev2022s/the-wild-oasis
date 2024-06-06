import { useSearchParams } from "react-router-dom";
import SortSelect from "./SortSelect";

export default function SortBy({ urlParamName, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get(urlParamName) || "";

  function handleOnChange(e) {
    searchParams.set(urlParamName, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <SortSelect
      onChange={(e) => handleOnChange(e)}
      type="white"
      value={currentSort}
      urlParamName={urlParamName}
      options={options}
    />
  );
}
