import logo from "../../../assets/images/Logo.svg";
import { Button } from "../button";

import s from "./header.module.scss";

type HeaderPropsType = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

export const Header = (props: HeaderPropsType) => {
  const { isLoggedIn } = props;

  return (
    <div className={s.header}>
      <div className={s.container}>
        <img src={logo} alt="logo" />
        {isLoggedIn ? (
          <Button onClick={props.onLogout}>Sign out</Button>
        ) : (
          <Button as={"a"}>Sign in</Button>
        )}
      </div>
    </div>
  );
};
