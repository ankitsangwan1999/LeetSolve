import React from "react";
import QuestionsTable from "./QuestionsTable";
import AttemptedQuestionsTable from "./AttemptedQuestionsTable";

const TableContent = ({ data, category }) => {
    
    if(category === 'All Questions') {
        return (
            <QuestionsTable data={data} />
        );
    }

    if(category === 'Attempted') {
        return (
            <AttemptedQuestionsTable data={data} />
        );
    }
};

export default TableContent;
