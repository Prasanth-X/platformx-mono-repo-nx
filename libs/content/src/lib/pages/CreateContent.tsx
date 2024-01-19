import { useLocation } from "react-router";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";

export const CreateContent = () => {

    const location = useLocation();
    const contentType = location.state;

    switch (contentType) {
        case "profile":
            return <DynamicContentType contentType={contentType}></DynamicContentType>;

        case "quiz":
            return <CreateQuiz></CreateQuiz>;
        default:
            return <>DynamicContent</>;
    }
};
