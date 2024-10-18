declare module "react-plotly.js" {
  import { Component } from "react";
  import * as Plotly from "plotly.js";

  export interface PlotProps {
    data?: Plotly.Data[];
    layout?: Partial<Plotly.Layout>;
    config?: Partial<Plotly.Config>;
    onError?: (error: Error) => void;
    onClick?: (data: any) => void;
    onDoubleClick?: (data: any) => void;
    onLegendClick?: (data: any) => void;
    onLegendDoubleClick?: (data: any) => void;
    onHover?: (data: any) => void;
    onUnhover?: (data: any) => void;
  }

  export default class Plot extends Component<PlotProps> {}
}
