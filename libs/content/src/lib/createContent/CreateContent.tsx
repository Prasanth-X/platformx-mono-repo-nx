/* eslint-disable no-debugger */
import { useLocation } from "react-router";
import DynamicContent from "../DynamicComponentBuilder/DynamicContent";
import { DynamicContentType } from "../DynamicComponentBuilder/DynamicContentType";

export const CreateContent = () => {
    debugger
    const location = useLocation();
    const contentType = location.state;

    switch (contentType) {
        case "profile":
            return <DynamicContentType contentType={contentType}></DynamicContentType>;

        default:
            return <DynamicContent contentType={contentType}></DynamicContent>;
    }
};
