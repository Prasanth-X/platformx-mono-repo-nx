/* eslint-disable no-debugger */
import { useLocation } from "react-router";
import DynamicContent from "../DynamicComponentBuilder/DynamicContent";
import { DynamicContentType } from "../DynamicComponentBuilder/DynamicContentType";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";

export const CreateContent = () => {

    const location = useLocation();
    const contentType = location.state;

    switch (contentType) {
        case "profile":
            <div>DynamicContentType</div>;
            break;
        // return <DynamicContentType contentType={contentType}></DynamicContentType>;
        case "quiz":
            return <CreateQuiz></CreateQuiz>;
        default:
            return <>DynamicContent</>;
        // return <DynamicContent contentType={contentType}></DynamicContent>;
    }
};
