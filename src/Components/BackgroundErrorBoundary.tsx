import React from "react";
import { WebGLError } from "./WebGLError";
interface BackgroundErrorBoundaryProps
{
  children:JSX.Element;
}
interface BackgroundErrorBoundaryState
{
  hasError:boolean;
}
export class BackgroundErrorBoundary extends React.PureComponent<BackgroundErrorBoundaryProps, BackgroundErrorBoundaryState>
{
  constructor(props:BackgroundErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error:any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <WebGLError/>;
    }

    return this.props.children; 
  }
}