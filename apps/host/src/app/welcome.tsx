import { FC } from "react";

interface WelcomeProps {}

export const Welcome: FC<WelcomeProps> = props => {
  return (
    <div>
      <h1>Host</h1>
    </div>
  );
};

export default Welcome;
