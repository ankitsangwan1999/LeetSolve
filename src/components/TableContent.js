import React from "react";
import QuestionsTable from "./QuestionsTable";
import AttemptedQuestionsTable from "./AttemptedQuestionsTable";
import AcQuestionsTable from "./AcQuestionsTable";
import NotAcQuestionsTable from "./NotAcQuestionsTable";
import VirtualContest from "./VirtualContest";
import propTypes from "prop-types";

const TableContent = ({ data, category, onShuffle }) => {
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
			return <VirtualContest data={data} />;

		case "Reload":
			window.location.reload();
			
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
};

export default TableContent;
