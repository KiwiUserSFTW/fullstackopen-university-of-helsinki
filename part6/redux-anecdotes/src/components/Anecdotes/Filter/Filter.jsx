import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../reducers/filterReducer/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <label>
        filter <input onChange={handleChange} value={filter} />
      </label>
    </div>
  );
};

export default Filter;
