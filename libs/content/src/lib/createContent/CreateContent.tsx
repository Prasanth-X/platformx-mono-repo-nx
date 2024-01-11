/* eslint-disable no-debugger */
import { useLocation } from "react-router";
import DynamicContent from "../DynamicComponentBuilder/DynamicContent"

export const CreateContent = () => {
    debugger
    const location = useLocation();
    const contentType = location.state;
    return (<DynamicContent contentType={contentType} ></DynamicContent>)
}