import React from "react";
import QuestionsTable from "./QuestionsTable";
import AttemptedQuestionsTable from "./AttemptedQuestionsTable";
import AcQuestionsTable from "./AcQuestionsTable"
import NotAcQuestionsTable from "./NotAcQuestionsTable"
import propTypes from "prop-types";

const TableContent = ({ data, category }) => {

    //  This component checks the category and returns the corresponding component accordingly

    switch(category) {

        case 'All Questions' : 
            return (
                <QuestionsTable data={data} />
            );
        
        case 'Attempted' : 
            return (
                <AttemptedQuestionsTable data={data} />
            );
        
        case 'Accepted' : 
            return (
                <AcQuestionsTable data={data} />
            );
        
        case 'Not Accepted' : 
            return (
                <NotAcQuestionsTable data={data} />
            );
        
        default : 
            return (
                <div>
                    Not yet implemented!!
                </div>
            )

    }

};

TableContent.propTypes = {
	data: propTypes.shape({
		stat_status_pairs: propTypes.arrayOf(
			propTypes.shape({
				difficulty: propTypes.shape({ level: propTypes.number }),
				stat: propTypes.shape({
					question__title: propTypes.string,
					question__title_slug: propTypes.string,
				}),
				level: propTypes.number,
				status: propTypes.string,
			})
		),
	}),
    category: propTypes.string,
};

export default TableContent;
