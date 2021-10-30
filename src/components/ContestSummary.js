import React, { useEffect } from "react";
import propTypes from "prop-types";
import { AddRemoveButton } from '../styles/add-remove-button'
import 'regenerator-runtime';

import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";

const ContestSummary = ({ contestQuestions, solveTime }) => {

    let easySolved=0,medSolved=0,hardSolved=0;

    const getAcTimeComponent = (qid) => {
        let timerComponents = [];
        const timeTaken = solveTime[""+qid];
        if(timeTaken) {
            Object.keys(timeTaken).forEach((interval) => {
                if (!timeTaken[interval]) {
                    return;
                }
            
                timerComponents.push(
                    <span >
                        {timeTaken[interval]} {interval}{" "}
                    </span>
                );
            });
            return timerComponents;
        }
        return (
            <span>
                -
            </span>
        )
    }

    contestQuestions.forEach(que => {
        if(que["difficulty"]["level"] == 1 && que["status"] == "ac") {
            easySolved++;
        } else if(que["difficulty"]["level"] == 2 && que["status"] == "ac") {
            medSolved++;
        } else if(que["status"] == "ac") {
            hardSolved++;
        }
    });
	
    return (
        <div>
            <TableContainer>
                <Table>
                    <colgroup>
                        <col span="1" style={{ width: "5%" }} />
                        <col span="1" style={{ width: "45%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                    </colgroup>
                    <THead>
                        <Tr>
                            <Th>ID</Th>
                            <Th style={{ color: "00f2ff" }}>Title</Th>
                            <Th style={{ color: "pink" }}>Level</Th>
                            <Th style={{ color: "00fff5" }}>Status</Th>
                            <Th style={{ color: "pink" }}>Submissions</Th>
                            <Th style={{ color: "00fff5" }}>Total Acs</Th>
                            <Th style={{ color: "pink" }}>Ac Time</Th>
                        </Tr>
                    </THead>
                </Table>
                <div></div>
                
                <Table>
                    <colgroup>
                        <col span="1" style={{ width: "5%" }} />
                        <col span="1" style={{ width: "45%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "10%" }} />
                    </colgroup>
                    <TBody>
                        {contestQuestions.map((que, index) => {

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
                                        <AddRemoveButton isRemoveButton={que["status"]==="notac"} isAddButton={que["status"]==="ac"}>
                                            {
                                                que["status"]==="notac"
                                                ?"Not AC"
                                                :que["status"]==="ac"
                                                ?"AC"
                                                :"Not Attempted"
                                            }
                                        </AddRemoveButton>
                                    </Td>
                                    <Td>
                                        {que["stat"]["total_submitted"]}
                                    </Td>
                                    <Td>
                                        {que["stat"]["total_acs"]}
                                    </Td>
                                    <Td>
                                        {
                                            getAcTimeComponent(que["stat"]["frontend_question_id"])
                                        }
                                    </Td>
                                </Tr>
                            );
                        })}
                    </TBody>
                </Table>
            </TableContainer>
            <AddRemoveButton style={{ fontSize: "15px", marginLeft: "42%", marginBottom: "20px" }} isAddButton={true} >
                <div>
                    Number of Easy questions solved = {easySolved}
                </div>
                <div>
                    Number of Medium questions solved = {medSolved}
                </div>
                <div>
                    Number of Hard questions solved = {hardSolved}
                </div>
            </AddRemoveButton>
        </div>
    )
}

ContestSummary.propTypes = {
	contestQuestions: propTypes.arrayOf(
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
	solveTime: propTypes.object,
};

export default ContestSummary;
