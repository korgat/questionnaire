import { PropsWithChildren } from "react";
import ReduxProvider from "./reduxProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
