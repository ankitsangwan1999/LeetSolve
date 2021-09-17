import React from "react";
import { CategoryNavBarSection } from "../styles/category-navbar";
import { CategoryButton } from "../styles/category";
import PropTypes from "prop-types";

const CategoryNavBar = ({ categories = [] }) => {
	const categoryClickHandle = () => {
		alert("Fix this issue to get Points.");
	};

	return (
		<CategoryNavBarSection>
			<CategoryButton key="All Questions" active>
				All Questions
			</CategoryButton>
			{categories.map((category) => {
				return (
					<CategoryButton
						key={category}
						onClick={() => {
							categoryClickHandle();
						}}
					>
						{category}
					</CategoryButton>
				);
			})}
		</CategoryNavBarSection>
	);
};

CategoryNavBar.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string),
};

export default CategoryNavBar;
