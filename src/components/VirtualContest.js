import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { AddRemoveButton } from '../styles/add-remove-button'
import 'regenerator-runtime';
import emitUserDataEvent from "../helpers/EmitUserDataEvent";
import { FaUndo } from "react-icons/fa";

import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";
import { TIME_OUT_LIMIT } from "../Constants";
import ContestSummary from "./ContestSummary";

const VirtualContest = ({ data, virtualContestQuestions, setVirtualContestQuestions, setResponse }) => {
	// console.log("DATA:", data);

    const [ questionsData, setQuestionsData ] = useState(data);
    const [ contestQuestions, setContestQuestions ] = useState(virtualContestQuestions);
    const [ endingContest, setEndingContest ] = useState(false);
    const [ contestEnded, setContestEnded ] = useState(false);
    const [ fetchingData, setFetchingData ] = useState(false);
    const [ dataFetched, setDataFetched ] = useState(false);

    const handleEndButton = () => {
		setEndingContest(true);
    }

	const handleCloseVirtualContest = () => {
        setVirtualContestQuestions([]);
	}

    const handleGoBackToContest = () => {
        setEndingContest(false);
    }
    
    const handleFetchData = () => {
        setFetchingData(true);
        emitUserDataEvent(setResponse, setQuestionsData);
    }

	useEffect(() => {
        const interval  = setInterval(() => {
            setFetchingData(true);
            emitUserDataEvent(setResponse, setQuestionsData);
        }, 1000*TIME_OUT_LIMIT );

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.

	}, []);

    useEffect(() => {
        let updatedQuestionsList = [];
        questionsData["stat_status_pairs"].forEach(que => {
            let flag = 0;
            virtualContestQuestions.forEach(question => {
                if(que["stat"]["frontend_question_id"] === question["stat"]["frontend_question_id"]) {
                    flag=1;
                    console.log(que["stat"]["question__title"], que["status"])
                }
            });
            if(flag === 1) {
                updatedQuestionsList.push(que);
            }
        });
        setVirtualContestQuestions(updatedQuestionsList);
        setContestQuestions((prev) => {
            return updatedQuestionsList;
        });
        setFetchingData(false);
        setDataFetched(true);
        const timer = setTimeout(() => {
            setDataFetched(false);

            return () => clearTimeout(timer);
        }, 2000);
    }, [questionsData]);

    if(contestEnded) {
        return (
            <div>
                Contest has ended !!
                <ContestSummary contestQuestions={contestQuestions} />
                <AddRemoveButton onClick={handleCloseVirtualContest} isRemoveButton={true}>
                    Close Summary
                </AddRemoveButton>
            </div>
        )
    }

    const fetchSuccess = !questionsData.shouldRunTimer;
    const msg = (fetchSuccess)?"Status Updated Successfully!!" : "Fetching Status Failed ... ";
    
    return (
        <div>
            <TableContainer style={{pointerEvents: endingContest?"none":"auto" }}>
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
                
                <Table>
                    <colgroup>
                        <col span="1" style={{ width: "10%" }} />
                        <col span="1" style={{ width: "60%" }} />
                        <col span="1" style={{ width: "15%" }} />
                        <col span="1" style={{ width: "15%" }} />
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
                                </Tr>
                            );
                        })}
                    </TBody>
                </Table>
            </TableContainer>
            <AddRemoveButton isRemoveButton={true} onClick={handleEndButton} style={{pointerEvents: endingContest?"none":"auto" }}>
                End Virtual Contest
            </AddRemoveButton>
            
            <AddRemoveButton isAddButton={true} onClick={handleFetchData} style={{pointerEvents: endingContest?"none":"auto", paddingTop: "5px", marginLeft: "30%" }}>
                Fetch Status
                <span style={{margin: "10px 0px 0px 6px" }}><FaUndo/></span>
            </AddRemoveButton>

            {
                fetchingData
                ?<AddRemoveButton isAddButton={true} style={{ marginLeft: "44%", marginTop: "10px" }} >
                    Fetching Status ...
                </AddRemoveButton>
                :null
            }

            {
                dataFetched && !fetchingData
                ?<AddRemoveButton isRemoveButton={!fetchSuccess} isAddButton={fetchSuccess}  style={{paddingTop: "5px", marginLeft: "44%", marginTop: "10px" }} >
                    {msg}
                </AddRemoveButton>
                :null
            }
            
            {
                endingContest
                ?<AddRemoveButton style={{marginLeft: "40%", marginTop: "30px" }}>
                    <div style={{color: "red"}}>
                        Are you sure to end the contest?
                    </div>
                    <AddRemoveButton onClick={() => setContestEnded(true)} isRemoveButton={true}>Yes</AddRemoveButton>
                    <AddRemoveButton onClick={handleGoBackToContest} isAddButton={true}>Go back to contest</AddRemoveButton>
                </AddRemoveButton>
                :null
            }
        </div>
    )
}

VirtualContest.propTypes = {
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

export default VirtualContest;
