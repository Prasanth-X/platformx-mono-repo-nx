import { Grid } from "@mui/material";
import { Box } from "@mui/system";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { graph } from "./Constants";
import BarChartVertical from "./bar/BarChartVertical";
// import BarChartHorizontal from "./Bar/BarChartHorizontal";
import PieGraph from "./pie/PieGraph";
import "./Charts.css";
// import LineGraph from "./Line/LineGraph";
import AreaGraph from "./area/AreaGraph";
import PieChartWithNeedle from "./pie/PieChartWithneedle";
import BigNumber from "./area/BigNumber";
import { SkeltonLoader, ShowToastError } from "@platformx/utilities";
import { dashboardApi } from "@platformx/authoring-apis";
import BarChartHorizontal from "./bar/BarChartHorizontal";

const Charts = () => {
  const [chartsData, setChartsData] = useState<any>();
  const [graphLoading, setGraphLoading] = useState(false);
  useEffect(() => {
    const dashboadGraph = async () => {
      try {
        setGraphLoading(true);
        const response: any = await dashboardApi.fetchDashboardGraphs({
          dashboardId: "11",
        });
        setChartsData(response);
      } catch (err: any) {
        ShowToastError(err);
      } finally {
        setGraphLoading(false);
      }
    };
    dashboadGraph();
  }, []);
  const mapGraphType = (graphType: string) => {
    switch (graphType) {
      case graph.chartType.line:
        return graph.LINE;
      case graph.chartType.area:
        return graph.AREA;
      case graph.chartType.bar:
        return graph.BAR;
      case graph.chartType.bartimeseries:
        return graph.BARTIMESERIES;
      case graph.chartType.distbar:
        return graph.BAR;
      case graph.chartType.pie:
        return graph.PIE;
      case graph.chartType.piewithneedle:
        return graph.PIEWITHNEEDLE;
      case graph.chartType.bignumber:
        return graph.BIGNUMBER;
      case graph.chartType.barhorinzontal:
        return graph.BARHORIZONTAL;
      default:
        return null;
    }
  };
  const renderCharts = (item: any) => {
    if (
      item.chartData &&
      item.graph_type &&
      item.chartData.length &&
      item.column_names &&
      item.column_names.length
    ) {
      const mappedName = mapGraphType(item.graph_type);
      switch (mappedName) {
        case graph.LINE:
          return <AreaGraph itemData={item} />;
        case graph.AREA:
          return <AreaGraph itemData={item} />;
        case graph.BAR:
          return <BarChartHorizontal itemData={item} />;
        case graph.BARTIMESERIES:
          return <BarChartVertical itemData={item} />;
        case graph.BARHORIZONTAL:
          return <BarChartHorizontal itemData={item} />;
        case graph.PIE:
          return <PieGraph itemData={item} />;
        case graph.PIEWITHNEEDLE:
          return <PieChartWithNeedle itemData={item} />;
        case graph.BIGNUMBER:
          return <BigNumber itemData={item} />;
        default:
          return null;
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid container className='chartContainer'>
        {graphLoading ? (
          <>
            <Grid item xs={12} em={6} lg={4}>
              <Box sx={{ marginLeft: "16px" }}>
                <SkeltonLoader maxWidth={600} maxHeight={400} />
              </Box>
            </Grid>
            <Grid item xs={12} em={6} lg={4}>
              <Box sx={{ marginLeft: "16px" }}>
                <SkeltonLoader maxWidth={600} maxHeight={400} />
              </Box>
            </Grid>
            <Grid item xs={12} em={6} lg={4}>
              <Box sx={{ marginLeft: "16px" }}>
                <SkeltonLoader maxWidth={600} maxHeight={400} />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            {chartsData?.authoring_getDashboardDetailById?.map((item: any) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    em={6}
                    xl={4}
                    sx={{ marginBottom: "30px" }}
                    key={item?.id}>
                    {renderCharts(item)}
                  </Grid>
                );
              })}
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default Charts;
