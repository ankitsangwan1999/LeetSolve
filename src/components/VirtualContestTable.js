import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { AddRemoveButton } from '../styles/add-remove-button'
import 'regenerator-runtime';
import { Scrollable } from "../styles/scrollbar";

import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";
import { CategoryButton } from "../styles/category";
import Popup from "./Popup";
import VirtualContest from "./VirtualContest";

const VirtualContestTable = ({ data, virtualContestQuestions, setVirtualContestQuestions, setResponse }) => {
	console.log("DATA:", data);

	const [ selectedQuestions, setSelectedQuestions ] = useState([]);
	const [ popup, setPopup ] = useState(false);

	const handleStartVirtualContest = () => {
		if(selectedQuestions.length<2 || selectedQuestions.length>5) {
			setPopup(true);
			return;
		}
		console.log("Virtual contest has started");
		let questionsList = selectedQuestions;
		setSelectedQuestions([]);
		setVirtualContestQuestions(questionsList);
	}

	const handleOnClick = (que) => {

		setSelectedQuestions(prevQues => {
			let newSelectedQues = [];						//new list of selected questions
			let flag=0;										//flag=1 if question in list, else 0
			prevQues.forEach(question => {
				if(question["stat"]["question__title_slug"] == que["stat"]["question__title_slug"]) {
					flag = 1;
				}
			});
			prevQues.forEach(question => {		//add rest of the questions
				if(question["stat"]["question__title_slug"] != que["stat"]["question__title_slug"]) {
					newSelectedQues.push(question);
				}
			});
			if(flag == 0) {									//if flag=0(i.e. question not in current list) then add this question to the new list
				newSelectedQues.push(que);
			}
			return newSelectedQues;
		});
	}

	if(virtualContestQuestions.length>=2 && virtualContestQuestions.length<=5) {
		return (
			<VirtualContest 
				data={data} 
				virtualContestQuestions={virtualContestQuestions} 
				setVirtualContestQuestions={setVirtualContestQuestions} 
				setResponse={setResponse} 
			/>
		)
	}

	return (
		<TableContainer>
			{popup && (
				<Popup
					setPopup={setPopup}
					popup={popup}
					warningMessage={"Please select 2-5 questions"}
				/>
			)}
			<CategoryButton
				active={true}
				onClick={handleStartVirtualContest}
			>
				Start Virtual Contest
			</CategoryButton>
			<Table>
				<colgroup>
					<col span="1" style={{ width: "10%" }} />
					<col span="1" style={{ width: "60%" }} />
					<col span="1" style={{ width: "15%" }} />
					<col span="1" style={{ width: "15%" }} />
				</colgroup>
				<THead>
					<Tr>
						<Th>ID</Th>
						<Th style={{ color: "00f2ff" }}>Title</Th>
						<Th style={{ color: "pink" }}>Level</Th>
						<Th style={{ color: "00fff5" }}>Status</Th>
					</Tr>
				</THead>
			</Table>
			<div></div>
			<Scrollable maxHeight="68vh">
				<Table>
					<colgroup>
						<col span="1" style={{ width: "10%" }} />
						<col span="1" style={{ width: "60%" }} />
						<col span="1" style={{ width: "15%" }} />
						<col span="1" style={{ width: "15%" }} />
					</colgroup>
					<TBody>
						{selectedQuestions.map((que, index) => {

							//displaying the selected questions

							return (
								<Tr key={index}>
									<Td>
										{que["stat"]["frontend_question_id"]}
									</Td>
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
										<AddRemoveButton onClick={() => handleOnClick(que)} isRemoveButton={true} >
											Remove
										</AddRemoveButton>
									</Td>
								</Tr>
							);
						})}
					</TBody>
				</Table>
			</Scrollable>
			<Scrollable maxHeight="68vh">
				<Table>
					<colgroup>
						<col span="1" style={{ width: "10%" }} />
						<col span="1" style={{ width: "60%" }} />
						<col span="1" style={{ width: "15%" }} />
						<col span="1" style={{ width: "15%" }} />
					</colgroup>
					<TBody>
						{data["stat_status_pairs"].map((que, index) => {

							if(que["status"] === "ac" || que["status"] === "notac" || que["paid_only"]==true) {		//  return null if attempted or paid
								return null;
							}

							let isSelected = false;
							selectedQuestions.forEach(question => {
								if(question["stat"]["question__title_slug"] == que["stat"]["question__title_slug"]) {
									isSelected=true;
								}
							});
							
							if(isSelected) {
								return null;
							}

							// if free and not attempted then return as a row for the table
							return (
								<Tr key={index}>
									<Td>
										{que["stat"]["frontend_question_id"]}
									</Td>
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
										{/* <AddRemoveButton onClick={() => handleOnClick(que["stat"]["question__title_slug"])} isRemoveButton={isSelected} > */}
										<AddRemoveButton onClick={() => handleOnClick(que)} isRemoveButton={isSelected} >
											{ (isSelected)? "Remove" : "Add" }
										</AddRemoveButton>
									</Td>
								</Tr>
							);
						})}
					</TBody>
				</Table>
			</Scrollable>
		</TableContainer>
	);
};

VirtualContestTable.propTypes = {
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

export default VirtualContestTable;
