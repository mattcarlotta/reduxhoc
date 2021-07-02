/* eslint-disable no-use-before-define */
import * as React from "react";
import { connect } from "react-redux";

export const ComponentBranch = (
  testFunc: (toggles: any) => boolean,
  ComponentA: React.ComponentType,
  ComponentB: React.ComponentType
): React.ComponentType => {
  const WithToggleComponent = ({
    toggles,
    ...rest
  }: any): React.ReactElement => {
    return testFunc(toggles) ? (
      <ComponentA {...rest} />
    ) : (
      <ComponentB {...rest} />
    );
  };

  const mapStateToProps = (state: any) => ({
    toggles: state.toggles
  });

  return connect<ReturnType<typeof mapStateToProps>>(mapStateToProps)(
    WithToggleComponent
  );
};

export default ComponentBranch;
