import * as React from "react";
import { connect } from "react-redux";

export const ComponentBranch = (
  testFunc: (state: any) => boolean,
  ComponentA: React.ComponentType<any>,
  ComponentB: React.ComponentType<any>
): React.ComponentType<any> => {
  const WithToggleComponent = ({ state, ...rest }: any): React.ReactElement => {
    return testFunc(state) ? (
      <ComponentA {...rest} />
    ) : (
      <ComponentB {...rest} />
    );
  };

  const mapStateToProps = (state: any) => ({ state });

  return connect<ReturnType<typeof mapStateToProps>>(mapStateToProps)(
    WithToggleComponent
  );
};

export default ComponentBranch;
