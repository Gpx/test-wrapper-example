import React, { ComponentProps, JSXElementConstructor } from "react";
import pick from "lodash.pick";

function NetworkContext({
  children,
  networkMode,
}: {
  children: React.ReactNode;
  networkMode: "online" | "offline";
}) {
  return <div data-testid={networkMode}>{children}</div>;
}

function NetworkWrapper({
  children,
  networkMode = "online",
}: {
  children: React.ReactNode;
  networkMode?: "online" | "offline";
}) {
  return <NetworkContext networkMode={networkMode}>{children}</NetworkContext>;
}

function CurrentUserContext({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: string;
}) {
  return <div data-testid={currentUser}>{children}</div>;
}

function CurrentUserWrapper({
  children,
  currentUser = "Giorgio",
}: {
  children: React.ReactNode;
  currentUser?: string;
}) {
  return (
    <CurrentUserContext currentUser={currentUser}>
      {children}
    </CurrentUserContext>
  );
}

function Pass({ children }: { children: React.ReactNode }) {
  return children;
}

type WrapType<K extends PropertyKey, T> =
  | { [P in K]?: false | undefined }
  | ({ [P in K]: true } & T);

type WrapProps<
  Wrap extends JSXElementConstructor<{ children: React.ReactNode }>
> = Exclude<ComponentProps<Wrap>, "children">;

type BaseProps = {
  children: React.ReactNode;
};

type Props = BaseProps &
  WrapType<"withNetwork", WrapProps<typeof NetworkWrapper>> &
  WrapType<"withCurrentUser", WrapProps<typeof CurrentUserWrapper>>;

export function TestWrapper(props: Props) {
  const { children } = props;
  const NetworkW = props.withNetwork ? NetworkWrapper : Pass;
  const CurrentUserW = props.withCurrentUser ? CurrentUserWrapper : Pass;

  return (
    <NetworkW {...pick(props, "networkMode")}>
      <CurrentUserW {...pick(props, "currentUser")}>{children}</CurrentUserW>
    </NetworkW>
  );
}
