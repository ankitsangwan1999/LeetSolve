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
import { Scrollable } from "../styles/scrollbar";
import { ShuffleButton } from "../styles/shufflestyle";

//import shuffle_image from "../static/images/icon.png";
//import { Link } from 'react-router';
import { useTable, usePagination } from "react-table";
function PaginationTable({ columns, data, onShuffle_var }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		usePagination
	);

	return (
		<>
			<div className="pagination" style={{
				 position: "absolute",
				 right: "0",
				 padding: "0px 27px 0px 0px"
			}}>
				<button style={{background: "#000000", color: "#FFFF00"}}
				onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button style={{background: "#000000", color: "#FFFF00"}}
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</button>{" "}
				<button style={{background: "#000000", color: "#FFFF00"}}
				onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button style={{background: "#000000", color: "#FFFF00"}}
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</button>{" "}
				<span style={{fontFamily: "Cool Font"}}>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(page);
						}}
						style={{ width: "50px",
								background: "#000000",
								color: "#FFFF00", }}
					/>
				</span>{" "}
				<span>
				<select
					style={{ background: "#000000",
							color: "#ffffff",
							fontFamily: "Cool Font", }}
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select></span>
			</div>
			<Table {...getTableProps()} style={{
				padding: "25px 0px 0px 0px",
			}}>
			<THead>
				{headerGroups.map((headerGroup) => (
					<Tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th {...column.getHeaderProps()}>
									{(() => {
									switch (column.Header) {
										case "Title":   
											console.log(column.Header);	
											return (<ShuffleButton>
												<img
													src="src/static/images/random.png"
													style={{
														float: "left",
														width: "2rem",
													}}
													onClick={onShuffle_var}
													// title="Pick one Random Problem"
												/>
												<span>Pick one Random Question</span>
											</ShuffleButton>)
									}
								})()}
								{column.render("Header")}
							</Th>
						))}
					</Tr>
				))}
			</THead>
			<div></div>
			{/* <Table {...getTableProps()}> */}
			{/* <Scrollable maxHeight="50vh"> */}
				<TBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<Td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</Td>
									);
								})}
							</Tr>
						);
					})}
				</TBody>
			{/* </Scrollable> */}
			</Table>
		</>
	);
}

function QuestionsTable({ data, onShuffle }) {
	console.log("DATA:", data);
	console.log(typeof shuffle_image);

	//extracting useful information
	const useful_data = [];
	data["stat_status_pairs"].map((que, index) => {
		useful_data.push({
			href: "https://leetcode.com/problems/"+que["stat"]["question__title_slug"],
			ques_id: que["stat"]["frontend_question_id"],
			ques_title: que["stat"]["question__title"],
			level:
				que["difficulty"]["level"] == 1
					? "Easy"
					: que["difficulty"]["level"] == 2
					? "Medium"
					: "Hard",
			status:
				que["status"] === "ac"
					? "AC"
					: que["status"] === "notac"
					? "Not-AC"
					: "Not-Attempted",
			paid: que["paid_only"] === true ? "Premium" : "Free",
		});
	});
	//console.log(useful_data);

	//defining column names and attributes
	const columns = React.useMemo(
		() => [
			{
				width: 9,
				minWidth: 9,
				Header: "ID",
				accessor: "ques_id",
			},
			{
				width: 55,
				Header: "Title",
				minWidth: 55,
				id: "link",
				accessor: d => d.href,
				Cell: ({ row }) => <a href={row.original.href} target="_blank">{row.original.ques_title}</a>
			},
			{
				width: 12,
				minWidth: 12,
				Header: "Level",
				accessor: "level",
			},
			{
				width: 12,
				minWidth: 12,
				Header: "Status",
				accessor: "status",
			},
			{
				width: 12,
				minWidth: 12,
				Header: "Paid",
				accessor: "paid",
			},
		],
		[]
	);

	return (
		<>
		<TableContainer>
			{/*<Table>
				 <colgroup>
					{/* added new column for "question_id" */}{/*
					<col span="1" style={{ width: "9%" }} />
					<col span="1" style={{ width: "55%" }} />
					<col span="1" style={{ width: "12%" }} />
					<col span="1" style={{ width: "12%" }} />
					<col span="1" style={{ width: "12%" }} />
				</colgroup>
				<THead>
					<Tr>
						<Th>ID</Th>
					<Th>*/}
							{/* <a href="#" style={shufflestyle}>
								<img
									src="src/static/images/random.png"
									style={{
										float: "left",
										width: "2rem",
									}}
									onClick={onShuffle}
									// title="Pick one Random Problem"
								/>
								<span>Pick one Random Problem</span>
							</a> */}{/*}
							<ShuffleButton>
								<img
									src="src/static/images/random.png"
									style={{
										float: "left",
										width: "2rem",
									}}
									onClick={onShuffle}
									// title="Pick one Random Problem"
								/>
								<span>Pick one Random Question</span>
							</ShuffleButton>
							Title
						</Th>
						<Th style={{ color: "pink" }}>Level</Th>
						<Th>Status</Th>
						<Th>Paid</Th>
					</Tr>
				</THead>
			</Table>
			<div></div>*/}
			{/* <Scrollable maxHeight="68vh"> */}
				{/* <Table>
					<colgroup>
						<col span="1" style={{ width: "9%" }} />
						<col span="1" style={{ width: "55%" }} />
						<col span="1" style={{ width: "12%" }} />
						<col span="1" style={{ width: "12%" }} />
						<col span="1" style={{ width: "12%" }} />
					</colgroup>
				</Table>  */}
				{/* <TBody>
						{data["stat_status_pairs"].map((que, index) => {
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
										{que["status"] === "ac"
											? "AC"
											: que["status"] === "notac"
											? "Not-AC"
											: "Not-Attempted"}
									</Td>
									<Td>
										{que["paid_only"] === true
											? "Premium"
											: "Free"}
									</Td>
								</Tr>
							);
						})}
					</TBody> */}
				<PaginationTable columns={columns} data={useful_data} onShuffle_var={onShuffle} />
			{/* </Scrollable> */}
		</TableContainer>
		</>
	);
}

QuestionsTable.propTypes = {
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
	onShuffle: propTypes.func,
};

export default QuestionsTable;
