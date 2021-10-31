import React, { useEffect } from "react";
import QuestionsTable from "./QuestionsTable";
import AttemptedQuestionsTable from "./AttemptedQuestionsTable";
import AcQuestionsTable from "./AcQuestionsTable";
import NotAcQuestionsTable from "./NotAcQuestionsTable";
import propTypes from "prop-types";
import VirtualContestTable from './VirtualContestTable';

const TableContent = ({ data, category, onShuffle, virtualContestQuestions, setVirtualContestQuestions, setResponse }) => {
	//  This component checks the category and returns the corresponding component accordingly

	switch (category) {
		case "All Questions":
			return <QuestionsTable data={data} onShuffle={onShuffle} />;

		case "Attempted":
			return (
				<AttemptedQuestionsTable data={data} onShuffle={onShuffle} />
			);

		case "Accepted":
			return <AcQuestionsTable data={data} onShuffle={onShuffle} />;

		case "Not Accepted":
			return <NotAcQuestionsTable data={data} onShuffle={onShuffle} />;
		
		case "Virtual Contest":
			return <VirtualContestTable 
						data={data} 
						virtualContestQuestions={virtualContestQuestions} 
						setVirtualContestQuestions={setVirtualContestQuestions} 
						setResponse={setResponse} 
					/>;
		
		default:
			return null;
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
	onShuffle: propTypes.func,
	virtualContestQuestions: propTypes.arrayOf(
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
	setVirtualContestQuestions: propTypes.func,
	setResponse: propTypes.func,
};

export default TableContent;
