import React from "react";
import propTypes, { array } from "prop-types";

import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";

const AcQuestionsTable = ({ data }) => {
	console.log("DATA:", data);
	return (
		<TableContainer>
			<Table>
				<colgroup>
					<col span="1" style={{ width: "70%" }} />
					<col span="1" style={{ width: "15%" }} />
					<col span="1" style={{ width: "15%" }} />
				</colgroup>
				<THead>
					<Tr>
						<Th style={{ color: "00f2ff" }}>Title</Th>
						<Th style={{ color: "pink" }}>Level</Th>
						<Th style={{ color: "00fff5" }}>Status</Th>
					</Tr>
				</THead>
			</Table>
			<div></div>
			<Table>
				<colgroup>
					<col span="1" style={{ width: "70%" }} />
					<col span="1" style={{ width: "15%" }} />
					<col span="1" style={{ width: "15%" }} />
				</colgroup>
				<TBody>
					{data["stat_status_pairs"].map((que, index) => {
						if(!(que["status"] === "ac")) {						//if not ac then return null
							return null;
						}
						//if ac then return as a row for the table
						return (
							<Tr key={index}>
								<Td>
									<a
										href={`https://leetcode.com/problems/${que["stat"]["question__title_slug"]}`}
										target="_blank"
										rel="noreferrer"
									>
										{que["stat"]["question__title"]}
									</a>
								</Td>
								<Td>
									{que["difficulty"]["level"] == 1
										? "Easy"
										: que["difficulty"]["level"] == 2
										? "Medium"
										: "Hard"}
								</Td>
								<Td>
									{que["status"] === "ac"
										? "AC"
										: que["status"] === "notac"
										? "Not-AC"
										: "Not-Attempted"}
								</Td>
							</Tr>
						);
					})}
				</TBody>
			</Table>
		</TableContainer>
	);
};

AcQuestionsTable.propTypes = {
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
};

export default AcQuestionsTable;
