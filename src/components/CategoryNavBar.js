import React from "react";
import { CategoryNavBarSection } from "../styles/category-navbar";
import { CategoryButton } from "../styles/category";
import PropTypes from "prop-types";
import LogOut from "./LogOut";

const CategoryNavBar = ({ categories = [], handleCategoryClick, activeCategory }) => {

	const categoryClickHandle = (category) => {			//called when a category button is clicked
		handleCategoryClick(category);					//callback function in AppContent to set the active category
	};

	return (
		<CategoryNavBarSection>
			
			{	// display categories at the top like - All questions, Attempted and so on.
			categories.map((category) => {
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
			<LogOut handleLogOutClick={() => categoryClickHandle("LogOut")}/>
		</CategoryNavBarSection>
	);
};

CategoryNavBar.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string),
	handleCategoryClick: PropTypes.func,
	activeCategory: PropTypes.string
};

export default CategoryNavBar;
