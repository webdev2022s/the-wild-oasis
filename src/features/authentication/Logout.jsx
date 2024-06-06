import ButtonIcon from "../../ui/ButtonIcon";
import { BiLogOut } from "react-icons/bi";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
export default function Logout() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon type="red" disabled={isPending} onClick={() => logout()}>
      {isPending ? <SpinnerMini /> : <BiLogOut />}
    </ButtonIcon>
  );
}
