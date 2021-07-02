import * as React from "react";
import { connect } from "react-redux";

export const ComponentBranch = (
  testFunc: (toggles: any) => boolean,
  ComponentA: React.ComponentType<any>,
  ComponentB: React.ComponentType<any>
): React.ComponentType<any> => {
  const WithToggleComponent = (
    { toggles }: any,
    ...props: any
  ): React.ReactElement => {
    return testFunc(toggles) ? (
      <ComponentA {...props} />
    ) : (
      <ComponentB {...props} />
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
