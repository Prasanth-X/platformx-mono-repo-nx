import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { graph } from "./Constants";
import AreaGraph from "./area/AreaGraph";
import BarChartVertical from "./bar/BarChartVertical";
import PieGraph from "./pie/PieGraph";
import BarChartHorizontal from "./bar/BarChartHorizontal";
import PieChartWithNeedle from "./pie/PieChartWithneedle";
import BigNumber from "./area/BigNumber";
import "./Charts.css";
import CustomBoxForDemo from "./CustomBoxForDemo";

export default function ChartsForDemo() {
  const mock1 = {
    authoring_getDashboardDetailById: [
      {
        meta_data: {
          datasource: "12__table",
          viz_type: "pie",
          slice_id: 21,
          granularity_sqla: "etl_tstamp",
          time_range: 'DATEADD(DATETIME("now"), -15, day) : DATEADD(DATETIME("now"), 7, day)',
          groupby: [
            {
              expressionType: "SQL",
              label: "My column",
              sqlExpression: "unstruct_event_com_hcl_x_page_impression_1_0_1.page_title",
            },
          ],
          metric: {
            aggregate: null,
            column: null,
            datasourceWarning: false,
            expressionType: "SQL",
            hasCustomLabel: true,
            label: "Total Count",
            optionName: "metric_jx22r1kp5la_mhnc14j3ois",
            sqlExpression: "COUNT(unstruct_event_com_hcl_x_page_impression_1_0_1.page_title)",
          },
          adhoc_filters: [],
          row_limit: 10,
          sort_by_metric: true,
          color_scheme: "supersetColors",
          show_labels_threshold: "",
          show_legend: true,
          legendType: "scroll",
          legendOrientation: "top",
          label_type: "key_value_percent",
          number_format: "SMART_NUMBER",
          date_format: "smart_date",
          show_labels: true,
          labels_outside: true,
          label_line: true,
          show_total: true,
          outerRadius: 70,
          donut: false,
          innerRadius: 30,
          extra_form_data: {},
          dashboards: [11],
        },
        title: "Active Courses",
        graph_type: "pie",
        id: 21,
        description: "",
        column_names: ["My column", "Total Count"],
        chartData: [
          {
            "My column": "To Do",
            "Total Count": 14.1,
          },
          {
            "My column": "In Progress",
            "Total Count": 50.23,
          },
          {
            "My column": "Done",
            "Total Count": 35.67,
          },
        ],
      },
      {
        meta_data: {
          datasource: "26__table",
          viz_type: "bar",
          slice_id: 34,
          granularity_sqla: "collector_tstamp",
          time_grain_sqla: "P1W",
          time_range: "No filter",
          metrics: [
            {
              aggregate: "COUNT",
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: "prelem_id",
                description: null,
                expression: "",
                filterable: true,
                groupby: true,
                id: 1702,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: "STRING",
                type_generic: 1,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: "SIMPLE",
              hasCustomLabel: false,
              label: "Popularity",
              optionName: "metric_a33ef0l52e_gbq3ekh3wsd",
              sqlExpression: null,
            },
          ],
          adhoc_filters: [],
          groupby: ["prelem_title"],
          timeseries_limit_metric: [],
          contribution: false,
          row_limit: 1000,
          color_scheme: "supersetColors",
          show_brush: "auto",
          show_legend: false,
          show_bar_value: false,
          rich_tooltip: true,
          bar_stacked: false,
          line_interpolation: "linear",
          show_controls: true,
          bottom_margin: "auto",
          x_ticks_layout: "auto",
          x_axis_format: "smart_date",
          left_margin: "auto",
          y_axis_format: "SMART_NUMBER",
          y_axis_bounds: [null, null],
          rolling_type: "sum",
          comparison_type: "values",
          annotation_layers: [],
          extra_form_data: {},
          dashboards: [11, 13, 14, 17],
        },
        title: "Most Popular Courses",
        graph_type: "bar_horizontal",
        id: 33,
        description: "",
        column_names: ["Course", "Popularity"],
        chartData: [
          {
            Course: "New Rule Announced",
            Popularity: 78,
          },
          {
            Course: "New Rule Announced 2",
            Popularity: 57,
          },
          {
            Course: "FIFA Referee Assesment",
            Popularity: 35,
          },
          {
            Course: "Basic Referee Training Course",
            Popularity: 42,
          },
          {
            Course: "Medium Referee Training Course",
            Popularity: 27,
          },
          {
            Course: "Advanced Referee Training Course",
            Popularity: 18,
          },
        ],
      },
      {
        meta_data: {
          datasource: "20__table",
          viz_type: "echarts_timeseries_bar",
          slice_id: 20,
          granularity_sqla: "etl_tstamp",
          time_grain_sqla: "P1W",
          time_range: "No filter",
          metrics: [
            {
              aggregate: "COUNT",
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: "user_ip",
                description: null,
                expression: "",
                filterable: true,
                groupby: true,
                id: 1650,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: "STRING",
                type_generic: 1,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: "SIMPLE",
              hasCustomLabel: false,
              label: "COUNT(user_ip)",
              optionName: "metric_418g8zv8iiu_eqanqwylx25",
              sqlExpression: null,
            },
          ],
          groupby: ["browsing_data"],
          contributionMode: null,
          adhoc_filters: [],
          limit: 500,
          timeseries_limit_metric: null,
          order_desc: true,
          row_limit: 1000,
          truncate_metric: true,
          show_empty_columns: true,
          rolling_type: "mean",
          comparison_type: "values",
          resample_method: "mean",
          annotation_layers: [],
          forecastPeriods: 10,
          forecastInterval: 0.8,
          orientation: "vertical",
          x_axis_title: "Month",
          x_axis_title_margin: 15,
          y_axis_title: "Revenue",
          y_axis_title_margin: 15,
          y_axis_title_position: "Left",
          color_scheme: "supersetColors",
          show_value: true,
          stack: false,
          only_total: true,
          zoomable: false,
          show_legend: true,
          legendType: "scroll",
          legendOrientation: "top",
          x_axis_time_format: "m",
          xAxisLabelRotation: 45,
          y_axis_format: "~g",
          y_axis_bounds: [null, null],
          rich_tooltip: false,
          tooltipTimeFormat: "smart_date",
          extra_form_data: {},
          dashboards: [12, 11],
        },
        title: "Revenue",
        graph_type: "echarts_timeseries_bar",
        id: 20,
        description: "",
        column_names: ["Month", "Orders", "New Revenue", "Visits"],
        chartData: [
          {
            Month: "Jan",
            Orders: 420,
            "New Revenue": 219,
            Visits: 640,
          },
          {
            Month: "Feb",
            Orders: 560,
            "New Revenue": 308,
            Visits: 205,
          },
          {
            Month: "Mar",
            Orders: 705,
            "New Revenue": 540,
            Visits: 308,
          },
          {
            Month: "Apr",
            Orders: 308,
            "New Revenue": 805,
            Visits: 540,
          },
          {
            Month: "May",
            Orders: 840,
            "New Revenue": 608,
            Visits: 405,
          },
          {
            Month: "Jun",
            Orders: 905,
            "New Revenue": 740,
            Visits: 308,
          },
        ],
      },
      {
        meta_data: {
          datasource: "26__table",
          viz_type: "bar",
          slice_id: 37,
          granularity_sqla: "collector_tstamp",
          time_grain_sqla: "P1W",
          time_range: "No filter",
          metrics: [
            {
              aggregate: "COUNT",
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: "prelem_id",
                description: null,
                expression: "",
                filterable: true,
                groupby: true,
                id: 1702,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: "STRING",
                type_generic: 1,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: "SIMPLE",
              hasCustomLabel: false,
              label: "Popularity",
              optionName: "metric_a33ef0l52e_gbq3ekh3wsd",
              sqlExpression: null,
            },
          ],
          adhoc_filters: [],
          groupby: ["Course"],
          timeseries_limit_metric: [],
          contribution: false,
          row_limit: 1000,
          color_scheme: "supersetColors",
          show_brush: "auto",
          show_legend: false,
          show_bar_value: false,
          rich_tooltip: true,
          bar_stacked: false,
          line_interpolation: "linear",
          show_controls: true,
          bottom_margin: "auto",
          x_ticks_layout: "auto",
          x_axis_format: "smart_date",
          left_margin: "auto",
          y_axis_format: "SMART_NUMBER",
          y_axis_bounds: [null, null],
          rolling_type: "sum",
          comparison_type: "values",
          annotation_layers: [],
          extra_form_data: {},
          dashboards: [11, 13, 14, 17],
        },
        title: "Course Engagement",
        graph_type: "bar",
        id: 34,
        description: "",
        column_names: ["Month", "value"],
        chartData: [
          {
            Month: "Jan",
            value: 44231,
          },
          {
            Month: "Feb",
            value: 30231,
          },
          {
            Month: "Mar",
            value: 35231,
          },
          {
            Month: "Apr",
            value: 32231,
          },
          {
            Month: "May",
            value: 36231,
          },
          {
            Month: "Jun",
            value: 38231,
          },
          {
            Month: "Jul",
            value: 58231,
          },
        ],
      },
      {
        meta_data: {
          datasource: "22__table",
          viz_type: "echarts_area",
          slice_id: 25,
          granularity_sqla: "etl_tstamp",
          time_grain_sqla: "P1D",
          time_range: "No filter",
          metrics: [
            {
              aggregate: "COUNT",
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: "author_name",
                description: null,
                expression: null,
                filterable: true,
                groupby: true,
                id: 1670,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: "STRING",
                type_generic: 1,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: "SIMPLE",
              hasCustomLabel: false,
              label: "COUNT(author_name)",
              optionName: "metric_3xfllv2px7k_9g8gndrfub",
              sqlExpression: null,
            },
          ],
          groupby: ["author_name"],
          contributionMode: null,
          adhoc_filters: [
            {
              clause: "WHERE",
              comparator: ["<NULL>"],
              datasourceWarning: false,
              expressionType: "SIMPLE",
              filterOptionName: "filter_vuasxb1wwp7_fr5ehg5ihqu",
              isExtra: false,
              isNew: false,
              operator: "NOT IN",
              operatorId: "NOT_IN",
              sqlExpression: null,
              subject: "author_name",
            },
          ],
          order_desc: true,
          row_limit: 1000,
          truncate_metric: true,
          show_empty_columns: false,
          rolling_type: "sum",
          comparison_type: "values",
          annotation_layers: [],
          forecastPeriods: 10,
          forecastInterval: 0.8,
          x_axis_title_margin: 15,
          y_axis_title_margin: 15,
          y_axis_title_position: "Left",
          color_scheme: "supersetColors",
          seriesType: "line",
          opacity: 0.2,
          show_value: true,
          stack: null,
          only_total: true,
          show_extra_controls: false,
          markerEnabled: true,
          markerSize: 6,
          zoomable: false,
          show_legend: true,
          legendType: "scroll",
          legendOrientation: "top",
          legendMargin: null,
          x_axis_time_format: "smart_date",
          rich_tooltip: true,
          tooltipSortByMetric: false,
          tooltipTimeFormat: "smart_date",
          y_axis_format: "SMART_NUMBER",
          y_axis_bounds: [null, null],
          extra_form_data: {},
          dashboards: [11],
        },
        title: "Page Vists vs Conversion",
        graph_type: "echarts_area",
        id: 25,
        description: "",
        column_names: ["Month", "Page Visits", "Conversion Rate"],
        chartData: [
          {
            Month: "Jan",
            "Page Visits": "0",
            "Conversion Rate": "0",
          },
          {
            Month: "Feb",
            "Page Visits": "10000",
            "Conversion Rate": "2000",
          },
          {
            Month: "Mar",
            "Page Visits": "15000",
            "Conversion Rate": "2500",
          },
          {
            Month: "Apr",
            "Page Visits": "35000",
            "Conversion Rate": "3000",
          },
          {
            Month: "May",
            "Page Visits": "40000",
            "Conversion Rate": "2200",
          },
          {
            Month: "Jun",
            "Page Visits": "26400",
            "Conversion Rate": "3250",
          },
          {
            Month: "Jul",
            "Page Visits": "37000",
            "Conversion Rate": "2500",
          },
          {
            Month: "Aug",
            "Page Visits": "29500",
            "Conversion Rate": "3550",
          },
          {
            Month: "Sep",
            "Page Visits": "39500",
            "Conversion Rate": "2550",
          },
          {
            Month: "Oct",
            "Page Visits": "48500",
            "Conversion Rate": "4550",
          },
          {
            Month: "Nov",
            "Page Visits": "69500",
            "Conversion Rate": "5000",
          },
        ],
      },
    ],
  };

  const mock2 = [
    {
      title: "Total Revenue",
      value: "$769,87.26",
      increment: "37.3%",
      decrement: "",
      change: "+15.5k this week",
      CustomIcon: () => <BrokenImageOutlinedIcon />,
    },
    {
      title: "Recent Average Rating",
      value: "8.34",
      increment: "1.3%",
      CustomIcon: () => <StarBorderPurple500Icon />,
    },
    {
      title: "Total Students",
      value: "4456",
      increment: "46.3%",
      decrement: "",
      change: "+0.8k this week",
      CustomIcon: () => <PeopleAltOutlinedIcon />,
    },
    {
      title: "Total Courses",
      value: "12",
      decrement: "13%",
      change: "-7 this week",
      CustomIcon: () => <SchoolOutlinedIcon />,
    },
  ];

  const mapGraphType = (graphType: string) => {
    switch (graphType) {
      case graph.chartType.line:
        return "line";
      case graph.chartType.area:
        return "area";
      case graph.chartType.bar:
        return "bar";
      case graph.chartType.bartimeseries:
        return "bartimeSeries";
      case graph.chartType.distbar:
        return "bar";
      case graph.chartType.pie:
        return "pie";
      case graph.chartType.piewithneedle:
        return "piewithneedle";
      case graph.chartType.bignumber:
        return "bignumber";
      case graph.chartType.barhorizontal:
        return "barhorizontal";
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
        case "line":
          return <AreaGraph itemData={item} />;
        case "area":
          return <AreaGraph itemData={item} />;
        case "bar":
          return <BarChartVertical itemData={item} />;
        case "bartimeSeries":
          return <BarChartVertical itemData={item} />;
        case "barhorizontal":
          return <BarChartHorizontal itemData={item} />;
        case "pie":
          return <PieGraph itemData={item} />;
        case "piewithneedle":
          return <PieChartWithNeedle itemData={item} />;
        case "bignumber":
          return <BigNumber itemData={item} />;
        default:
          return null;
      }
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {mock2.map((item, index) => {
          return (
            <Grid
              key={`${item.title} ${index.toString()}`}
              item
              xs={12}
              em={3}
              lg={3}
              sx={{ marginBottom: "20px" }}>
              <CustomBoxForDemo item={item} />
            </Grid>
          );
        })}

        <Grid container>
          <>
            {mock1 &&
              mock1?.authoring_getDashboardDetailById?.map((item: any) => {
                return (
                  <Grid
                    item
                    xs={12}
                    em={12}
                    lg={6}
                    xl={4}
                    sx={{ marginBottom: "30px" }}
                    key={item?.id}>
                    {renderCharts(item)}
                  </Grid>
                );
              })}
          </>
        </Grid>
      </Grid>
    </Box>
  );
}
