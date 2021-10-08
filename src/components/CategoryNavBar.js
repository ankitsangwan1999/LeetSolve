import React from "react";
import { CategoryNavBarSection } from "../styles/category-navbar";
import { CategoryButton } from "../styles/category";
import PropTypes from "prop-types";

const CategoryNavBar = ({ categories = [], handleCategoryClick, activeCategory }) => {

	const categoryClickHandle = (category) => {
		handleCategoryClick(category);
		// alert("Fix this issue to get Points.");
	};

	return (
		<CategoryNavBarSection>
			{categories.map((category) => {
				return (
					<CategoryButton
						key={category}
						onClick={() => {
							categoryClickHandle(category);
						}}
						active={ (category === activeCategory)? true : false }
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
