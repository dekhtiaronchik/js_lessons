import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeShowName } from "../../store/profile/actions";

function Profile() {
  const dispatch = useDispatch();
  const { name, age, showName } = useSelector((state) => state.profile);

  const setShowName = useCallback(() => {
    dispatch(changeShowName());
  }, [dispatch]);

  return (
    <div>
      <h3>Profile page</h3>
      {showName && <p>Name: {name}</p>}
      <p>Age: {age}</p>
      <input
        type="checkbox"
        checked={showName}
        value={showName}
        onChange={setShowName}
      />
      <span>Show Name</span>
    </div>
  );
}

export default Profile;
